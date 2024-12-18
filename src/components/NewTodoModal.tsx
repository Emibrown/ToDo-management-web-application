"use client";
import React from 'react';
import { Modal, Box } from '@mui/material';
import TodoForm from './TodoForm';

type NewTodoModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (todo: { content: string; dueDate?: string }) => void;
};

const NewTodoModal: React.FC<NewTodoModalProps> = ({ open, onClose, onCreate }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '70%', md: '50%', lg: '40%' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <TodoForm onSubmit={onCreate} onCancel={onClose} />
      </Box>
    </Modal>
  );
};

export default NewTodoModal;
