'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login, signup } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    const result = isSignUp
      ? await signup(formData)
      : await login(formData)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success(isSignUp ? 'Account created! Redirecting...' : 'Logged in! Redirecting...')
      router.push('/projects')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? 'Create an Account' : 'Welcome Back'}</CardTitle>
          <CardDescription>
            {isSignUp
              ? 'Sign up to start managing your projects'
              : 'Sign in to your account to continue'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
