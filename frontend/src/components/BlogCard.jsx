import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export function BlogCard({ post }) {
  let date = new Date(post.dateCreated);
  let stringDate = date.toString();
  return (
    <Link to={`/readblog/${post._id}`} style={{ textDecoration: 'none' }}>
      <Card 
        sx={{ 
          maxWidth: 550,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 3
          }
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={post.imgUrl}
          alt={post.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h1" sx={{ color: '#1c2938' }}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {post.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {stringDate.slice(4, 15)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
