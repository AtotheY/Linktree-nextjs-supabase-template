import { useState } from "react";
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateRangeSelectorProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (start: Date, end: Date) => void;
}

export function DateRangeSelector({
  startDate,
  endDate,
  onDateChange,
}: DateRangeSelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handlePresetChange = (value: string) => {
    let end = new Date();
    let start: Date;

    switch (value) {
      case "today":
        start = new Date();
        break;
      case "yesterday":
        start = subDays(end, 1);
        end = subDays(end, 1);
        break;
      case "last7":
        start = subDays(end, 6);
        break;
      case "last14":
        start = subDays(end, 13);
        break;
      case "last28":
        start = subDays(end, 27);
        break;
      case "thisMonth":
        start = startOfMonth(end);
        break;
      case "lastMonth":
        start = startOfMonth(subMonths(end, 1));
        end = endOfMonth(subMonths(end, 1));
        break;
      default:
        return;
    }

    onDateChange(start, end);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <Select onValueChange={handlePresetChange} defaultValue="last7">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="last7">Last 7 days</SelectItem>
          <SelectItem value="last14">Last 14 days</SelectItem>
          <SelectItem value="last28">Last 28 days</SelectItem>
          <SelectItem value="thisMonth">This month</SelectItem>
          <SelectItem value="lastMonth">Last month</SelectItem>
        </SelectContent>
      </Select>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full sm:w-auto justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">
              {format(startDate, "MMM d, yyyy")}
            </span>
            <span className="hidden sm:inline mx-2">-</span>
            <span className="hidden sm:inline">
              {format(endDate, "MMM d, yyyy")}
            </span>
            <span className="sm:hidden">
              {format(startDate, "MM/dd/yy")} - {format(endDate, "MM/dd/yy")}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={{ from: startDate, to: endDate }}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                onDateChange(range.from, range.to);
                setIsCalendarOpen(false);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
