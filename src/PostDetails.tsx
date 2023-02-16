import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Comment } from './interface';

interface PostDetailsProps {
  userName: string;
  email: string;
  postTitle: string;
  postBody: string;
  comments: Comment[];
  isPostOpen: boolean;
  onClose: () => void;
  userClicked: () => void;
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  userName,
  email,
  postTitle,
  postBody,
  comments,
  isPostOpen,
  onClose,
  userClicked,
}) => {
  return (
    <Modal open={isPostOpen} onClose={onClose}>
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
          height: '72vh',
          overflow: 'auto',
        }}
      >
        <Button
          size="small"
          sx={{
            textTransform: 'none',
            justifyContent: 'flex-start',
            textAlign: 'start',
            padding: 0,
          }}
          onClick={userClicked}
        >
          <Typography component="h6">
            <Typography component="p">User Name: {userName}</Typography>
            <Typography component="p">Email: {email}</Typography>
          </Typography>
        </Button>
        <Typography variant="h6" component="h2">
          <Typography component="p">Title: {postTitle}</Typography>
          <Typography component="p">
            Body:
            <br />
            {postBody}
          </Typography>
        </Typography>
        {comments.length > 0 ? (
          <Typography variant="h6" component="h2">
            {comments.map((comment, idx) => (
              <Typography component="div" key={idx}>
                <Typography component="div">Comment {idx + 1}</Typography>
                <ul>
                  <li>email: {comment.email}</li>
                  <li>name: {comment.name}</li>
                  <li>body: {comment.body}</li>
                </ul>
              </Typography>
            ))}
          </Typography>
        ) : (
          ''
        )}
      </Box>
    </Modal>
  );
};
