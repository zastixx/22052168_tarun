import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';

const Feed: React.FC = () => {
  const mockPosts = [
    { id: 1, author: "User1", content: "First post content", likes: 42 },
    { id: 2, author: "User2", content: "Second post content", likes: 27 },
    { id: 3, author: "User3", content: "Third post content", likes: 15 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Feed
      </Typography>
      {mockPosts.map((post) => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{post.author}</Typography>
            <Typography variant="body1">{post.content}</Typography>
            <Typography color="text.secondary">
              {post.likes} likes
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Like</Button>
            <Button size="small">Share</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Feed;
