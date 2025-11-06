import type { Metadata } from "next";
import { Manrope, Nunito_Sans } from "next/font/google";
import React from "react";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "StayDue - Never Miss a Due Date Again | Student Task Management",
  description: "The student task management platform that keeps you organized. Sync with Google Calendar, upload syllabi, and stay on top of every assignment. Free forever.",
  keywords: ["student task management", "assignment tracker", "due date reminder", "calendar sync", "syllabus upload", "student organizer"],
  openGraph: {
    title: "StayDue - Never Miss a Due Date Again",
    description: "The student task management platform that keeps you organized. Sync with Google Calendar, upload syllabi, and stay on top of every assignment.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StayDue - Never Miss a Due Date Again",
    description: "The student task management platform that keeps you organized.",
  },
};

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${nunitoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
