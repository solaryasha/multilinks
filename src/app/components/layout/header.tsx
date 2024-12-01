import { Box, Flex } from '@radix-ui/themes';
import { Logo } from '../icons/logo';
import Link from 'next/link';
import { LogInButton } from '../log-in-button';
import { GetStartedButton } from '../get-started-button';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { UserProfile } from './user-profile/user-profile';

export async function Header() {
  const { user } = await withAuth();
  return (
    <Flex direction="row" justify='between' pb='4' pt="4">
      <Box pl="9">
        <Link href='/'>
          <Logo />
        </Link>
      </Box>
      <Box pr="9">
        <Flex gap="4">
          {user
            ? <UserProfile user={user} />
            : (
              <>
                <LogInButton />
                <GetStartedButton />
              </>
            )}
        </Flex>
      </Box>
    </Flex>
  )
}