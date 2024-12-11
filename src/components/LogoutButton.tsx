"use client";

import { Button } from '@mui/material';

export default function LogoutButton() {

    const handleLogout = async () => {
        const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
        localStorage.removeItem('csrfToken');
        window.location.href = '/login';
        } else {
        const data = await res.json();
        alert(data.error || 'Logout failed');
        }
    };

    return (
        <Button color="inherit" onClick={handleLogout}>
        Logout
        </Button>
    );
}
