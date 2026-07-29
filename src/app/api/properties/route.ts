import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { createServerSupabaseClient } from '@/lib/supabase-server';

// R2 is S3-compatible, so the regular AWS SDK works against it —
// only the endpoint and credentials differ from real AWS S3.
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.R2_BUCKET_NAME || '';
// The public base URL for the bucket — either R2's own r2.dev subdomain
// (enable "Public access" on the bucket in the Cloudflare dashboard to get one)
// or a custom domain you've mapped to it.
const PUBLIC_BASE_URL = process.env.R2_PUBLIC_URL || '';

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB per image
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export async function POST(req: NextRequest) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll('files').filter((f): f is File => f instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploaded: string[] = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
      }
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: `File too large: ${file.name}` }, { status: 400 });
      }

      const bytes = new Uint8Array(await file.arrayBuffer());
      const ext = file.name.split('.').pop() || 'jpg';
      const key = `projects/${randomUUID()}.${ext}`;

      await r2.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: bytes,
          ContentType: file.type,
        })
      );

      uploaded.push(`${PUBLIC_BASE_URL}/${key}`);
    }

    return NextResponse.json({ urls: uploaded });
  } catch (err) {
    console.error('R2 upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
