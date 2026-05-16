import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: any) {
          cookieStore.set(name, '', { ...options, maxAge: 0 })
        },
      },
    }
  )
}

export async function login(formData: FormData) {
  'use server'
  
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    return { error: error.message }
  }
  
  redirect('/projects')
}

export async function signup(formData: FormData) {
  'use server'
  
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })
  
  if (error) {
    return { error: error.message }
  }
  
  redirect('/projects')
}

export async function signOut() {
  'use server'
  
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function createProject(formData: FormData) {
  'use server'
  
  const supabase = await createClient()
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'You must be logged in to create a project' }
  }
  
  const { error } = await supabase
    .from('projects')
    .insert({
      name,
      description,
      user_id: user.id,
    })
  
  if (error) {
    return { error: error.message }
  }
  
  redirect('/projects')
}
