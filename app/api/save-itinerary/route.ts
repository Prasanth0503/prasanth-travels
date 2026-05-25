import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// TypeScript type matching the exact schema
type Itinerary = {
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

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body: Itinerary = await req.json();

    // Validate required fields
    if (!body.destination || !body.travel_dates || !body.traveler_count) {
      return NextResponse.json(
        { error: "Missing required fields: destination, travel_dates, traveler_count" },
        { status: 400 }
      );
    }

    // Build the row — only pick fields that match the schema
    const row: Omit<Itinerary, "id" | "created_at" | "updated_at"> = {
      destination: body.destination.trim(),
      travel_dates: body.travel_dates.trim(),
      traveler_count: Number(body.traveler_count),
      traveler_type: body.traveler_type ?? null,
      trip_style: body.trip_style ?? null,
      budget_level: body.budget_level ?? null,
      accommodation_preference: body.accommodation_preference?.trim() ?? null,
      food_preferences: body.food_preferences?.trim() ?? null,
      interests: Array.isArray(body.interests) ? body.interests : [],
      activity_pace: body.activity_pace ?? null,
      arrival_airport: body.arrival_airport?.trim() ?? null,
      special_requests: body.special_requests?.trim() ?? null,
      status: "new",
      generated_itinerary: null,
    };

    const { data, error } = await supabase
      .from("itineraries")
      .insert([row])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: error.message, details: error.details },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id, data }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET — fetch recent itineraries (useful for admin/testing)
export async function GET() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("itineraries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
