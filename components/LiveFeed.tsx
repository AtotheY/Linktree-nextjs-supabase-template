import { useEffect, useState } from "react";

interface Action {
  event_type: string;
  link_id: string;
  country: string;
  created_at: string;
}

export default function LiveFeed() {
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

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Live Feed</h2>
      <ul className="space-y-2">
        {actions.map((action, index) => (
          <li key={index} className="border-b pb-2">
            <span className="font-medium">{action.event_type}</span> on link{" "}
            {action.link_id}
            <br />
            <span className="text-sm text-gray-600">
              from {action.country} at{" "}
              {new Date(action.created_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
