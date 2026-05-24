"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        button_previous: "absolute left-1 top-0 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-[#E8E0D4] bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-[#F5F0E8] transition-colors",
        button_next: "absolute right-1 top-0 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-[#E8E0D4] bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-[#F5F0E8] transition-colors",
        month_grid: "w-full border-collapse space-x-1",
        weekdays: "flex",
        weekday: "text-[#9B9B9B] rounded-md w-8 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-[#EEF5FA] [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-[#EEF5FA]/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        day_button: cn(
          "h-8 w-8 p-0 font-normal rounded-md transition-colors",
          "hover:bg-[#F5F0E8] hover:text-[#1A1A1A]",
          "focus:bg-[#EEF5FA] focus:text-[#2D6A8F] focus:outline-none"
        ),
        range_start: "day-range-start rounded-l-md",
        range_end: "day-range-end rounded-r-md",
        selected: "bg-[#2D6A8F] text-white hover:bg-[#2D6A8F] hover:text-white focus:bg-[#2D6A8F] focus:text-white",
        today: "bg-[#F5F0E8] text-[#1A1A1A]",
        outside: "day-outside text-[#B0A89A] opacity-50 aria-selected:bg-[#EEF5FA]/50 aria-selected:text-[#9B9B9B] aria-selected:opacity-30",
        disabled: "text-[#B0A89A] opacity-50",
        range_middle: "aria-selected:bg-[#EEF5FA] aria-selected:text-[#2D6A8F]",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}

export { Calendar }
