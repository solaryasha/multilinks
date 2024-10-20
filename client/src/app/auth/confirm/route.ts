import { NextRequest } from 'next/server';
import { type EmailOtpType } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('type') ?? '/';

  if (tokenHash && type) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash
    })

    if (!error) {
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
}