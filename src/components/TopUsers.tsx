import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const TopUsers: React.FC = () => {
  const posts = useSelector((state: any) => state.social.posts);
  const [topUsers, setTopUsers] = useState<any[]>([]);

  useEffect(() => {
    const userPostCounts = posts.reduce((acc: any, post: any) => {
      acc[post.userId] = (acc[post.userId] || 0) + 1;
      return acc;
    }, {});

    const sortedUsers = Object.entries(userPostCounts)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 5);

    setTopUsers(sortedUsers);
  }, [posts]);

  return (
    <Grid container spacing={2}>
      {topUsers.map(([userId, postCount]) => (
        <Grid item xs={12} sm={6} md={4} key={userId}>
          <Card>
            <CardContent>
              <Typography variant="h6">User ID: {userId}</Typography>
              <Typography>Posts: {postCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopUsers;
