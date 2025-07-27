# Eterna Operations Platform

Internal operations platform for managing Eterna's resident storytelling projects across retirement communities.

## Business Context

Eterna helps older adults preserve their life stories through professional, human-led storytelling. Our goal is to create meaningful legacy memoirs through monthly interviews, transcription, and curated writing. We serve both individual families and premium retirement communities.

**Our Mission**: Not just content — it's memory, connection, and legacy.

### What We Offer

**Core Service (Standard Plan — $300/month per resident):**
- 3 to 4 storytelling sessions per month (30–60 minutes each)
- Professionally transcribed, cleaned, and written into one new chapter per month
- Monthly delivery of a formatted story (PDF or print-ready)
- End-of-program compilation into a full memoir
- All logistics handled by Eterna (no lift required from partner staff)

**Additional Services:**
- **Podcast Package**: +$150 - Professionally produced narrative podcast episodes
- **Weekly Email Newsletter**: +$100 - Weekly digest sent to family with quotes, progress, and highlights
- **Heirloom Print Edition**: Starting at $250 (one-time) - Typeset hardcover version of the full memoir

**Timeline**: Most residents complete a memoir in 12 to 18 months (approximately 40 to 60 sessions).

### Target Audience

We serve residents of high-end retirement homes - retired professionals (doctors, professors, executives) and families who want to document a loved one's life legacy. Clients often come from backgrounds tied to institutions like Apple, Coinbase, Stanford, and the University of Pennsylvania.

## Technical Product Requirements

This operations platform is based on the original [Technical PRD – Autobio Internal Platform v0.2](docs/original-prd.md) but has been redesigned specifically for Eterna's business needs and operational workflow.

### Key Differences from Original PRD

**Original PRD Focus**: Generic AI-automated transcript processing with:
- Speaker diarization and automated Q-filter removal
- AI cleaning and expansion (GPT-4o)
- Automated timeline and chapter orchestration
- Voice cloning and podcast generation
- Automated book/PDF export compilation

**Eterna Operations Focus**: Human-centered storytelling workflow with:
- Retirement community and resident relationship management
- Team assignment and collaboration tracking (storytellers, writers, editors)
- Interview scheduling and story arc progression based on resident backgrounds
- Quality control and approval workflows optimized for premium service standards
- Family communication and progress tracking
- Manual oversight at every step to ensure story authenticity and emotional resonance

The original PRD was designed for automated content generation, while Eterna Operations prioritizes human curation and quality control to preserve the authentic voice and emotional depth of each resident's story.

## Overview

Eterna Operations is a design-first internal application built for managing the end-to-end storytelling workflow. It helps our team efficiently handle resident interviews, chapter reviews, and memoir completion across multiple retirement communities.

## Features

- **Operations Dashboard**: Real-time analytics and key performance metrics
- **Resident Management**: Comprehensive resident profiles and project tracking
- **Interview Pipeline**: Upload and processing workflow for audio interviews
- **Chapter Management**: Review, edit, and approval system for story chapters
- **Export System**: Generate books, podcasts, and newsletters
- **Progress Tracking**: Visual timeline and milestone management

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **UI Library**: shadcn/ui components with Tailwind CSS
- **Color Scheme**: Slate-700 primary theme
- **Charts**: Recharts for analytics visualization
- **State Management**: React hooks with Context API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aymanhalloween/eternaops.git
cd eternaops
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── docs/
│   └── original-prd.md     # Original Technical PRD for reference
├── src/
│   ├── app/                # Next.js app router pages
│   │   ├── dashboard/      # Main operations dashboard
│   │   ├── login/         # Authentication page
│   │   └── globals.css    # Global styles with theme variables
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui base components
│   │   ├── app-sidebar.tsx # Main navigation sidebar
│   │   └── residents-table.tsx # Custom residents table component
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions and helpers
├── README.md             # This file
└── package.json          # Dependencies and scripts
```

## Key Components

### Dashboard Layout
- Analytics cards showing operational metrics
- Residents table with sortable columns and search
- Sidebar navigation for different sections

### Operations Analytics
- Interview completion rates and trends
- Chapter pipeline status and bottlenecks
- Community engagement levels
- Team workload distribution

### Resident Profiles
- Individual resident workspace
- Upload interface for interviews
- Chapter timeline and status tracking
- Export options for completed content

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Design System

The application uses shadcn/ui components with a professional slate-700 color scheme. All components follow consistent design patterns optimized for internal team workflows.

## Contributing

This is an internal project for Eterna operations team. All development should follow the established design patterns and maintain the professional, clean interface.

## License

Internal use only - Eterna Technologies