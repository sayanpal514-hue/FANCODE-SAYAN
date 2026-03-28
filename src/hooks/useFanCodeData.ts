import { useQuery } from "@tanstack/react-query";

export interface Match {
  type: "live" | "upcoming";
  tournament: string;
  match: string;
  match_id: string;
  category: string;
  language: string;
  match_url: string;
  stream_url: string;
  all_resolutions: Record<string, string>;
  image: string;
  status: string;
}

export interface FanCodeData {
  Author: string;
  Telegram: string;
  name: string;
  last_updated: string;
  total_matches: number;
  live_matches: number;
  upcoming_matches_count: number;
  matches: Match[];
}

const API_URL = "https://fcapi.amitbala1993.workers.dev";

const fetchData = async (): Promise<FanCodeData> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export const useFanCodeData = () => {
  return useQuery({
    queryKey: ["fancode-data"],
    queryFn: fetchData,
    refetchInterval: 30000,
    staleTime: 10000,
  });
};
