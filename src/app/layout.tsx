import { GetTodosUseCase } from '@/application/useCases/GetTodosUseCase';
import Nav from '@/components/Nav';
import { AuthProvider } from '@/context/AuthContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { TodoProvider } from '@/context/TodoContext';
import { Todo } from '@/domain/entities/Todo';
import { getSession } from '@/infrastructure/auth/session';
import { FileSystemTodoRepository } from '@/infrastructure/repositories/FileSystemTodoRepository';
import type { Metadata } from 'next'
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: 'ToDo management',
  description: 'ToDo management web application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('sessionId')?.value;
  const session = sessionId ? await getSession(sessionId) : null;
  let todos: Todo[] = []
  let csrfToken = null
  if (session) {
    csrfToken = session.csrfToken
    const repo = new FileSystemTodoRepository();
    const getTodosUseCase = new GetTodosUseCase(repo);
    todos = await getTodosUseCase.execute(session.userId);
  }

  return (
    <html lang="en">
      <body style={{padding: 0, margin: 0}}>
        <SnackbarProvider>
          <AuthProvider initialCsrfToken={csrfToken}>
            <TodoProvider initialTodos={todos}>
              <Nav />
              {children}
            </TodoProvider>
          </AuthProvider>
        </SnackbarProvider>
      </body>
    </html>
  )
}
