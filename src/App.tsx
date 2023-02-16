import React from 'react';
import { Copyright } from './Copyright';
import { getAPI } from './API';
import { Post } from './interface';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const theme = createTheme();

const App: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [postAmount, setPostAmount] = React.useState<number>(20);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [postTitle, setPostTitle] = React.useState<string>('');
  const [postBody, setPostBody] = React.useState<string>('');

  useBottomScrollListener(
    React.useCallback(() => {
      if (postAmount === 100) {
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        console.log('hello mars time is up');
        setIsLoading(false);
        setPostAmount(postAmount + 20);
      }, 1000);
    }, [postAmount])
  );

  const getData = () =>
    getAPI().then((res) => {
      if (res.status === 200) {
        console.log('ohlala', res.data);
        setPosts(res.data);
      } else {
        console.log(res);
      }
    });

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Posts
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {posts.slice(0, postAmount).map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography>
                      {post.body.substring(0, 100) +
                        (post.body.length > 100 ? '...' : '')}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setPostTitle(post.title);
                        setPostBody(post.body);
                        setIsModalOpen(true);
                      }}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container
          sx={{
            height: 48,
            display: 'flex',
            justifyContent: 'center',
          }}
          maxWidth="md"
        >
          {isLoading ? <CircularProgress color="primary" /> : ''}
        </Container>
        <Modal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
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
            }}
          >
            <Typography variant="h6" component="h2">
              {postTitle}
            </Typography>
            <Typography sx={{ mt: 2 }}>{postBody}</Typography>
          </Box>
        </Modal>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
    </ThemeProvider>
  );
};

export default App;
