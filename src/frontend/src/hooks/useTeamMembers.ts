import type { TeamMember } from "@/types";
import { useQuery } from "@tanstack/react-query";

const STATIC_TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Marcus Webb",
    specialty: "Skin fades, textured crops, and modern styling",
  },
  {
    id: 2,
    name: "Dario Reyes",
    specialty: "Classic cuts, hot towel shaves, beard sculpting",
  },
  {
    id: 3,
    name: "Theo Okafor",
    specialty: "Afro textures, waves, creative designs",
  },
  {
    id: 4,
    name: "James Calloway",
    specialty: "Precision tapers, pompadours, vintage styles",
  },
];

export function useTeamMembers() {
  return useQuery<TeamMember[]>({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      // When backend is available: return actor.listTeamMembers()
      return STATIC_TEAM;
    },
    staleTime: 1000 * 60 * 10,
  });
}
