## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**
Using the Supabase client at src/lib/supabase.ts, create a new Server Component at src/app/projects/page.tsx that fetches all records from the "projects" table in Supabase and displays them in cards with color-coded status badges.

**What happened:**
The Agent created a proper Server Component with async/await, no "use client" directive, and direct data fetching. It used shadcn/ui Card components and implemented color-coded badges for different status values.

### Prompt 2

**What I asked:**
The breadcrumb in src/app/layout.tsx always shows "Overview" because the page name is hardcoded. Extract the breadcrumb into its own client component that uses usePathname() to display the correct page name.

**What happened:**
The Agent created a client component with usePathname() hook, mapped routes to display names, and integrated it into the layout. This demonstrates the proper separation: Server Component for data fetching, Client Component for browser-specific functionality.

### Reflection

Fetching data on the server feels much cleaner and more direct than the useEffect pattern. There's no loading state management, no empty render cycles, and the HTML arrives already populated. The biggest surprise is how simple it is - just make the component async and await the data. The traditional pattern required useState, useEffect, loading flags, and often resulted in layout shifts. Server Components eliminate all of that complexity while keeping API keys secure on the server.
