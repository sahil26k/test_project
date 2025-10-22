'use client';

import { TranslationProvider } from "@/context/TranslationContext";
import Navigation from "@/components/Navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TranslationProvider>
      <Navigation />
      {children}
    </TranslationProvider>
  );
}

