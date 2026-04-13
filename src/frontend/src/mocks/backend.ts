import type { backendInterface } from "../backend";
import { BookingStatus, ServiceCategory } from "../backend";

export const mockBackend: backendInterface = {
  listServices: async () => [
    {
      id: BigInt(1),
      name: "Classic Haircut",
      description: "Precision scissor cut with styling, tailored to your face shape.",
      durationMinutes: BigInt(45),
      category: ServiceCategory.haircut,
      price: BigInt(35),
    },
    {
      id: BigInt(2),
      name: "Skin Fade",
      description: "Clean skin fade blended to perfection — from bald to your desired length.",
      durationMinutes: BigInt(50),
      category: ServiceCategory.fade,
      price: BigInt(45),
    },
    {
      id: BigInt(3),
      name: "Beard Trim & Shape",
      description: "Hot towel shave and beard sculpting for a sharp, defined look.",
      durationMinutes: BigInt(30),
      category: ServiceCategory.beardTrim,
      price: BigInt(25),
    },
    {
      id: BigInt(4),
      name: "Lineup & Edge Up",
      description: "Crisp hairline, temple, and neckline definition.",
      durationMinutes: BigInt(20),
      category: ServiceCategory.lineup,
      price: BigInt(20),
    },
    {
      id: BigInt(5),
      name: "Cut & Beard Combo",
      description: "Full haircut plus beard trim — the complete grooming experience.",
      durationMinutes: BigInt(75),
      category: ServiceCategory.haircut,
      price: BigInt(60),
    },
    {
      id: BigInt(6),
      name: "Buzz Cut",
      description: "Clean and even clipper cut all around with a defined finish.",
      durationMinutes: BigInt(25),
      category: ServiceCategory.haircut,
      price: BigInt(25),
    },
  ],
  listTeamMembers: async () => [
    {
      id: BigInt(1),
      name: "Marcus Cole",
      specialty: "Skin Fades & Tapers",
    },
    {
      id: BigInt(2),
      name: "Dion Rivera",
      specialty: "Classic Cuts & Beard Work",
    },
    {
      id: BigInt(3),
      name: "James Owens",
      specialty: "Textured Cuts & Lineups",
    },
  ],
  listBookings: async () => [],
  createBooking: async (req) => ({
    __kind__: "ok" as const,
    ok: {
      id: BigInt(1),
      customerName: req.customerName,
      status: BookingStatus.pending,
      customerPhone: req.customerPhone,
      teamMemberId: req.teamMemberId,
      createdAt: BigInt(Date.now()),
      preferredDateTime: req.preferredDateTime,
      serviceId: req.serviceId,
      customerEmail: req.customerEmail,
    },
  }),
  cancelBooking: async (id) => ({
    __kind__: "err" as const,
    err: "Booking not found",
  }),
  getBooking: async (id) => null,
  getService: async (id) => null,
  getTeamMember: async (id) => null,
};
