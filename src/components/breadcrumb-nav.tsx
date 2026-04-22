"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const pageNames: Record<string, string> = {
  "/": "Overview",
  "/projects": "Projects",
  "/settings": "Settings",
};

export function BreadcrumbNav() {
  const pathname = usePathname();
  
  const getPageName = () => {
    if (pageNames[pathname]) return pageNames[pathname];
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) : "Overview";
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
      <Link 
        href="/" 
        className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center"
      >
        <Home className="h-4 w-4 mr-1" />
        ITDEV-164
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {getPageName()}
      </span>
    </nav>
  );
}
