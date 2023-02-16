import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { User } from './interface';

interface UserDetailsProps {
  user: User;
  isUserOpen: boolean;
  onClose: () => void;
  backClick: () => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({
  user,
  isUserOpen,
  onClose,
  backClick,
}) => {
  return (
    <Modal open={isUserOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <Typography component="h6">
          <Typography component="p">Id: {user.id}</Typography>
          <Typography component="p">Username: {user.username}</Typography>
          <Typography component="p">Name: {user.name}</Typography>
          <Typography component="p">Email: {user.email}</Typography>
          <Typography component="p">Phone: {user.phone}</Typography>
          <Typography component="p">Website: {user.website}</Typography>
        </Typography>
        <Button size="small" onClick={backClick}>
          Back
        </Button>
      </Box>
    </Modal>
  );
};
