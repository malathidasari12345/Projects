import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const[phone,setPhone] = useState('')
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(res.data);
      localStorage.setItem('users', JSON.stringify(res.data));
    } catch (error) {
      setError('Failed to fetch users.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === email && user.phone === phone);
    if (user) {
      localStorage.setItem('currentUserEmail', email);
      localStorage.setItem('currentUserPhone', phone);
      localStorage.setItem('currentUserId', user.id);
      console.log('Login successful',user.id);
      navigate('/');
    } else {
      setError('User not found.');
    }
  };
  

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ marginTop: '70px' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
              className="text-center"
              style={{ marginBottom: '10px' }}
            />
        {/* for phonenumber */}
          <Form.Control
              type="text"
              placeholder="Enter Phonenumber"
              value={phone}
              onChange={handlePhoneChange}
              className="text-center"
              style={{ marginBottom: '10px' }}
            />
           </Form.Group>
          {error && <Alert >{error}</Alert>}
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
