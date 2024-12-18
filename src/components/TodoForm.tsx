"use client";
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Alert, Typography } from '@mui/material';
import { z } from 'zod';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';

const todoSchema = z.object({
  content: z.string().min(1, 'To-Do task content is required'),
  dueDate: z.string().optional(),
});

type TodoFormData = z.infer<typeof todoSchema>;

interface TodoFormProps {
  initialData?: { content: string; dueDate?: string };
  onSubmit: (data: TodoFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ initialData, onSubmit, onCancel, isEditing = false }) => {
  const [content, setContent] = useState(initialData?.content || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = todoSchema.safeParse({ content, dueDate });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    onSubmit({ content: result.data.content, dueDate: result.data.dueDate });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h5" textAlign="center">
        {isEditing ? 'Edit Todo' : 'New Todo'}
      </Typography>

      <TextField
        label="To-Do Task Content"
        variant="outlined"
        fullWidth
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* <TextField
        label="Due Date"
        type="date"
        variant="outlined"
        fullWidth
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      /> */}

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Due Date"
          value={dueDate ? moment(dueDate, 'YYYY-MM-DD') : undefined}
          onChange={(newValue) => setDueDate(moment(newValue).format("YYYY-MM-DD"))}
        />
      </LocalizationProvider>

      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? 'Save Changes' : 'Add'}
        </Button>
      </Box>
    </Box>
  );
};

export default TodoForm;
