import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DashboardLayout } from "@/components/dashboard-layout";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ITDEV-164 Dashboard",
  description: "Web Programming 2 Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardLayout breadcrumb={<BreadcrumbNav />}>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
