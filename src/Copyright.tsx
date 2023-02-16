import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://flying-musk.github.io/">
        Mars Huang
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
