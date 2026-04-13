import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      {/* Offset fixed header so content is never obscured */}
      <main
        className="flex-1"
        style={{ paddingTop: "var(--header-height, 80px)" }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
