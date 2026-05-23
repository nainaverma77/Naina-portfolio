import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) return NextResponse.json({ error: 'File param required' }, { status: 400 });

  try {
    const filePath = path.join(process.cwd(), 'src/data', `${file}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) return NextResponse.json({ error: 'File param required' }, { status: 400 });

  try {
    const body = await request.json();
    const filePath = path.join(process.cwd(), 'src/data', `${file}.json`);
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
  }
}
