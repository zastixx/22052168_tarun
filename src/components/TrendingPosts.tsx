import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem } from '@mui/material';

const TrendingPosts: React.FC = () => {
  const mockTrendingPosts = [
    { id: 1, title: "Most liked post of the day", likes: 1200 },
    { id: 2, title: "Viral content trending", likes: 800 },
    { id: 3, title: "Popular discussion thread", likes: 650 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Trending Posts
      </Typography>
      <List>
        {mockTrendingPosts.map((post) => (
          <ListItem key={post.id}>
            <Card sx={{ width: '100%', mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography color="text.secondary">
                  {post.likes} likes
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TrendingPosts;
