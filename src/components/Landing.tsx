"use client";
import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { CheckCircle, Edit, Delete } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

// Styled components
const TodoInput = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  // boxShadow: theme.shadows[3],
}));

const AppBarHeader = styled(AppBar)({
  backgroundColor: '#6a1b9a',
});

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
    <>
      {/* Main Content */}
      <Container>
        {/* Input Box */}
        <TodoInput>
          <InputBase
            placeholder="Enter Title"
            fullWidth
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button
            variant="contained"
            color="info"
            onClick={handleAddTodo}
            sx={{ marginLeft: 2 }}
          >
            ADD
          </Button>
        </TodoInput>

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
    </>
  );
}
