"use client";
import React from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px',
});

const EditContentForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function Edit() {
  const [dueDate, setDueDate] = React.useState<Date>();

  return (
    <CenteredBox>
      <EditContentForm>
        <Typography variant="h5" gutterBottom>
          Edit Task
        </Typography>
        <TextField
          label="To-Do Task Content"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: 'flex', width: '100%', marginTop: 3 }}>
            <DatePicker
              label="Due Date"
            />
          </Box>
        </LocalizationProvider>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 5, gap: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            href="/"
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginRight: 1 }}
            fullWidth
          >
            Save
          </Button>
        </Box>
      </EditContentForm>
    </CenteredBox>
  );
}
