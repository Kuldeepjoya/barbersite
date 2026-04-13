import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const Home = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.Home })),
);
const Booking = lazy(() =>
  import("@/pages/Booking").then((m) => ({ default: m.Booking })),
);

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Outlet />
    </Suspense>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking",
  component: Booking,
});

const routeTree = rootRoute.addChildren([homeRoute, bookingRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}
