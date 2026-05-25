import { connectToDatabase } from './src/lib/mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log("Connecting to:", process.env.MONGODB_URI);
    await connectToDatabase();
    console.log("SUCCESS!");
    process.exit(0);
  } catch (err) {
    console.error("FAILED TO CONNECT:");
    console.error(err);
    process.exit(1);
  }
}

testConnection();
