"use client";
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';

const authSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthFormProps {
  type: 'signin' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [formData, setFormData] = useState<AuthFormData>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const isSignIn = type === 'signin';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationResult = authSchema.safeParse(formData);
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

    setLoading(true);

    try {
      const endpoint = isSignIn ? '/api/auth/signin' : '/api/auth/signup';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      if (!isSignIn) {
        await handleAutoLogin();
      } else {
        login(data.csrfToken);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Automatic login failed');
      }
      login(data.csrfToken);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} width="100%" maxWidth={400} mx="auto" mt={1}>
      <Typography variant="h5" textAlign="center">
        {isSignIn ? 'Sign In' : 'Sign Up'}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? 'Loading...' : isSignIn ? 'Sign In' : 'Sign Up'}
      </Button>
    </Box>
  );
};

export default AuthForm;
