"use client";
import { useAuth } from '@/context/AuthContext';
import {
  AppBar,
  Button,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const {csrfToken, logout} = useAuth()
  const router = useRouter()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div"  sx={{ flexGrow: 1, fontSize: {xs: '18px', md: '24px'} }}>
          <Link href="/" color="inherit" underline="none">
            Todo management app
          </Link>
        </Typography>
        {
          csrfToken ? <Button onClick={logout} color="inherit" sx={{fontSize: {xs: '12px', md: '14px'}}}>Logout</Button>
          : (
            <>
              <Button onClick={() => router.push('/signin')} color="inherit" sx={{fontSize: {xs: '12px', md: '14px'}}}>Sign In</Button>
              <Button onClick={() => router.push('/signup')} color="inherit" sx={{fontSize: {xs: '12px', md: '14px'}}}>Sign Up</Button>
            </>
          )
        }
      </Toolbar>
    </AppBar>
  );
}
