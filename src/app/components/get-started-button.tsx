import { Button, Link } from '@radix-ui/themes';
import { getSignUpUrl } from '@workos-inc/authkit-nextjs';

export async function GetStartedButton() {
  const signInUrl = await getSignUpUrl();

  return (
    <Button asChild size='2'>
      <Link href={signInUrl}>Get started</Link>
    </Button>
  )
}