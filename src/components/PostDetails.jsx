import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <center>
      <h1 style={{color:"blue"}}>PostDetails</h1>
      <Card style={{width:"350px", alignItems:"center", padding:"4px",marginTop:"20px"}}>
        <Card.Body>
          <Card.Title>Post ID: {post.id}</Card.Title>
          <Card.Subtitle>Title:</Card.Subtitle>
          <Card.Text>{post.title}</Card.Text>
          <Card.Subtitle>Body:</Card.Subtitle>
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>
       <Link to="/">
       <Button variant="primary">Close</Button>
       </Link>
      </Card>
  
  </center>
  );
}

export default PostDetails;
