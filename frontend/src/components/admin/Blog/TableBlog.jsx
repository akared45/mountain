import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { deletePost, InforUser, listCategory, listPosts } from '../../../services/api';
import ModalAddPost from './ModalAddPost';
import ModalEditPost from './ModalUpdatePost';
import ModalConfirmPost from './ModalConfirmPost';
import { toast } from 'react-toastify';
import './TableBlog.css';
const TableBlog = () => {
    const [ListBlog, setListBlog] = useState([]);
    const [ListCategory, setListCategory] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false); 
    const [editPostData, setEditPostData] = useState(null);
    const [postIdToDelete, setPostIdToDelete] = useState(null); 
    const [Id, setId] = useState('');
    const token =localStorage.getItem('token');
    console.log(token)
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const handleCloseEdit = () => {
        setShowEdit(false);
        setEditPostData(null);
    };
    const handleShowEdit = (post) => {
        setEditPostData(post);
        setShowEdit(true);
    };
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {
        setPostIdToDelete(id);
        setShowDelete(true);
    };

    useEffect(() => {
        fetchCategories();
        fetchBlog();
        if (token) {
            const fetchUserInfo = async () => {
              try {
                const response = await InforUser(token);
                setId(response.data.id);
                
              } catch (error) {
                console.error('Failed to fetch user info:', error);
              }
            };
            fetchUserInfo();
          }
    }, []);

    const fetchBlog = async () => {
        const res = await listPosts();
        setListBlog(res.data.blog);
    };

    const fetchCategories = async () => {
        try {
            const response = await listCategory();
            setListCategory(response.data.category);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePost(id);
            toast.success("Post deleted successfully");
            setListBlog(prevPosts => prevPosts.filter(post => post.posts_id !== id));
        } catch (error) {
            toast.error('Failed to delete post.');
        }
        handleCloseDelete(); 
    };
    return (
        <Container className="admin-blog-page">
            <Row className="my-4">
                <Col>
                    <h1>Manage Blog Posts</h1>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={handleShowAdd}>
                        Add New Post
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover className="blog-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ListBlog.map((post, index) => (
                                <tr key={post.posts_id}>
                                    <td>{index + 1}</td>
                                    <td>{post.title}</td>
                                    <td>{post.category}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:8000/storage/images/${post.img}`}
                                            alt=""
                                            className="post-image"
                                        />
                                        {post.username}
                                    </td>
                                    <td>{new Date(post.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleShowEdit(post)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleShowDelete(post.posts_id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <ModalAddPost
                            show={showAdd}
                            handleClose={handleCloseAdd}
                            ListCategory={ListCategory}
                            Id={Id}
                            setListBlog={setListBlog}
                        />
                        {editPostData && (
                            <ModalEditPost
                                show={showEdit}
                                handleClose={handleCloseEdit}
                                editPostData={editPostData}
                                ListCategory={ListCategory}
                                setListBlog={setListBlog}
                            />
                        )}
                        <ModalConfirmPost
                            show={showDelete}
                            handleClose={handleCloseDelete}
                            handleDelete={handleDelete}
                            postId={postIdToDelete}
                        />
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default TableBlog;
