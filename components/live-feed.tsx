import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCountryFlag } from "@/utils/countryUtils";

interface Action {
  event_type: string;
  link_id: string;
  country: string;
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

  return (
    <ScrollArea className="h-[120px]">
      <ul className="space-y-2">
        {filteredActions.map((action, index) => (
          <li key={index} className="text-sm flex items-center animate-fade-in">
            <span
              className="mr-2"
              role="img"
              aria-label={`${action.country} flag`}
              title={action.country}
            >
              {action.country ? getCountryFlag(action.country) : "🌎"}
            </span>

            <span className="text-xs text-gray-500 mr-2">
              {new Date(action.created_at).toLocaleTimeString()}
            </span>

            <span className="font-medium">
              {action.event_type === "visit" ? "visit" : "click"}
            </span>
            {action.link_id && (
              <span className="ml-2">
                on{" "}
                <a
                  href={action.link_id}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {new URL(action.link_id).hostname}
                </a>
              </span>
            )}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
