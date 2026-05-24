import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        "Missing Supabase environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
      );
    }
    
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

// For backward compatibility - this will be lazily initialized
export const supabase = {
  from: (table: string) => getSupabase().from(table),
};

// TypeScript type matching the exact schema
export type Itinerary = {
  id?: string;
  destination: string;
  travel_dates: string;
  traveler_count: number;
  traveler_type: "couple" | "family" | "solo" | "friends" | "senior" | null;
  trip_style: "luxury" | "adventure" | "relaxed" | "cultural" | "wellness" | "budget" | null;
  budget_level: "budget" | "mid-range" | "premium" | "luxury" | null;
  accommodation_preference: string | null;
  food_preferences: string | null;
  interests: string[];
  activity_pace: "light" | "moderate" | "packed" | null;
  arrival_airport: string | null;
  special_requests: string | null;
  status?: "new" | "processing" | "generated" | "sent" | "confirmed" | "cancelled";
  generated_itinerary?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
};
