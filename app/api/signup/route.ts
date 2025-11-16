import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('API →', body);
  // Here you would typically handle user creation, e.g., save to a database
  await new Promise((r) => setTimeout(r, 1500));

  // Basic validation
  if (!body.email || !body.password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 },
    );
  }

  // For now, just return a success response
  return NextResponse.json(
    { message: 'Account created successfully!' },
    { status: 201 },
  );
}
