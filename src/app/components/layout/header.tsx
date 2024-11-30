import { Box, Flex } from '@radix-ui/themes';
import { Logo } from '../icons/logo';
import Link from 'next/link';

export function Header() {
  
  return (
    <Flex direction="row" justify='between' pb='4' pt="4">
      <Box pl="9">
        <Link href='/'>
          <Logo />
        </Link>
      </Box>
    </Flex>
  )
}