"use client";
import { ListItem, ListItemText, IconButton, Checkbox, ListItemIcon } from '@mui/material';
import { Todo } from '@/domain/entities/Todo';
import { useTodos } from '@/context/TodoContext';
import { Edit, Delete, CheckCircle, Circle} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { updateTodo, deleteTodo } = useTodos();
  const router = useRouter()

  const handleToggle = async () => {
    await updateTodo({ ...todo, status: todo.status === 'done' ? 'unfinished' : 'done' });
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  return (
    <ListItem>
        <ListItemIcon onClick={handleToggle}>
            {todo.status === 'done' ? <CheckCircle color='info' /> :  <Circle color='info' /> }
        </ListItemIcon>
        <ListItemText 
            primary={todo.content}
        />
        <IconButton onClick={() => router.push(`/edit/${todo.id}`) } color="info" edge="end" sx={{ marginRight: 1 }}>
            <Edit />
        </IconButton>
        <IconButton edge="end" onClick={handleDelete}>
            <Delete />
        </IconButton>
    </ListItem>
  );
}
