import React from 'react';
import { Copyright } from './Copyright';
import { getAPI } from './API';
import { PostDetails } from './PostDetails';
import { UserDetails } from './UserDetails';
import { Post, Comment, User, userTemplate } from './interface';
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
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const theme = createTheme();

const App: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [user, setUser] = React.useState<User>(userTemplate);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [postAmount, setPostAmount] = React.useState<number>(20);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [postTitle, setPostTitle] = React.useState<string>('');
  const [postBody, setPostBody] = React.useState<string>('');

  const [isPostOpen, setIsPostOpen] = React.useState<boolean>(false);
  const [isUserOpen, setIsUserOpen] = React.useState<boolean>(false);

  useBottomScrollListener(
    React.useCallback(() => {
      if (postAmount === 100) {
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setPostAmount(postAmount + 20);
      }, 1000);
    }, [postAmount])
  );

  const getModalData = (userId: number, id: number) => {
    getAPI(`users/${userId}`).then((res) => {
      if (res.status === 200) {
        // console.log('ohlala for user', res.data);
        setUser(res.data);
        setUserName(res.data.username);
        setEmail(res.data.email);
      } else {
        console.log(res);
      }
    });
    getAPI(`posts/${id}/comments`).then((res) => {
      if (res.status === 200) {
        // console.log('ohlala for comments', res.data);
        setComments(res.data);
      } else {
        console.log(res);
      }
    });
    setIsPostOpen(true);
  };
  const getPosts = () =>
    getAPI('posts/').then((res) => {
      if (res.status === 200) {
        // console.log('ohlala for posts', res.data);
        setPosts(res.data);
      } else {
        console.log(res);
      }
    });

  React.useEffect(() => {
    getPosts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Material UI
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
                        getModalData(post.userId, post.id);
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
        <PostDetails
          userName={userName}
          email={email}
          postTitle={postTitle}
          postBody={postBody}
          comments={comments}
          isPostOpen={isPostOpen}
          onClose={() => {
            setIsPostOpen(false);
          }}
          userClicked={() => {
            setIsPostOpen(false);
            setIsUserOpen(true);
          }}
        />
        <UserDetails
          user={user}
          isUserOpen={isUserOpen}
          onClose={() => {
            setIsUserOpen(false);
          }}
          backClick={() => {
            setIsUserOpen(false);
            setIsPostOpen(true);
          }}
        />
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
    </ThemeProvider>
  );
};

export default App;
