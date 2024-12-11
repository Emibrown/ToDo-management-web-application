"use client";
import {
  AppBar,
  Button,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const router = useRouter()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div"  sx={{ flexGrow: 1, fontSize: {xs: '18px', md: '24px'} }}>
          <Link href="/" color="inherit" underline="none">
            Todo management app
          </Link>
        </Typography>
        <Button onClick={() => router.push('/login')} color="inherit" sx={{fontSize: {xs: '12px', md: '14px'}}}>Sign In</Button>
        <Button color="inherit" sx={{fontSize: {xs: '12px', md: '14px'}}}>Sign Up</Button>
      </Toolbar>
    </AppBar>
  );
}
