"use server"
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return redirect('/error');
  }

  revalidatePath('/', 'layout');
  return redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  
  console.log('signup');
  
  const { error } = await supabase.auth.signUp(data);
  console.log({ error });


  if (error) {
    return redirect('/error')
  }

  revalidatePath('/check-email', 'layout')
  return redirect('/check-email')
}