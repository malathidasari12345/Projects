import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Home = () => { 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      // console.log(response)
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
        
  const images = [
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/53184/peacock-bird-plumage-color-53184.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4482677/pexels-photo-4482677.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4482677/pexels-photo-4482677.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1122639/pexels-photo-1122639.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];
 




  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', marginLeft: '50px' }}>
       
      {
      users.map((user, index) => (
        <Card key={user.id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={images[index]} height={180} width={100} />
          <Card.Body>
            <center>
            <Card.Title>{user.name}</Card.Title>
            </center>
            <Card.Text><b>UserName:</b>{user.username}</Card.Text>
            <Card.Text><b>Email:</b>{user.email}</Card.Text>
          </Card.Body>
        </Card>
      ))
    }
    </div>
  );
};

export default Home;
