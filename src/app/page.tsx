export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-gray-500 mt-2">Welcome to your ITDEV-164 Dashboard</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Projects</h3>
          <p className="text-2xl font-bold">View and manage your projects</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Server Components</h3>
          <p className="text-sm">Data fetched on the server - no loading spinners!</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Supabase Integration</h3>
          <p className="text-sm">Connected to real database with RLS policies</p>
        </div>
      </div>
    </div>
  );
}
