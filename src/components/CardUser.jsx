import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CardUser = () => {
  const users = JSON.parse(localStorage.getItem('users'));
  const currentUserEmail = localStorage.getItem('currentUserEmail');
  const currentUser = users ? users.find(user => user.email === currentUserEmail) : null;

  return (
 <>
    <h1 style={{textAlign:"center", color:"blue",}}>UserDetails</h1>
   {
    currentUser && (
        <Card style={{ width: '18rem', margin: '20px auto',padding:"4px" }}>
          <Card.Body>
            <h3 style={{textAlign:"center"}}>{currentUser.name}</h3>
            <p><b>Email:</b>{currentUser.email}</p>
            <Card.Text>
              <p><b>Username:</b> {currentUser.username}</p>
              <p><b>Contact:</b> {currentUser.phone}</p>
            </Card.Text>
            <Link to="/">
            <Button variant="primary">Back to Home</Button>
            </Link>
          </Card.Body>
        </Card>
      ) 
   }
</>
   
  );


};

export default CardUser;
