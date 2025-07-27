export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      retirement_homes: {
        Row: {
          id: number
          name: string
          contact_info: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          contact_info?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          contact_info?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      residents: {
        Row: {
          id: number
          name: string
          background_notes: string | null
          progress_status: string
          home_id: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          background_notes?: string | null
          progress_status?: string
          home_id: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          background_notes?: string | null
          progress_status?: string
          home_id?: number
          created_at?: string
          updated_at?: string
        }
      }
      interviews: {
        Row: {
          id: number
          file_url: string | null
          transcript_text: string | null
          status: string
          session_number: number | null
          upload_date: string
          resident_id: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          file_url?: string | null
          transcript_text?: string | null
          status?: string
          session_number?: number | null
          upload_date?: string
          resident_id: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          file_url?: string | null
          transcript_text?: string | null
          status?: string
          session_number?: number | null
          upload_date?: string
          resident_id?: number
          created_at?: string
          updated_at?: string
        }
      }
      chapters: {
        Row: {
          id: number
          title: string
          content: string | null
          order: number
          status: string
          word_count: number | null
          resident_id: number
          interview_id: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          content?: string | null
          order: number
          status?: string
          word_count?: number | null
          resident_id: number
          interview_id?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          content?: string | null
          order?: number
          status?: string
          word_count?: number | null
          resident_id?: number
          interview_id?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      chapter_versions: {
        Row: {
          id: number
          diff: string | null
          notes: string | null
          chapter_id: number
          editor_id: string | null
          created_at: string
        }
        Insert: {
          id?: number
          diff?: string | null
          notes?: string | null
          chapter_id: number
          editor_id?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          diff?: string | null
          notes?: string | null
          chapter_id?: number
          editor_id?: string | null
          created_at?: string
        }
      }
      exports: {
        Row: {
          id: number
          type: string
          file_url: string
          status: string
          resident_id: number
          created_at: string
        }
        Insert: {
          id?: number
          type: string
          file_url: string
          status?: string
          resident_id: number
          created_at?: string
        }
        Update: {
          id?: number
          type?: string
          file_url?: string
          status?: string
          resident_id?: number
          created_at?: string
        }
      }
      team_assignments: {
        Row: {
          id: number
          storyteller_id: string | null
          writer_id: string | null
          editor_id: string | null
          resident_id: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          storyteller_id?: string | null
          writer_id?: string | null
          editor_id?: string | null
          resident_id: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          storyteller_id?: string | null
          writer_id?: string | null
          editor_id?: string | null
          resident_id?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}