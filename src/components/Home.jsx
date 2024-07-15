import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "./style.css";
import Header from './Header';

const Home = ({ posts }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    const currentUserPhone = localStorage.getItem('currentUserPhone');
    const currentUserId = localStorage.getItem('currentUserId');
    
    if (currentUserEmail && currentUserPhone) {
      setIsLoggedIn(true);
      filterPosts(currentUserId);
    } else {
      setIsLoggedIn(false);
    }
  }, [posts]);

  const filterPosts = (userId) => {
    const userPosts = posts.filter(post => post.userId === parseInt(userId));
    setUserPosts(userPosts);
  };

  return (
    <>
      <Header />
      {isLoggedIn ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Id</th>
              <th style={{ textAlign: "center" }}>Title</th>
              <th style={{ textAlign: "center" }}>View Details</th>
            </tr>
          </thead>
          <tbody>
            {
            userPosts.map((post) => (
              <tr key={post.id}>
                <td style={{ textAlign: "center" }}>{post.id}</td>
                <td style={{ textAlign: "center" }}>
                  <Link to={`/postdetails/${post.id}`} className='link'>
                    {post.title}
                  </Link>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Link to={`/EachComment/${post.id}`}>
                    <Button variant="primary" style={{ padding: '4px', borderRadius: '5px' }}>
                      Comments
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h1 style={{textAlign:"center", marginTop:"150px"}}>Please Login to view details</h1>
      )}
    </>
  );
};

export default Home;
