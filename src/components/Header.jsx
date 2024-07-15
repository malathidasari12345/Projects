import React from 'react';
import { Navbar, Container, Button, NavbarBrand } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
 

  const handleAddPostClick = () => {
    const users = JSON.parse(localStorage.getItem('users'));
    const currentUser = users.find(user => user.email === localStorage.getItem('currentUserEmail'));

    if (currentUser) {
      navigate('/modal');
    } else {
      navigate('/login');
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('currentUserEmail');
    navigate('/');
  };

  const currentUserEmail = localStorage.getItem('currentUserEmail');

  return (
    <Navbar variant="dark" bg="dark" style={{ height: 60 }}>
      <Container>
        {/* title */}
        <Navbar.Brand>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            POST AND COMMENT
          </Link>
        </Navbar.Brand>
        {/* buttons */}
        <div style={{ display: 'flex', gap: '20px', marginRight: "50px" }}>
         
          {currentUserEmail ? (
            <>
             <Button onClick={handleAddPostClick}>Add Post</Button>
            <Button onClick={handleLogoutClick}>Logout</Button>
            <Link to="/card">
            <Button variant="primary">See User Details</Button>
            </Link>
            </>
          ) : (
            <>
              <Link to="/login">
              <Button>Login</Button>
            </Link>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
