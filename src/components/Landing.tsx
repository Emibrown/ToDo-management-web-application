"use client";
import { useState } from 'react';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { CheckCircle, Edit, Delete, Circle } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

// Styled components
const Header = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

// Main Component
export default function Landing() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const router = useRouter()

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <Container>
      {/* Input Box */}
      <Header>
        <Typography variant="h5" gutterBottom>
          Todo list
        </Typography>
        <Button
          variant="contained"
          color="info"
          onClick={handleAddTodo}
          sx={{ marginLeft: 2 }}
        >
          New Todo
        </Button>
      </Header>
      {/* Todo List */}
      <List>
        {todos.map((todo, index) => (
          <ListItem key={index} disableGutters>
            <ListItemIcon>
              <CheckCircle color="info" />
            </ListItemIcon>
            <ListItemText primary={todo} />
            <IconButton onClick={() => router.push("/edit") } color="info" edge="end" sx={{ marginRight: 1 }}>
              <Edit />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDeleteTodo(index)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
