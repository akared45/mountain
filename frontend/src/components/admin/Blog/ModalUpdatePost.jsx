import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { updatePost } from '../../../services/api';
import { toast } from 'react-toastify';

const ModalEditPost = ({ show, handleClose, editPostData, ListCategory, setListBlog }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [img, setImg] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (editPostData) {
            setTitle(editPostData.title || '');
            setContent(editPostData.content || '');
            setCategory(editPostData.category || '');
            setImg(editPostData.img || '');
            setUsername(editPostData.username || '');
        }
    }, [editPostData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updatePost(editPostData.posts_id, title, content, category);
            toast.success("Post updated successfully");
            const updatedPost = res.data.UpdatePost;
            setListBlog(prevPosts =>
                prevPosts.map(post =>
                    post.posts_id === editPostData.posts_id ? updatedPost : post
                )
            );
            setTitle('');
            setContent('');
            setCategory('');
            handleClose();
        } catch (error) {
            console.error('Failed to update post:', error);
            toast.error('Failed to update post.');
        }
    };
    
    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="postTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter post title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="postContent" className="mt-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="postCategory" className="mt-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select category</option>
                            {ListCategory.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Author</Form.Label>
                        <div className="post-image-container">
                            {img && (
                                <img
                                    src={`http://localhost:8000/storage/images/${img}`}
                                    alt="Post"
                                    className="post-image"
                                />
                            )}
                            {username || 'Unknown'}
                        </div>
                    </Form.Group>

                    <Modal.Footer className="mt-4">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalEditPost;
