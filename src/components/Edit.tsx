"use client";
import React from 'react';
import {
  Box,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import TodoForm from './TodoForm';
import { Todo } from '@/domain/entities/Todo';
import { useTodos } from '@/context/TodoContext';
import { useRouter } from 'next/navigation';

interface EditProps {
  todo: Todo 
}

const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px',
});

const EditContentForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  flexDirection: 'column',
  alignItems: 'center',
}));

const Edit: React.FC<EditProps> = ({todo}) => {
  const {updateTodo} = useTodos()
  const router = useRouter();

  const handleUpdateTodo = async (updatedTodo: { content: string; dueDate?: string | null }) => {
    await updateTodo({
      ...todo,
      content: updatedTodo.content,
      dueDate: updatedTodo.dueDate ? new Date(updatedTodo.dueDate) : undefined,
    });
    router.refresh();
    router.push('/');
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <CenteredBox>
      <EditContentForm
        sx={{
          width: { xs: '80%', sm: '70%', md: '50%', lg: '40%' },
        }}
      >
        <TodoForm initialData={{content: todo?.content, dueDate: todo.dueDate ? todo.dueDate.toISOString().split('T')[0] : ''}} onSubmit={handleUpdateTodo} onCancel={handleCancel} isEditing />
      </EditContentForm>
    </CenteredBox>
  );
}

export default Edit;