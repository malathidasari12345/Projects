import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';


const EachComment = () => {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        name: '',
        body: ''
    });

    useEffect(() => {
            fetchData();
    }, [postId]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            // console.log(response)
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e) => {
        // console.log(e.target.value)
        const { name, value } = e.target;
        setNewComment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleAddComment = () => {
        const maxId = comments.length > 0 ? Math.max(...comments.map(comment => comment.id)) : 0;
        const commentToAdd = {
            ...newComment,
            id: maxId + 1
        };
        setComments([...comments, commentToAdd]);
        setNewComment({
            name: '',
            body: ''
        });
    };

    return (
        <div>
            <h2 style={{ color: "blue", textAlign: "center" }}>Comments of {postId} </h2>
            {comments.length === 0 ?
             (
                <p style={{ textAlign: "center" }}>No comments</p>
             ) 
             :
             (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{textAlign:"center"}}>Id</th>
                            <th style={{textAlign:"center"}}>Name</th>
                            <th style={{textAlign:"center"}}>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => (
                            <tr key={comment.id}>
                                <td style={{textAlign:"center"}}>{comment.id}</td>
                                <td style={{textAlign:"center"}}>{comment.name}</td>
                                <td style={{textAlign:"center"}}>{comment.body}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <center>
            <div style={{ textAlign: "center", width:"300px" }}>
                <h2>Add Comment:</h2>
                <Form>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="name"
                            value={newComment.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                        />
                    </Form.Group>
                    <Form.Group  style={{ marginTop: "10px" }}>
                        <Form.Control
                               type="text"
                            name="body"
                            value={newComment.body}
                            onChange={handleInputChange}
                            placeholder="Enter your comment"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={handleAddComment}
                        style={{ marginTop: "10px" }}
                    > Add Comment
                    </Button>
                </Form>
            </div>
      </center>
        </div>
    );
}

export default EachComment;
