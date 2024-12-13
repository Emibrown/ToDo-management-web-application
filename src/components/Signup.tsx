"use client";
import React from 'react';
import {
  AppBar,
  Box,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import AuthForm from './AuthForm';

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

export default function Signup() {
  return (
    <CenteredBox>
      <SignInForm>
        <AuthForm type="signup" />
      </SignInForm>
    </CenteredBox>
  );
}
