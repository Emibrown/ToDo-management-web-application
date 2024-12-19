"use client";
import { List } from '@mui/material';
import { useTodos } from '@/context/TodoContext';
import TodoItem from './TodoItem';
import EmptyTodoList from './EmptyTodoList';

export default function TodoList() {
  const { todos } = useTodos();
  return (
    <>
      {todos.length === 0 ? (
        <EmptyTodoList />
      ) : (
        <List>
          {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </List>
      )}
    </>
  );
}
