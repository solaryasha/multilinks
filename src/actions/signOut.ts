'use server'
import { workos } from '@/app/api/workos';
import { signOut, withAuth } from '@workos-inc/authkit-nextjs'
import { headers } from 'next/headers';

export default async function authkitSignOut () {
  const { user, role, organizationId } = await withAuth();

  const requestHeaders = await headers();

    // Create an audit log entry if the user is in an organization
  if (organizationId) {
    await workos.auditLogs.createEvent(organizationId, {
      action: 'user.logged_out',
      occurredAt: new Date(),
      actor: {
        type: 'user',
        id: user?.id,
        name: `${user.firstName || ''} ${user.lastName || ''}`,
        metadata: {
          role: role || '' as string
        }
      },
      targets: [
        {
          type: 'user',
          id: user?.id,
        },
      ],
      context: {
        location: requestHeaders.get('x-forwarded-for') || requestHeaders.get('x-real-ip') || 'unknown'
      },
    })
  }

  await signOut();
}