export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activity_events: {
        Row: {
          created_at: string
          entity_id: string | null
          event: string
          id: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          entity_id?: string | null
          event: string
          id?: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          entity_id?: string | null
          event?: string
          id?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      beta_allowlist: {
        Row: {
          created_at: string
          email: string
        }
        Insert: {
          created_at?: string
          email: string
        }
        Update: {
          created_at?: string
          email?: string
        }
        Relationships: []
      }
      course_meetings: {
        Row: {
          confidence: string | null
          course_id: string
          created_at: string
          day_of_week: number
          end_date: string | null
          end_time: string
          id: string
          location: string | null
          owner_id: string
          source_document_id: string | null
          source_excerpt: string | null
          source_page: number | null
          start_date: string | null
          start_time: string
          updated_at: string
        }
        Insert: {
          confidence?: string | null
          course_id: string
          created_at?: string
          day_of_week: number
          end_date?: string | null
          end_time: string
          id?: string
          location?: string | null
          owner_id: string
          source_document_id?: string | null
          source_excerpt?: string | null
          source_page?: number | null
          start_date?: string | null
          start_time: string
          updated_at?: string
        }
        Update: {
          confidence?: string | null
          course_id?: string
          created_at?: string
          day_of_week?: number
          end_date?: string | null
          end_time?: string
          id?: string
          location?: string | null
          owner_id?: string
          source_document_id?: string | null
          source_excerpt?: string | null
          source_page?: number | null
          start_date?: string | null
          start_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_meetings_course_id_owner_id_fkey"
            columns: ["course_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id", "owner_id"]
          },
          {
            foreignKeyName: "course_meetings_source_document_id_owner_id_fkey"
            columns: ["source_document_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id", "owner_id"]
          },
        ]
      }
      course_policies: {
        Row: {
          confidence: string | null
          content: string
          course_id: string
          created_at: string
          id: string
          owner_id: string
          policy_type: string
          source_document_id: string | null
          source_excerpt: string | null
          source_page: number | null
          title: string
          updated_at: string
        }
        Insert: {
          confidence?: string | null
          content: string
          course_id: string
          created_at?: string
          id?: string
          owner_id: string
          policy_type: string
          source_document_id?: string | null
          source_excerpt?: string | null
          source_page?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          confidence?: string | null
          content?: string
          course_id?: string
          created_at?: string
          id?: string
          owner_id?: string
          policy_type?: string
          source_document_id?: string | null
          source_excerpt?: string | null
          source_page?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_policies_course_id_owner_id_fkey"
            columns: ["course_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id", "owner_id"]
          },
          {
            foreignKeyName: "course_policies_source_document_id_owner_id_fkey"
            columns: ["source_document_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id", "owner_id"]
          },
        ]
      }
      courses: {
        Row: {
          code: string | null
          color: string | null
          course_url: string | null
          created_at: string
          id: string
          instructor_email: string | null
          instructor_name: string | null
          lms_course_id: string | null
          lms_provider: string | null
          lms_url: string | null
          location: string | null
          name: string
          owner_id: string
          section: string | null
          semester_id: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          color?: string | null
          course_url?: string | null
          created_at?: string
          id?: string
          instructor_email?: string | null
          instructor_name?: string | null
          lms_course_id?: string | null
          lms_provider?: string | null
          lms_url?: string | null
          location?: string | null
          name: string
          owner_id: string
          section?: string | null
          semester_id: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          color?: string | null
          course_url?: string | null
          created_at?: string
          id?: string
          instructor_email?: string | null
          instructor_name?: string | null
          lms_course_id?: string | null
          lms_provider?: string | null
          lms_url?: string | null
          location?: string | null
          name?: string
          owner_id?: string
          section?: string | null
          semester_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_semester_id_owner_id_fkey"
            columns: ["semester_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id", "owner_id"]
          },
        ]
      }
      documents: {
        Row: {
          course_id: string | null
          created_at: string
          document_type: string
          id: string
          mime_type: string
          original_filename: string
          owner_id: string
          sha256: string
          size_bytes: number
          storage_path: string
          updated_at: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          document_type?: string
          id?: string
          mime_type: string
          original_filename: string
          owner_id: string
          sha256: string
          size_bytes: number
          storage_path: string
          updated_at?: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          document_type?: string
          id?: string
          mime_type?: string
          original_filename?: string
          owner_id?: string
          sha256?: string
          size_bytes?: number
          storage_path?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_course_id_owner_id_fkey"
            columns: ["course_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id", "owner_id"]
          },
        ]
      }
      grading_components: {
        Row: {
          confidence: string | null
          course_id: string
          created_at: string
          id: string
          name: string
          owner_id: string
          source_document_id: string | null
          source_excerpt: string | null
          source_page: number | null
          updated_at: string
          weight_percent: number | null
        }
        Insert: {
          confidence?: string | null
          course_id: string
          created_at?: string
          id?: string
          name: string
          owner_id: string
          source_document_id?: string | null
          source_excerpt?: string | null
          source_page?: number | null
          updated_at?: string
          weight_percent?: number | null
        }
        Update: {
          confidence?: string | null
          course_id?: string
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          source_document_id?: string | null
          source_excerpt?: string | null
          source_page?: number | null
          updated_at?: string
          weight_percent?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "grading_components_course_id_owner_id_fkey"
            columns: ["course_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id", "owner_id"]
          },
          {
            foreignKeyName: "grading_components_source_document_id_owner_id_fkey"
            columns: ["source_document_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id", "owner_id"]
          },
        ]
      }
      import_candidates: {
        Row: {
          accepted: boolean
          candidate_data: Json
          confidence: string
          created_at: string
          edited: boolean
          entity_type: string
          id: string
          import_id: string
          owner_id: string
          source_excerpt: string | null
          source_page: number | null
          updated_at: string
        }
        Insert: {
          accepted?: boolean
          candidate_data: Json
          confidence: string
          created_at?: string
          edited?: boolean
          entity_type: string
          id?: string
          import_id: string
          owner_id: string
          source_excerpt?: string | null
          source_page?: number | null
          updated_at?: string
        }
        Update: {
          accepted?: boolean
          candidate_data?: Json
          confidence?: string
          created_at?: string
          edited?: boolean
          entity_type?: string
          id?: string
          import_id?: string
          owner_id?: string
          source_excerpt?: string | null
          source_page?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "import_candidates_import_id_owner_id_fkey"
            columns: ["import_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "imports"
            referencedColumns: ["id", "owner_id"]
          },
        ]
      }
      imports: {
        Row: {
          attempts: number
          completed_at: string | null
          confirmed_at: string | null
          course_id: string | null
          created_at: string
          document_id: string
          duration_ms: number | null
          error_code: string | null
          error_message: string | null
          estimated_cost: number | null
          id: string
          import_type: string
          input_chars: number | null
          input_tokens: number | null
          model: string | null
          normalized_result: Json | null
          output_tokens: number | null
          owner_id: string
          processing_started_at: string | null
          provider: string | null
          raw_result: Json | null
          semester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          attempts?: number
          completed_at?: string | null
          confirmed_at?: string | null
          course_id?: string | null
          created_at?: string
          document_id: string
          duration_ms?: number | null
          error_code?: string | null
          error_message?: string | null
          estimated_cost?: number | null
          id?: string
          import_type?: string
          input_chars?: number | null
          input_tokens?: number | null
          model?: string | null
          normalized_result?: Json | null
          output_tokens?: number | null
          owner_id: string
          processing_started_at?: string | null
          provider?: string | null
          raw_result?: Json | null
          semester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          attempts?: number
          completed_at?: string | null
          confirmed_at?: string | null
          course_id?: string | null
          created_at?: string
          document_id?: string
          duration_ms?: number | null
          error_code?: string | null
          error_message?: string | null
          estimated_cost?: number | null
          id?: string
          import_type?: string
          input_chars?: number | null
          input_tokens?: number | null
          model?: string | null
          normalized_result?: Json | null
          output_tokens?: number | null
          owner_id?: string
          processing_started_at?: string | null
          provider?: string | null
          raw_result?: Json | null
          semester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "imports_course_id_owner_id_fkey"
            columns: ["course_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id", "owner_id"]
          },
          {
            foreignKeyName: "imports_document_id_owner_id_fkey"
            columns: ["document_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id", "owner_id"]
          },
          {
            foreignKeyName: "imports_semester_id_owner_id_fkey"
            columns: ["semester_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id", "owner_id"]
          },
        ]
      }
      integrations: {
        Row: {
          created_at: string
          encrypted_credentials: string | null
          external_user_id: string | null
          id: string
          last_sync_at: string | null
          next_sync_at: string | null
          owner_id: string
          provider: string
          status: string
          sync_cursor: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          encrypted_credentials?: string | null
          external_user_id?: string | null
          id?: string
          last_sync_at?: string | null
          next_sync_at?: string | null
          owner_id: string
          provider: string
          status?: string
          sync_cursor?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          encrypted_credentials?: string | null
          external_user_id?: string | null
          id?: string
          last_sync_at?: string | null
          next_sync_at?: string | null
          owner_id?: string
          provider?: string
          status?: string
          sync_cursor?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          deleting_at: string | null
          display_name: string
          email: string
          id: string
          onboarding_status: string
          timezone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleting_at?: string | null
          display_name?: string
          email: string
          id: string
          onboarding_status?: string
          timezone?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleting_at?: string | null
          display_name?: string
          email?: string
          id?: string
          onboarding_status?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      semesters: {
        Row: {
          archived_at: string | null
          created_at: string
          end_date: string | null
          id: string
          name: string
          owner_id: string
          start_date: string | null
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          name: string
          owner_id: string
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          name?: string
          owner_id?: string
          start_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          completed_at: string | null
          confidence: string | null
          course_id: string | null
          created_at: string
          deadline_type: string
          description: string | null
          due_at: string | null
          due_date: string | null
          estimated_minutes: number | null
          id: string
          owner_id: string
          points_possible: number | null
          priority: number
          source_document_id: string | null
          source_excerpt: string | null
          source_id: string | null
          source_page: number | null
          source_type: string
          status: string
          task_url: string | null
          title: string
          type: string
          updated_at: string
          weight_percent: number | null
        }
        Insert: {
          completed_at?: string | null
          confidence?: string | null
          course_id?: string | null
          created_at?: string
          deadline_type?: string
          description?: string | null
          due_at?: string | null
          due_date?: string | null
          estimated_minutes?: number | null
          id?: string
          owner_id: string
          points_possible?: number | null
          priority?: number
          source_document_id?: string | null
          source_excerpt?: string | null
          source_id?: string | null
          source_page?: number | null
          source_type?: string
          status?: string
          task_url?: string | null
          title: string
          type?: string
          updated_at?: string
          weight_percent?: number | null
        }
        Update: {
          completed_at?: string | null
          confidence?: string | null
          course_id?: string | null
          created_at?: string
          deadline_type?: string
          description?: string | null
          due_at?: string | null
          due_date?: string | null
          estimated_minutes?: number | null
          id?: string
          owner_id?: string
          points_possible?: number | null
          priority?: number
          source_document_id?: string | null
          source_excerpt?: string | null
          source_id?: string | null
          source_page?: number | null
          source_type?: string
          status?: string
          task_url?: string | null
          title?: string
          type?: string
          updated_at?: string
          weight_percent?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_course_id_owner_id_fkey"
            columns: ["course_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id", "owner_id"]
          },
          {
            foreignKeyName: "tasks_source_document_id_owner_id_fkey"
            columns: ["source_document_id", "owner_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id", "owner_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_import: {
        Args: { p_id: string; p_owner: string }
        Returns: {
          attempts: number
          completed_at: string | null
          confirmed_at: string | null
          course_id: string | null
          created_at: string
          document_id: string
          duration_ms: number | null
          error_code: string | null
          error_message: string | null
          estimated_cost: number | null
          id: string
          import_type: string
          input_chars: number | null
          input_tokens: number | null
          model: string | null
          normalized_result: Json | null
          output_tokens: number | null
          owner_id: string
          processing_started_at: string | null
          provider: string | null
          raw_result: Json | null
          semester_id: string
          status: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "imports"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      complete_onboarding: {
        Args: {
          p_email: string
          p_name: string
          p_owner: string
          p_semester: string
          p_timezone: string
        }
        Returns: undefined
      }
      confirm_import: {
        Args: { p_id: string; p_owner: string }
        Returns: string
      }
      is_beta_user: { Args: never; Returns: boolean }
      review_candidate: {
        Args: {
          p_accepted: boolean
          p_candidate: string
          p_data: Json
          p_import: string
          p_owner: string
        }
        Returns: undefined
      }
      save_candidates: {
        Args: {
          p_candidates: Json
          p_id: string
          p_metrics: Json
          p_owner: string
          p_result: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

