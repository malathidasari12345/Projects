import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalPage = ({ addPost }) => {
  const [postContent, setPostContent] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    addPost(postContent); 
    navigate('/');
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog>
          <Modal.Title style={{ textAlign: 'center' }}>New Post</Modal.Title>
        <Modal.Body>
          <form>
            <input
              style={{ textAlign: 'center', width: '100%', padding: '5px' }}
              type="text"
              placeholder="Title"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <br/>  <br/>
            <textarea
              style={{ textAlign: 'center', width: '100%', padding: '5px' }}
              rows="3"
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default ModalPage;
