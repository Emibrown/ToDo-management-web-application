"use client";
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useTodos } from '@/context/TodoContext';
import NewTodoModal from './NewTodoModal';
import TodoList from './TodoList';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

export default function Landing() {
  const { addTodo } = useTodos();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCreateTodo = async (newTodo: { content: string; dueDate?: string }) => {
    await addTodo(newTodo.content, newTodo.dueDate || '');
    setOpenModal(false)
  };

  return (
    <Container>
      <Header>
        <Typography variant="h5" gutterBottom>
          Todo list
        </Typography>
        <Button
          variant="contained"
          color="info"
          onClick={handleOpenModal}
        >
          New Todo
        </Button>
      </Header>
      <TodoList />
      <NewTodoModal open={openModal} onClose={handleCloseModal} onCreate={handleCreateTodo} />
    </Container>
  );
}
