import { Box, Flex } from '@radix-ui/themes';
import { Logo } from '../icons/logo';
import Link from 'next/link';
import { LogInButton } from '../log-in-button';
import { GetStartedButton } from '../get-started-button';

export function Header() {
  
  return (
    <Flex direction="row" justify='between' pb='4' pt="4">
      <Box pl="9">
        <Link href='/'>
          <Logo />
        </Link>
      </Box>
      <Box pr="9">
        <Flex gap="4">
          <LogInButton />
          <GetStartedButton />
        </Flex>
      </Box>
    </Flex>
  )
}