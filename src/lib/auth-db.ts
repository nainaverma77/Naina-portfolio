import crypto from 'crypto';
import { connectToDatabase } from './mongoose';
import { AdminModel } from '@/models/Admin';

/**
 * Hash a password using PBKDF2.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify a password against a stored PBKDF2 hash.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split(':');
    if (parts.length !== 2) return false;
    const [salt, hash] = parts;
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
  } catch (e) {
    console.error("Password verification error:", e);
    return false;
  }
}

/**
 * Seeds the database with default admin users from .env.local if empty.
 */
export async function seedAdminsIfEmpty() {
  await connectToDatabase();

  const count = await AdminModel.countDocuments();
  if (count === 0) {
    console.log("🚀 Admin collection is empty. Seeding from environment variables...");
    
    // Seed Admin
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'password';
    const adminEmail = process.env.OTP_RECEIVER_EMAIL || process.env.EMAIL_USER;

    const hashedAdminPass = hashPassword(adminPass);
    const adminDoc = new AdminModel({
      username: adminUser,
      password: hashedAdminPass,
      email: adminEmail,
      role: 'admin'
    });
    await adminDoc.save();
    console.log(`✅ Seeded admin user: ${adminUser}`);

    // Seed Master if exists
    const masterUser = process.env.MASTER_USERNAME;
    const masterPass = process.env.MASTER_PASSWORD;
    const masterEmail = process.env.MASTER_EMAIL;

    if (masterUser && masterPass) {
      const hashedMasterPass = hashPassword(masterPass);
      const masterDoc = new AdminModel({
        username: masterUser,
        password: hashedMasterPass,
        email: masterEmail,
        role: 'master'
      });
      await masterDoc.save();
      console.log(`✅ Seeded master user: ${masterUser}`);
    }
  }
}
