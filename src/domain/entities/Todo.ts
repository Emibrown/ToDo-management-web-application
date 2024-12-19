export interface Todo {
    id: string;
    userId: string;
    content: string;
    dueDate?: Date;
    status: 'unfinished' | 'done';
    createdAt: Date;
}