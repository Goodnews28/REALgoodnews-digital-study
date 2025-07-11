// src/app/layout.tsx
import './globals.css';
import "@fontsource/inter"; 
import { ReactNode } from 'react';

export const metadata = {
  title: "Goodnews' Digital Study",
  description: "Where curiosity meets code, and stories unfold.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

