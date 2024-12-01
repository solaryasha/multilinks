'use client';

import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar, Box, DropdownMenu, Flex, IconButton, Text } from '@radix-ui/themes';
import { User } from '@workos-inc/node';

import styles from './user-profile.module.css';
import authkitSignOut from '@/actions/signOut';

interface Props {
  user: User
}

export function UserProfile(props: Props) {
  const { user } = props;

  const handleSignOutClick = async () => {
    await authkitSignOut()
  }

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger>
        <IconButton variant='ghost' className={styles.link}>
          <Avatar
            radius='full'
            size="2"
            fallback={user.firstName?.[0] || <PersonIcon />}
          />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2">
        <DropdownMenu.Label>
          <Flex direction='column'>
            <Text as="p" size="3" weight="medium">
              {user.firstName}
            </Text>
            <Text as="p" size="1">
              {user.email}
            </Text>
          </Flex>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color='blue' onClick={handleSignOutClick} className={styles.link}>
          <Box>Log out</Box>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>

  )
}