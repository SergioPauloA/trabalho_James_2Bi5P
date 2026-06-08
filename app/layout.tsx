import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { AppShell } from "@/components/layouts/AppShell";

export const metadata: Metadata = {
  title: "Sistema de Gestão de Projetos Integradores",
  description: "Frontend Next.js para gestão de projetos escolares",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
