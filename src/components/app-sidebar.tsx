'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/actions'

interface AppSidebarProps {
  user?: {
    email?: string
  } | null
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <aside className="w-64 border-r bg-gray-50 dark:bg-gray-900 p-4 flex flex-col h-screen">
      <div className="space-y-4">
        <div className="text-xl font-bold mb-6">Project Manager</div>
        <nav className="space-y-2">
          <Link href="/projects">
            <Button
              variant={pathname === '/projects' ? 'default' : 'ghost'}
              className="w-full justify-start"
            >
              My Projects
            </Button>
          </Link>
        </nav>
      </div>

      <div className="mt-auto pt-4 border-t">
        {user ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {user.email}
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </aside>
  )
}