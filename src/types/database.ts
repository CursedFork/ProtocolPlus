export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          sex: 'male' | 'female'
          age: number
          weight_lbs: number
          height_ft: number
          height_in: number
          activity_level: 'sedentary' | 'light' | 'moderate' | 'very' | 'extreme'
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'updated_at'> & { updated_at?: string }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      weight_log: {
        Row: {
          id: string
          user_id: string
          date: string
          weight_lbs: number
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['weight_log']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['weight_log']['Insert']>
      }
      strength_log: {
        Row: {
          id: string
          user_id: string
          date: string
          exercise: string
          weight_lbs: number
          reps: number
          sets: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['strength_log']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['strength_log']['Insert']>
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          target_value: number
          current_value: number
          unit: string
          category: string
        }
        Insert: Database['public']['Tables']['goals']['Row']
        Update: Partial<Database['public']['Tables']['goals']['Row']>
      }
      habit_log: {
        Row: {
          id: string
          user_id: string
          date: string
          habits: string[]
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['habit_log']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['habit_log']['Insert']>
      }
      preferences: {
        Row: {
          user_id: string
          workout_days: string[]
          goal_mode: string
          budget_mode: boolean
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['preferences']['Row'], 'updated_at'> & { updated_at?: string }
        Update: Partial<Database['public']['Tables']['preferences']['Insert']>
      }
    }
  }
}
