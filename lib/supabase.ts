import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
