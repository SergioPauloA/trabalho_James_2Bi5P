"use client";

import { NavBar } from "@/components/NavBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="content">{children}</main>
    </div>
  );
}
