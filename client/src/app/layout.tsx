// // Initial State: Defined in the createSlice function.
// Reducers: Functions (setIsDarkMode and setIsSidebarCollapsed) that update the state.
// Store Configuration: The Redux store is configured and provided to the app using Provider.
// Using Redux State: Components access the state using useAppSelector.
// Dispatching Actions: Components can dispatch actions to update the state using useAppDispatch.

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Management Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DashboardWrapper> {children}</DashboardWrapper>
      </body>
    </html>
  );
}
