import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MG FESTA | Event Experiences in Recife",
  description:
    "MG FESTA is a mobile-first landing page for event experiences, party content, and celebrations in Recife, Pernambuco.",
  applicationName: "MG FESTA",
  authors: [{ name: "MG FESTA" }],
  creator: "MG FESTA",
  publisher: "MG FESTA",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "MG FESTA",
    description:
      "Event experiences, party content, and celebrations in Recife, Pernambuco.",
    siteName: "MG FESTA",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MG FESTA",
    description:
      "Event experiences, party content, and celebrations in Recife, Pernambuco.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ff333a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
