import { getSession, refreshSession } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { workos } from '../api/workos';
import { on } from 'events';

export const GET = async (request: NextRequest)  {
  let session = await getSession();

  if (!session) {
    return redirect('/');
  }

  // If this is a new user who just subscribed, their role won't have been updated
  // so we need to refresh the session to get the updated role
  if (session && !session.role) {
    const oms = await workos.userManagement.listOrganizationMemberships({
      userId: session.user?.id
    })

    if (oms.data.length > 0) {
      // @ts-expect-error will be fixed in the next version of @workos-inc/authkit-nextjs
      session = await refreshSession({
        organizationId: oms.data[0].organizationId,
        ensureSignedIn: true,
      })
    }
  }

  if (session && session.organizationId) {
    await workos.auditLogs.createEvent(session.organizationId, {
      action: 'user.logged_in',
      occurredAt: new Date(),
      actor: {
        type: 'user',
        id: session.user?.id,
        metadata: {
          role: session.role as string
        }
      },
      targets: [
        {
          type: 'user',
          id: session.user?.id,
        },
      ],
      context: {
        location: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
      },
    })
  }

  switch(session?.role) {
    case 'admin':
      return redirect('/dashboard')

    case 'member':
      return redirect('/explore')
    
      default:
        return redirect('/')
  }
}