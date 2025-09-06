"use client";

import { useTheme } from "next-themes";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import DotGrid from "@/components/DotGrid";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background DotGrid */}
      <div className="absolute inset-0 z-0" style={{ width: "100%", height: "100%" }}>
        <DotGrid
          dotSize={6}
          gap={15}
          baseColor={theme === "dark" ? "#000000" : "#ffffff"}
          activeColor="#5227FF"
          proximity={600}
          shockRadius={400}
          shockStrength={5}
          resistance={750}
          returnDuration={1.6}
        />
      </div>

      {/* Content above background */}
      <div className="relative z-10">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </div>
    </div>
  );
}
