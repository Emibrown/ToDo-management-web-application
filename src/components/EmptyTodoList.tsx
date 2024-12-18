import { Box, Typography } from '@mui/material';

interface EmptyTodoListProps {
  message?: string;
}

export default function EmptyTodoList({ message = "Todo list is empty" }: EmptyTodoListProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100%"
      p={4}
      marginTop={10}
    >
      <Box mb={2}>
        <svg width="135" height="139" viewBox="0 0 135 139" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M61.875 23.1667H22.5C19.5163 23.1667 16.6548 24.387 14.545 26.5593C12.4353 28.7316 11.25 31.6779 11.25 34.75V115.833C11.25 118.905 12.4353 121.852 14.545 124.024C16.6548 126.196 19.5163 127.417 22.5 127.417H101.25C104.234 127.417 107.095 126.196 109.205 124.024C111.315 121.852 112.5 118.905 112.5 115.833V75.2917M104.062 14.4792C106.3 12.1751 109.335 10.8807 112.5 10.8807C115.665 10.8807 118.7 12.1751 120.938 14.4792C123.175 16.7832 124.432 19.9082 124.432 23.1667C124.432 26.4251 123.175 29.5501 120.938 31.8542L67.5 86.875L45 92.6667L50.625 69.5L104.062 14.4792Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Box>
      <Typography variant="h6" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
}
