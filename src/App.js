import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import Home from './components/Home';
import Login from './components/Login';
import ModalPage from './components/Modal';
import PostDetails from './components/PostDetails';
import EachComment from './components/EachComment';
import CardUser from './components/CardUser';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const addPost = (postContent) => {
    const currentUserId = parseInt(localStorage.getItem('currentUserId'));
    const maxUserPostId = posts.reduce((maxId, post) => {
        if (post.userId === currentUserId && post.id > maxId) {
            return post.id;
        }
        return maxId;
    }, 0);
    const nextId = maxUserPostId ? maxUserPostId + 1 : currentUserId * 10 + 1; 
    const newPost = {
        id: nextId,
        title: postContent,
        userId: currentUserId
    };
    setPosts([...posts, newPost]);
};

 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/modal" element={<ModalPage addPost={addPost} />} />
        <Route path="/postdetails/:id" element={<PostDetails />} />
        <Route path="/eachcomment/:postId" element={<EachComment />} />
        <Route path="/card" element={<CardUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
