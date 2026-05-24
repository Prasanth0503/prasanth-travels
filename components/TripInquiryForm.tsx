"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const WHATSAPP_NUMBER = "13123998042"; // TODO: replace

type FormData = {
  destination: string;
  travel_dates: string;
  travel_date_range: DateRange | undefined;
  traveler_count: number;
  traveler_type: string;
  trip_style: string;
  budget_level: string;
  accommodation_preference: string;
  food_preferences: string;
  interests: string[];
  activity_pace: string;
  arrival_airport: string;
  special_requests: string;
};

const EMPTY: FormData = {
  destination: "",
  travel_dates: "",
  travel_date_range: undefined,
  traveler_count: 2,
  traveler_type: "",
  trip_style: "",
  budget_level: "",
  accommodation_preference: "",
  food_preferences: "",
  interests: [],
  activity_pace: "",
  arrival_airport: "",
  special_requests: "",
};

const INTERESTS_OPTIONS = [
  { value: "beaches", label: "🏖️ Beaches" },
  { value: "shopping", label: "🛍️ Shopping" },
  { value: "history", label: "🏛️ History" },
  { value: "food", label: "🍜 Food & Cuisine" },
  { value: "nature", label: "🌿 Nature & Wildlife" },
  { value: "adventure", label: "🧗 Adventure Sports" },
  { value: "nightlife", label: "🎵 Nightlife" },
  { value: "art", label: "🎨 Art & Culture" },
  { value: "wellness", label: "🧘 Wellness & Spa" },
  { value: "photography", label: "📷 Photography" },
  { value: "architecture", label: "🏰 Architecture" },
  { value: "hiking", label: "🥾 Hiking & Trekking" },
];

const STEPS = [
  { id: 1, title: "Destination", icon: "🌍" },
  { id: 2, title: "Travel Style", icon: "🎯" },
  { id: 3, title: "Preferences", icon: "❤️" },
  { id: 4, title: "Logistics", icon: "✈️" },
];

type State = "idle" | "loading" | "success" | "error";

export default function TripInquiryForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [savedId, setSavedId] = useState("");

  const set = (key: keyof FormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleInterest = (val: string) => {
    const cur = form.interests;
    set("interests", cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val]);
  };

  const canNext = () => {
    if (step === 1) return form.destination.trim() && form.travel_date_range?.from && form.travel_date_range?.to && form.traveler_count > 0;
    if (step === 2) return form.traveler_type && form.trip_style && form.budget_level;
    if (step === 3) return form.interests.length > 0 && form.activity_pace;
    return true;
  };

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return "";
    if (!range.to) return format(range.from, "MMM d, yyyy");
    return `${format(range.from, "MMM d")} – ${format(range.to, "MMM d, yyyy")}`;
  };

  const submit = async () => {
    setState("loading");
    setErrorMsg("");
    // Format the date range for submission
    const submissionData = {
      ...form,
      travel_dates: formatDateRange(form.travel_date_range),
    };
    try {
      const res = await fetch("/api/save-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setSavedId(json.id);
      setState("success");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Unknown error");
      setState("error");
    }
  };

  const waMessage = encodeURIComponent(
    `Hi! I've submitted a trip inquiry for *${form.destination}* (${formatDateRange(form.travel_date_range)}) — Reference ID: ${savedId}. Looking forward to hearing from you!`
  );

  if (state === "success") {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-20 h-20 bg-[#EEF5F1] rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
          Trip Inquiry Saved!
        </h3>
        <p className="text-[#6B6B6B] mb-2">Your trip to <strong>{form.destination}</strong> has been saved.</p>
        {savedId && (
          <p className="text-xs text-[#9B9B9B] mb-8 font-mono">
            Reference ID: <span className="text-[#2D6A8F]">{savedId}</span>
          </p>
        )}
        <p className="text-[#6B6B6B] text-sm mb-6">
          We'll contact you shortly with your custom itinerary. Want a faster response?
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1eb856] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg mb-4"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Follow up on WhatsApp
        </a>
        <br />
        <button
          onClick={() => { setForm(EMPTY); setStep(1); setState("idle"); setSavedId(""); }}
          className="text-sm text-[#6B6B6B] underline underline-offset-2 mt-2"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Step progress bar */}
      <div className="px-8 pt-8 pb-6 border-b border-[#E8E0D4]">
        <div className="flex items-center justify-between gap-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <button
                onClick={() => s.id < step && setStep(s.id)}
                className={`flex items-center gap-2 transition-all duration-200 ${
                  s.id < step ? "cursor-pointer opacity-100" : s.id === step ? "cursor-default" : "cursor-default opacity-40"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    s.id < step
                      ? "bg-[#3D6B4F] text-white"
                      : s.id === step
                      ? "bg-[#2D6A8F] text-white"
                      : "bg-[#E8E0D4] text-[#9B9B9B]"
                  }`}
                >
                  {s.id < step ? "✓" : s.id}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${
                  s.id === step ? "text-[#2D6A8F]" : s.id < step ? "text-[#3D6B4F]" : "text-[#9B9B9B]"
                }`}>
                  {s.title}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded transition-all ${s.id < step ? "bg-[#3D6B4F]" : "bg-[#E8E0D4]"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form body */}
      <div className="px-8 py-8">
        {/* STEP 1: Destination */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Where do you want to go? <span className="text-[#C4713A]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Bali, Tokyo, Paris…"
                value={form.destination}
                onChange={(e) => set("destination", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E0D4] focus:border-[#2D6A8F] focus:ring-2 focus:ring-[#2D6A8F]/10 outline-none transition-all text-[#1A1A1A] placeholder:text-[#B0A89A] text-base bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Travel dates <span className="text-[#C4713A]">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={`w-full px-4 py-3 rounded-xl border border-[#E8E0D4] focus:border-[#2D6A8F] focus:ring-2 focus:ring-[#2D6A8F]/10 outline-none transition-all text-base bg-white text-left flex items-center justify-between ${
                      form.travel_date_range?.from ? "text-[#1A1A1A]" : "text-[#B0A89A]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#9B9B9B]"
                      >
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <path d="M3 10h18" />
                      </svg>
                      {form.travel_date_range?.from ? (
                        formatDateRange(form.travel_date_range)
                      ) : (
                        "Select start & end dates"
                      )}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#9B9B9B]"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    defaultMonth={form.travel_date_range?.from}
                    selected={form.travel_date_range}
                    onSelect={(range) => set("travel_date_range", range)}
                    numberOfMonths={2}
                    disabled={{ before: new Date() }}
                  />
                  {form.travel_date_range?.from && form.travel_date_range?.to && (
                    <div className="px-4 pb-4 pt-0 border-t border-[#E8E0D4] mt-2">
                      <p className="text-sm text-[#6B6B6B] pt-3">
                        <span className="font-medium text-[#1A1A1A]">
                          {Math.ceil(
                            (form.travel_date_range.to.getTime() - form.travel_date_range.from.getTime()) /
                              (1000 * 60 * 60 * 24)
                          ) + 1}{" "}
                          days
                        </span>{" "}
                        • {format(form.travel_date_range.from, "EEE, MMM d")} → {format(form.travel_date_range.to, "EEE, MMM d, yyyy")}
                      </p>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Number of travelers <span className="text-[#C4713A]">*</span>
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => set("traveler_count", Math.max(1, form.traveler_count - 1))}
                  className="w-10 h-10 rounded-xl border border-[#E8E0D4] flex items-center justify-center text-lg font-bold text-[#6B6B6B] hover:bg-[#F5F0E8] transition-colors"
                >−</button>
                <span className="text-2xl font-bold text-[#1A1A1A] min-w-[2rem] text-center">
                  {form.traveler_count}
                </span>
                <button
                  type="button"
                  onClick={() => set("traveler_count", form.traveler_count + 1)}
                  className="w-10 h-10 rounded-xl border border-[#E8E0D4] flex items-center justify-center text-lg font-bold text-[#6B6B6B] hover:bg-[#F5F0E8] transition-colors"
                >+</button>
                <span className="text-sm text-[#6B6B6B]">
                  {form.traveler_count === 1 ? "person" : "people"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Travel Style */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                Who's traveling? <span className="text-[#C4713A]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { value: "solo", label: "🧍 Solo" },
                  { value: "couple", label: "💑 Couple" },
                  { value: "family", label: "👨‍👩‍👧‍👦 Family" },
                  { value: "friends", label: "👯 Friends" },
                  { value: "senior", label: "🧓 Senior" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set("traveler_type", opt.value)}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      form.traveler_type === opt.value
                        ? "border-[#2D6A8F] bg-[#EEF5FA] text-[#2D6A8F]"
                        : "border-[#E8E0D4] bg-white text-[#6B6B6B] hover:border-[#2D6A8F]/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                Trip style <span className="text-[#C4713A]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { value: "luxury", label: "✨ Luxury" },
                  { value: "adventure", label: "🏔️ Adventure" },
                  { value: "relaxed", label: "🌴 Relaxed" },
                  { value: "cultural", label: "🏛️ Cultural" },
                  { value: "wellness", label: "🧘 Wellness" },
                  { value: "budget", label: "💰 Budget" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set("trip_style", opt.value)}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      form.trip_style === opt.value
                        ? "border-[#C4713A] bg-[#FDF5EE] text-[#C4713A]"
                        : "border-[#E8E0D4] bg-white text-[#6B6B6B] hover:border-[#C4713A]/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                Budget level <span className="text-[#C4713A]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: "budget", label: "💵 Budget" },
                  { value: "mid-range", label: "💳 Mid-Range" },
                  { value: "premium", label: "💎 Premium" },
                  { value: "luxury", label: "🏆 Luxury" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set("budget_level", opt.value)}
                    className={`px-3 py-3 rounded-xl border text-sm font-medium transition-all duration-200 text-center ${
                      form.budget_level === opt.value
                        ? "border-[#3D6B4F] bg-[#EEF5F1] text-[#3D6B4F]"
                        : "border-[#E8E0D4] bg-white text-[#6B6B6B] hover:border-[#3D6B4F]/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Preferences */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                Interests <span className="text-[#C4713A]">*</span>
                <span className="text-xs text-[#9B9B9B] font-normal ml-2">Pick all that apply</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {INTERESTS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleInterest(opt.value)}
                    className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 text-left ${
                      form.interests.includes(opt.value)
                        ? "border-[#2D6A8F] bg-[#EEF5FA] text-[#2D6A8F]"
                        : "border-[#E8E0D4] bg-white text-[#6B6B6B] hover:border-[#2D6A8F]/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                Activity pace <span className="text-[#C4713A]">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "light", label: "🌙 Light", desc: "Relaxed days, no rush" },
                  { value: "moderate", label: "☀️ Moderate", desc: "Balanced exploration" },
                  { value: "packed", label: "⚡ Packed", desc: "Maximize every day" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set("activity_pace", opt.value)}
                    className={`px-3 py-3 rounded-xl border text-sm font-medium transition-all duration-200 text-center ${
                      form.activity_pace === opt.value
                        ? "border-[#C4713A] bg-[#FDF5EE] text-[#C4713A]"
                        : "border-[#E8E0D4] bg-white text-[#6B6B6B] hover:border-[#C4713A]/40"
                    }`}
                  >
                    <div>{opt.label}</div>
                    <div className="text-xs opacity-60 mt-1 font-normal">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Accommodation preference
                <span className="text-xs text-[#9B9B9B] font-normal ml-2">Optional</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Boutique hotels, Airbnb, 5-star resorts…"
                value={form.accommodation_preference}
                onChange={(e) => set("accommodation_preference", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E0D4] focus:border-[#2D6A8F] focus:ring-2 focus:ring-[#2D6A8F]/10 outline-none transition-all text-[#1A1A1A] placeholder:text-[#B0A89A] text-base bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Food preferences
                <span className="text-xs text-[#9B9B9B] font-normal ml-2">Optional</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Vegetarian, street food lover, no shellfish…"
                value={form.food_preferences}
                onChange={(e) => set("food_preferences", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E0D4] focus:border-[#2D6A8F] focus:ring-2 focus:ring-[#2D6A8F]/10 outline-none transition-all text-[#1A1A1A] placeholder:text-[#B0A89A] text-base bg-white"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Logistics */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Arrival airport / city
                <span className="text-xs text-[#9B9B9B] font-normal ml-2">Optional</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Chennai (MAA), Dubai (DXB)…"
                value={form.arrival_airport}
                onChange={(e) => set("arrival_airport", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E0D4] focus:border-[#2D6A8F] focus:ring-2 focus:ring-[#2D6A8F]/10 outline-none transition-all text-[#1A1A1A] placeholder:text-[#B0A89A] text-base bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Special requests or anything else to know?
                <span className="text-xs text-[#9B9B9B] font-normal ml-2">Optional</span>
              </label>
              <textarea
                rows={4}
                placeholder="e.g. Travelling with a toddler, wheelchair accessible, anniversary trip, need visa help…"
                value={form.special_requests}
                onChange={(e) => set("special_requests", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E0D4] focus:border-[#2D6A8F] focus:ring-2 focus:ring-[#2D6A8F]/10 outline-none transition-all text-[#1A1A1A] placeholder:text-[#B0A89A] text-base bg-white resize-none"
              />
            </div>

            {/* Summary card */}
            <div className="rounded-2xl bg-[#F5F0E8] p-5 space-y-2 text-sm">
              <p className="font-semibold text-[#1A1A1A] mb-3">Your trip summary</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[#6B6B6B]">
                <span>📍 Destination</span><span className="text-[#1A1A1A] font-medium">{form.destination}</span>
                <span>📅 Dates</span><span className="text-[#1A1A1A] font-medium">{form.travel_dates}</span>
                <span>👥 Travelers</span><span className="text-[#1A1A1A] font-medium">{form.traveler_count} {form.traveler_count === 1 ? "person" : "people"}</span>
                <span>🎯 Style</span><span className="text-[#1A1A1A] font-medium capitalize">{form.trip_style || "—"}</span>
                <span>💰 Budget</span><span className="text-[#1A1A1A] font-medium capitalize">{form.budget_level || "—"}</span>
                <span>⚡ Pace</span><span className="text-[#1A1A1A] font-medium capitalize">{form.activity_pace || "—"}</span>
              </div>
              {form.interests.length > 0 && (
                <div className="pt-2 border-t border-[#E8E0D4] mt-2">
                  <span className="text-[#6B6B6B]">Interests: </span>
                  <span className="text-[#1A1A1A] font-medium capitalize">
                    {form.interests.join(", ")}
                  </span>
                </div>
              )}
            </div>

            {state === "error" && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                ⚠️ {errorMsg || "Something went wrong. Please try again."}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div className="px-8 pb-8 flex items-center justify-between gap-4 border-t border-[#E8E0D4] pt-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E8E0D4] text-[#6B6B6B] font-medium hover:bg-[#F5F0E8] transition-all"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={() => canNext() && setStep(step + 1)}
            disabled={!canNext()}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
              canNext()
                ? "bg-[#2D6A8F] hover:bg-[#1A5070] text-white hover:scale-105 shadow-lg"
                : "bg-[#E8E0D4] text-[#B0A89A] cursor-not-allowed"
            }`}
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={state === "loading"}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
              state === "loading"
                ? "bg-[#E8E0D4] text-[#B0A89A] cursor-not-allowed"
                : "bg-[#C4713A] hover:bg-[#A85C2A] text-white hover:scale-105 shadow-lg"
            }`}
          >
            {state === "loading" ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving…
              </>
            ) : (
              "Submit Trip Request ✈️"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
