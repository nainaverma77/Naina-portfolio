import { NextResponse } from 'next/server';
import { fetchGithubReadme } from '@/lib/github';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repoUrl = searchParams.get('repoUrl');

  if (!repoUrl) {
    return NextResponse.json({ error: 'Missing repoUrl' }, { status: 400 });
  }

  const readmeContent = await fetchGithubReadme(repoUrl);
  
  return NextResponse.json({ content: readmeContent });
}
