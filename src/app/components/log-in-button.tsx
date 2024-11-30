import { Button, Link } from '@radix-ui/themes';
import { getSignInUrl } from '@workos-inc/authkit-nextjs';

export async function LogInButton() {
  const signInUrl = await getSignInUrl();

  return (
    <Button asChild size='2'>
      <Link href={signInUrl}>Log In</Link>
    </Button>
  )
}