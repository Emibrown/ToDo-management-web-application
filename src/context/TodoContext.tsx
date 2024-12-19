"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Todo } from '../domain/entities/Todo';
import { useSnackbar } from './SnackbarContext';

interface TodoContextValue {
  todos: Todo[];
  addTodo: (content: string, dueDate: string) => Promise<void>;
  updateTodo: (updatedTodo: Todo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

interface TodoProviderProps {
  initialTodos: Todo[];
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ initialTodos, children }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const {showSnackbar} = useSnackbar()

  const addTodo = async (content: string, dueDate: string) => {
    const csrfToken = localStorage.getItem('csrfToken') || '';
    const res = await fetch('/api/todos/create', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({ content, dueDate })
    });
    if (res.ok) {
      const newTodo: Todo = await res.json();
      setTodos(prev => [...prev, newTodo]);
      showSnackbar('Todo added successfully!', 'success')
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    const csrfToken = localStorage.getItem('csrfToken') || '';
    const res = await fetch('/api/todos/update', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify(updatedTodo)
    });
    if (res.ok) {
      const newTodo: Todo = await res.json();
      setTodos(prev => prev.map(t => t.id === newTodo.id ? newTodo : t));
      showSnackbar('Todo updated successfully!', 'info')
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  const deleteTodo = async (id: string) => {
    const csrfToken = localStorage.getItem('csrfToken') || '';
    const res = await fetch('/api/todos/delete', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({ id })
    });
    if (res.ok) {
      setTodos(prev => prev.filter(t => t.id !== id));
      showSnackbar('Todo deleted successfully!', 'error');
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within a TodoProvider");
  return context;
};
