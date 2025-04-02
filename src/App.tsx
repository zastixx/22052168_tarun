import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';
import { SocialProvider } from './store/SocialContext';

const App: React.FC = () => {
  return (
    <SocialProvider>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Social Media Analytics
            </Typography>
            <Button color="inherit" component={Link} to="/">Feed</Button>
            <Button color="inherit" component={Link} to="/top-users">Top Users</Button>
            <Button color="inherit" component={Link} to="/trending">Trending</Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/top-users" element={<TopUsers />} />
            <Route path="/trending" element={<TrendingPosts />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </SocialProvider>
  );
};

export default App;
