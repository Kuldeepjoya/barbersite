import type { Service, ServiceCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";

const MASTER_DEEPAK_SERVICES: Service[] = [
  {
    id: 1,
    name: "Butterfly Haircut",
    description:
      "Master Deepak's signature layered butterfly cut — featherlight layers that frame the face with dramatic flair. A showstopper transformation.",
    price: 1500,
    durationMinutes: 60,
    category: "haircut",
  },
  {
    id: 2,
    name: "Signature Haircut",
    description:
      "The original Master Deepak signature — precision scissor work crafted for your bone structure. A cut that speaks confidence.",
    price: 1200,
    durationMinutes: 50,
    category: "haircut",
  },
  {
    id: 3,
    name: "Wolf Haircut",
    description:
      "Edgy textured wolf cut with layered volume and lived-in movement. Perfect for bold personalities who own every room.",
    price: 1400,
    durationMinutes: 55,
    category: "haircut",
  },
  {
    id: 4,
    name: "Round Layers",
    description:
      "Soft, bouncy round layers that add body and movement. Timeless elegance meets modern technique.",
    price: 1100,
    durationMinutes: 50,
    category: "haircut",
  },
  {
    id: 5,
    name: "Rhombus Cut",
    description:
      "The innovative rhombus cut — geometric precision and artistic shaping unique to Master Scissor Academy's curriculum.",
    price: 1800,
    durationMinutes: 65,
    category: "haircut",
  },
  {
    id: 6,
    name: "Advanced Hair Color",
    description:
      "Balayage, highlights, ombre, and vivid color transformations. Ammonia-free options available. Results that stop traffic.",
    price: 3500,
    durationMinutes: 120,
    category: "combo",
  },
  {
    id: 7,
    name: "Chemical Treatments",
    description:
      "Keratin smoothing, rebonding, and protein treatments for salon-glossy hair that lasts months. Approved professional products only.",
    price: 4000,
    durationMinutes: 150,
    category: "combo",
  },
];

export function useServices(category?: ServiceCategory) {
  return useQuery<Service[]>({
    queryKey: ["services", category],
    queryFn: async () => {
      if (category) {
        return MASTER_DEEPAK_SERVICES.filter((s) => s.category === category);
      }
      return MASTER_DEEPAK_SERVICES;
    },
    staleTime: 1000 * 60 * 5,
  });
}
