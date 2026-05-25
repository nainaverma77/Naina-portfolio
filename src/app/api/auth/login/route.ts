import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AdminModel } from '@/models/Admin';
import { verifyPassword, seedAdminsIfEmpty } from '@/lib/auth-db';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    await seedAdminsIfEmpty();
    const adminUser = await AdminModel.findOne({ role: 'admin' });
    
    if (adminUser && verifyPassword(password, adminUser.password)) {
      // Set an HTTP-Only secure cookie for authentication
      const cookieStore = await cookies();
      cookieStore.set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 401 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
