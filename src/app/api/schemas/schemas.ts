import { z } from 'zod';

const contentSchema = z.string().min(1, 'Content is required');
const statusSchema = z.enum(['unfinished', 'done']);
const dueDateSchema = z.string().transform((value) => {
  const trimmed = value.trim();
  if (trimmed === '') {
    return undefined;
  }
  const date = new Date(trimmed);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid due date');
  }
  return date;
}).optional();

export const createTodoSchema = z.object({
  content: contentSchema,
  dueDate: dueDateSchema.optional(),
});

export const updateTodoSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  content: contentSchema.optional(),
  dueDate: dueDateSchema.optional(),
  status: statusSchema.optional(),
});

export const deleteTodoSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});
