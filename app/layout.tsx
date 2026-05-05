import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OmniSearch — AI Knowledge for Your Company",
  description:
    "Connect Notion, Drive, Slack, and Jira. Get instant, cited answers from your company's collective knowledge.",
  metadataBase: new URL("https://omnisearch.example.com"),
  openGraph: {
    title: "OmniSearch — AI Knowledge for Your Company",
    description:
      "Eliminate information silos. Ask anything, get cited answers in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
