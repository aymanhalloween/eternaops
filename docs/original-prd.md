# Technical PRD – Autobio Internal Platform v0.2

---

## 1. Scope Summary

Internal-only web application that ingests recorded interviews or pre-made transcripts, strips interviewer speech, cleans and expands resident narratives into chapters, auto-orders chapters on a life-timeline, supports human edits, exports print-ready books, and generates podcast episodes using resident voice cloning. No external user access.

---

## 2. Functional Modules

| ID | Module                                | Core Responsibilities                                                                                                                                                   |
| -- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1 | **Ingestion**                         | Accept audio (m4a/mp3/wav ≤ 500 MB) or text (.txt/.docx, Granola export). Store raw asset in S3 and enqueue processing job.                                             |
| F2 | **Speaker Diarization & Q-Filter**    | Detect speakers (pyannote / AWS Transcribe). Identify "Interviewer" turns via role classification, drop Q-segments, output clean resident-only transcript JSON.         |
| F3 | **AI Cleaning & Expansion**           | GPT-4o prompt: grammar fix, filler removal, +20 % narrative expansion. Output Markdown with scene, date, tags.                                                          |
| F4 | **Timeline & Chapter Orchestrator**   | NLP date extraction → assign chapter order (childhood → career → retirement). Split long transcripts into ≤ 4 k-word chapters, link to resident timeline.               |
| F5 | **Human Editing Workspace**           | React + TipTap editor with diff, comments, version control. States: *draft*, *in-review*, *approved*.                                                                   |
| F6 | **Voice Cloning & Podcast Generator** | ElevenLabs API (or open-source fallback). One-time voice clone per resident from 2 min sample. Convert each approved chapter to \~10 min MP3 with intro/outro template. |
| F7 | **Book & Podcast Export**             | Headless Chrome + paged.js to PDF (print/web) and ePub. Compile MP3s into RSS-ready feed. All assets stored `/residents/{id}/releases/{v}`.                             |
| F8 | **Notifications & Audit**             | Slack webhooks + email (Postmark): job success/failure, chapter pending review, export complete. Immutable audit log table.                                             |

---

## 3. Non-Functional Requirements

| Area          | Requirement                                                                     |
| ------------- | ------------------------------------------------------------------------------- |
| Performance   | Ingest to first AI draft ≤ 30 min for 60 min audio.                             |
| Concurrency   | ≥ 25 simultaneous transcription jobs.                                           |
| Security      | TLS 1.3; S3 SSE-KMS; RLS in Postgres.                                           |
| Access        | Roles: **Admin**, **Editor**, **Uploader**. No resident login.                  |
| Observability | Datadog traces + metrics; S3/Lambda CloudWatch logs; alert on error rate > 2 %. |

---

## 4. System Architecture

```mermaid
graph TD
A[Web Client] --> B(API Gateway)
B --> C[Supabase Auth]
B --> D[S3 Pre-signed Upload]
D --> E[Transcribe Queue (SQS)]
E --> F[Whisper Batch / AWS Transcribe]
F --> G[Speaker Filter Lambda]
G --> H[AI Cleaner Lambda]
H --> I[Postgres Chapters]
I --> J[Editor UI]
J --> K[Approval Queue]
K --> L[Timeline Orchestrator]
L --> M[Book/PDF Compiler]
L --> N[Voice Clone & TTS]
M --> O[S3 Releases]
N --> O
O --> P[Notification Service]
```

---

## 5. Data Model (key tables)

*`residents(id, name, facility_id, voice_id)`*
*`interviews(id, resident_id, s3_uri, status)`*
*`chapters(id, resident_id, interview_id, idx, status, text_md, timeline_date)`*
*`chapter_versions(id, chapter_id, editor_id, diff, created_at)`*
*`assets(id, resident_id, type, s3_uri, version)`*

Indexes on `chapters(resident_id, idx)` and `interviews(status)`.

---

## 6. Component Interfaces

### Ingestion API

`POST /api/v1/upload` → returns `{uploadUrl, assetId}`

### Cleaner Lambda Contract

Input: `{assetId, transcriptS3}`
Output: `{chapterList: [{idx, textMd, timelineDate}]}`

### Editor Save

`PATCH /chapters/{id}` body `{textMd}` → returns new version row.

### Compile Endpoint

`POST /residents/{id}/compile` params `{type: "book"|"podcast"}` → returns `{releaseId, s3Uri}`

---

## 7. Deployment & Ops

| Component    | Deploy                 | Scaling               |
| ------------ | ---------------------- | --------------------- |
| Frontend/API | Vercel                 | Auto edge             |
| Batch jobs   | AWS Batch on Spot      | vCPU 0–64             |
| Lambdas      | us-west-2              | Concurrency cap 100   |
| DB           | RDS Postgres, Multi-AZ | t3.medium → r6g.large |
| Object store | S3 + CloudFront        | Regional replication  |

Blue-green deploy via GitHub Actions → AWS.

---

## 8. Open Technical Questions

1. Minimum audio quality required for reliable diarization?
2. Do we embed photos inside chapters now or post-MVP?
3. Podcast intro/outro music licensing—internal only or future external release?
4. Need automatic redaction of sensitive PII before voice cloning?
5. Preferred Granola export format (JSON vs plain txt)?

---