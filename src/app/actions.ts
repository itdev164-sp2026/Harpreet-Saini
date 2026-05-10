'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createActionsClient } from '@/lib/supabase/actions'

// Auth Actions
export async function login(formData: FormData) {
  const supabase = await createActionsClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/projects')
  redirect('/projects')
}

export async function signup(formData: FormData) {
  const supabase = await createActionsClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/projects')
  redirect('/projects')
}

export async function signOut() {
  const supabase = await createActionsClient()
  await supabase.auth.signOut()
  redirect('/login')
}

// Project Actions
export async function createProject(formData: FormData) {
  const supabase = await createServerClient()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string || 'active'

  const { error } = await supabase
    .from('projects')
    .insert({
      title,
      description,
      status,
    })

  if (error) {
    console.error('Error creating project:', error)
    return { error: error.message }
  }

  revalidatePath('/projects')
  redirect('/projects')
}
