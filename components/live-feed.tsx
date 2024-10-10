import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCountryFlag } from "@/utils/countryUtils";

interface Action {
  event_type: string;
  link_id: string;
  country: string | null;
  created_at: string;
}

interface LiveFeedProps {
  showVisits: boolean;
}

export default function LiveFeed({ showVisits }: LiveFeedProps) {
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    const fetchRecentActions = async () => {
      try {
        const response = await fetch("/api/analytics/live");
        if (!response.ok) {
          throw new Error("Failed to fetch recent actions");
        }
        const data = await response.json();
        setActions(data);
      } catch (error) {
        console.error("Error fetching recent actions:", error);
      }
    };

    fetchRecentActions();
    const interval = setInterval(fetchRecentActions, 7000);

    return () => clearInterval(interval);
  }, []);

  const filteredActions = showVisits
    ? actions
    : actions.filter((action) => action.event_type !== "visit");

  const formatAction = (action: Action) => {
    const time = new Date(action.created_at).toLocaleTimeString();
    const eventType = action.event_type === "visit" ? "visitor" : "click";
    const linkInfo =
      action.event_type === "click" && action.link_id
        ? `on ${new URL(action.link_id).hostname}`
        : "";

    const flag = getCountryFlag(action.country || "");
    const locationInfo = action.country
      ? `from ${action.country} ${flag}`
      : flag;

    return `[${time}] ${eventType} ${locationInfo} ${linkInfo}`.trim();
  };

  return (
    <ScrollArea className="h-[200px]">
      <ul className="space-y-3">
        {filteredActions.map((action, index) => (
          <li
            key={index}
            className="text-sm animate-fade-in bg-gray-50 p-2 rounded-md"
          >
            {formatAction(action)}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
