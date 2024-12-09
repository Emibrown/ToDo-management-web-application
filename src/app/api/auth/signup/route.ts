import { SignUpUseCase } from '@/application/useCases/SignUpUseCase';
import { FileSystemUserRepository } from '@/infrastructure/repositories/FileSystemUserRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Validate input
  if (typeof username !== 'string' || !username.trim()) {
    return NextResponse.json({ error: 'Username is required and must be a string.' }, { status: 400 });
  }

  if (typeof password !== 'string' || !password.trim()) {
    return NextResponse.json({ error: 'Password is required and must be a string.' }, { status: 400 });
  }

  const repo = new FileSystemUserRepository();
  const useCase = new SignUpUseCase(repo);

  try {
    const user = await useCase.execute(username.trim(), password.trim());
    return NextResponse.json({ message: 'User created successfully', user: { username: user.username } }, { status: 201 });
  } catch (error: any) {
    // The use case might throw errors like "Username already taken"
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
