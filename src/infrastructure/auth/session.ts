import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { randomBytes } from 'crypto';
import { SESSIONS_FILE } from '../config';

interface Session {
  userId: string;
  csrfToken: string;
}

const isProd = process.env.NODE_ENV === 'production';

// Load sessions from file
async function loadSessions(): Promise<Record<string, Session>> {
  try {
    const data = await fs.readFile(SESSIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

// Save sessions to file
async function saveSessions(sessions: Record<string, Session>): Promise<void> {
  await fs.writeFile(SESSIONS_FILE, JSON.stringify(sessions, null, 2), 'utf-8');
}

// Create a new session and persist it to file
export async function createSession(userId: string): Promise<{ sessionId: string; csrfToken: string }> {
  const sessionId = randomBytes(16).toString('hex');
  const csrfToken = randomBytes(16).toString('hex');

  const sessions = await loadSessions();
  sessions[sessionId] = { userId, csrfToken };
  await saveSessions(sessions);

  return { sessionId, csrfToken };
}

// Get session by ID from file
export async function getSession(sessionId: string): Promise<Session | null> {
  const sessions = await loadSessions();
  return sessions[sessionId] || null;
}

// Destroy session
export async function destroySession(sessionId: string): Promise<void> {
  const sessions = await loadSessions();
  if (sessions[sessionId]) {
    delete sessions[sessionId];
    await saveSessions(sessions);
  }
}

// Retrieve user session from request cookies
export async function getUserFromRequest(req: NextRequest): Promise<Session | null> {
  const sessionId = req.cookies.get('sessionId')?.value;
  if (!sessionId) return null;
  return getSession(sessionId);
}

// Set session cookie on response
export function setSessionCookie(response: NextResponse, sessionId: string) {
  response.cookies.set('sessionId', sessionId, {
    httpOnly: true,
    secure: isProd, 
    sameSite: 'strict',
    path: '/'
  });
}

// Clear session cookie
export function clearSessionCookie(response: NextResponse) {
  response.cookies.set('sessionId', '', {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    path: '/',
    maxAge: 0
  });
}
