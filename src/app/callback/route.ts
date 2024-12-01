import { handleAuth } from '@workos-inc/authkit-nextjs';
import { NextRequest } from 'next/server';

export  const GET = async (request: NextRequest) => {
  console.log('callback route was triggered', request);
  try {
    await handleAuth({
      returnPathname: '/root',
    })(request)
  } catch(error) {
    console.error(error);
  }
}