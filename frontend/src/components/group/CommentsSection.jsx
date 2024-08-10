import React, { useState } from 'react';
import { ListGroup as BsListGroup, Row, Col, Image, Button, Modal, Form } from 'react-bootstrap';
import ReactStars from 'react-stars';
import { DeleteUserComment, ListGroups, UpdateUserComment } from '../../services/api';
import { toast } from 'react-toastify';

const CommentsSection = ({ comments, userId, setComment, setGroups, setFeedbackSubmitted }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editComment, setEditComment] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const handleEditModalOpen = (comment) => {
        setEditComment(comment);
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
    };

    const handleSaveChanges = async () => {
        try {
            await UpdateUserComment(editComment.comment_id, editComment.content, editComment.rating);
            toast.success("Edit success");
            const updatedGroups = await ListGroups(); 
            setComment(prevComments =>
                prevComments.map(comment =>
                    comment.comment_id === editComment.comment_id
                        ? { ...comment, content: editComment.content, rating: editComment.rating }
                        : comment
                )
            );
            setGroups(updatedGroups.data.groups);
            setShowEditModal(false);
        } catch (error) {
            console.error("Failed to update comment:", error);
            toast.error("Failed to update comment");
        }
    };

    const handleDelete = async () => {
        if (commentToDelete) {
            try {
                await DeleteUserComment(commentToDelete);
                toast.success("Comment deleted successfully");
                const updatedGroups = await ListGroups(); 
                setComment(prevComments => prevComments.filter(comment => comment.comment_id !== commentToDelete));
                setGroups(updatedGroups.data.groups);
                setShowDeleteModal(false);
                setFeedbackSubmitted(false);
            } catch (error) {
                console.error("Failed to delete comment:", error);
                toast.error("Failed to delete comment");
            }
        }
    };

    const handleDeleteModalOpen = (commentId) => {
        setCommentToDelete(commentId);
        setShowDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
        setCommentToDelete(null);
    };

    return (
        <div className="comments-container" style={{ overflowY: 'scroll' }}>
            <BsListGroup>
                {comments.map((comment, index) => (
                    <BsListGroup.Item key={index} className="comment-item">
                        <Row className="mb-3 align-items-start">
                            <Col md={2} className="text-center">
                                <Image
                                    className="comment-avatar"
                                    src={`http://localhost:8000/storage/images/${comment.img}`}
                                    alt="User Avatar"
                                    roundedCircle
                                    fluid
                                />
                            </Col>
                            <Col md={10} className="comment-content">
                                <div className="comment-header">
                                    <h5>{comment.commenter_name}</h5>
                                    <p className="comment-date">{comment.created_at}</p>
                                </div>
                                {comment.rating !== null && (
                                    <ReactStars
                                        count={5}
                                        value={comment.rating}
                                        edit={false}
                                        size={24}
                                        activeColor="#ffd700"
                                        className="react-stars"
                                    />
                                )}
                                <p className="group-item">{comment.content}</p>

                                {comment.commenter_id === userId && (
                                    <div className="comment-actions">
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => handleEditModalOpen(comment)}
                                            className="me-2"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteModalOpen(comment.comment_id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </BsListGroup.Item>
                ))}
            </BsListGroup>

            {/* Edit Comment Modal */}
            <Modal show={showEditModal} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editCommentContent">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editComment.content || ''}
                                onChange={(e) => setEditComment({ ...editComment, content: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Rating</Form.Label>
                            <ReactStars
                                count={5}
                                value={editComment.rating}
                                onChange={(newRating) => setEditComment({ ...editComment, rating: newRating })}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this comment? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteModalClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CommentsSection;
