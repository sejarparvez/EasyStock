import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import db from '@/lib/prisma';

// Define the required structure of the request body for type safety
interface UserCreationRequest {
  name: string;
  shopName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the hashing salt rounds (Higher is more secure, but slower)
const SALT_ROUNDS = 10;

export async function POST(req: Request) {
  let body: UserCreationRequest;

  try {
    body = await req.json();
  } catch (_error) {
    // Handle case where request body is not valid JSON
    return NextResponse.json(
      { message: 'Invalid JSON format in request body' },
      { status: 400 },
    );
  }

  console.log('API Request Body →', body);

  // 1. Basic Field Validation and Type Guard
  const { name, shopName, email, password, confirmPassword } = body;

  if (!name || !shopName || !email || !password || !confirmPassword) {
    return NextResponse.json(
      {
        message:
          'All fields (name, shopName, email, password, confirmPassword) are required.',
      },
      { status: 400 },
    );
  }

  // 2. Password Match Validation
  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: 'Password and Confirm Password do not match.' },
      { status: 400 },
    );
  }

  // 3. Email/Password Format Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: 'Invalid email format.' },
      { status: 400 },
    );
  }

  // 4. Password Strength Validation (Optional but recommended)
  if (password.length < 8) {
    return NextResponse.json(
      { message: 'Password must be at least 8 characters long.' },
      { status: 400 },
    );
  }

  try {
    // 5. Check if User Already Exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'An account with this email already exists.' },
        { status: 409 }, // 409 Conflict
      );
    }

    // 6. Secure Password Hashing
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 7. Create User in Database
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER', // Default role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // 8. Success Response
    return NextResponse.json(
      {
        message: 'Account created successfully!',
        // NEVER send the password or hashedPassword back in the response
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }, // 201 Created
    );
  } catch (error) {
    // Log the actual error for server-side debugging
    console.error('User Creation Error:', error);

    // Return a generic error to the client
    return NextResponse.json(
      { message: 'An unexpected error occurred during account creation.' },
      { status: 500 }, // 500 Internal Server Error
    );
  }
}
