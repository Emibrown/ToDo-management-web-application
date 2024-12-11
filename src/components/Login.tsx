"use client";

import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

const Header = styled(AppBar)({
  backgroundColor: '#1976d2',
});

const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px',
});

const SignInForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function Login() {
  return (
    <>
      {/* Sign-In Form */}
      <CenteredBox>
        <SignInForm>
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign In
          </Button>
        </SignInForm>
      </CenteredBox>
    </>
  );
}
