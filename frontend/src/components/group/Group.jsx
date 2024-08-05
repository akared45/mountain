import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel, Form, Button, ListGroup as BsListGroup, Image } from 'react-bootstrap';
import { GroupComment, InforUser, ListGroups, UserComment } from '../../services/api';
import {toast} from 'react-toastify';
import ReactStars from 'react-stars';
import './Group.css';

const Group = () => {
    const [groups, setGroups] = useState([]);
    const [comments, setComments] = useState([]);
    const [activeGroupId, setActiveGroupId] = useState(null);
    const [rating,setRating]=useState(0);
    const [comment,setComment]=useState("");
    const [isCommentFocused, setIsCommentFocused] = useState(false);
    const [userId, setUserId] = useState("");
    useEffect(() => {
        fetchGroups();
    }, []);
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            const fetchUserInfo = async () => {
                try {
                    const response = await InforUser(token);
                    setUserId(response.data.id);
                } catch (error) {
                    console.error('Failed to fetch user info:', error);
                }
            };
            fetchUserInfo();
        }
    }, [token]);

    const fetchGroups = async () => {
        const res = await ListGroups();
        setGroups(res.data.groups);
        if (res.data.groups.length > 0) {
            setActiveGroupId(res.data.groups[0].id);
        }
    };

    useEffect(() => {
        if (activeGroupId) {
            const fetchComments = async () => {
                try {
                    const res = await GroupComment(activeGroupId);
                    setComments(res.data.comments);
                } catch (error) {
                    console.error('Failed to fetch comments:', error);
                }
            };
            fetchComments();
        }
    }, [activeGroupId]);

    const handleFeedbackChange = (e) => {
        setComment(e.target.value);
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        const res= await UserComment(userId,activeGroupId,comment,rating);
        toast.success("add comment success")
    };
    const handleSelect = (selectedIndex, e) => {
        const selectedGroup = groups[selectedIndex];
        if (selectedGroup && selectedGroup.id) {
          setActiveGroupId(selectedGroup.id);
        }
      };
    
    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Group Carousel</h1>
            <Carousel
                controls={!isCommentFocused}
                indicators={!isCommentFocused}
                interval={isCommentFocused ? null : 3000}
                onSelect={handleSelect}
                className="carousel-custom"
            >
                {groups.map((item) => (
                    <Carousel.Item key={item.id} className="carousel-item-custom">
                        <Row className="align-items-center">
                            <Col md={6} className="text-center">
                                <div className="group-info">
                                    <h3 className="group-title">{item.name}</h3>
                                    <p className="group-description">{item.description}</p>
                                    <p className="group-description">{item.leader_name}</p>
                                    <ReactStars
                                        count={5}
                                        value={item.average_rating}
                                        edit={false}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="group-image-container">
                                <Image
                                    className="group-image"
                                    src={`http://localhost:8000/storage/images/${item.image}`}
                                    alt="Group"
                                    fluid
                                />
                            </Col>
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
            {activeGroupId && (
                <>
                    <Row className="mt-4">
                        <Col>
                            <h4 className="comments-title">Comments for Selected Group</h4>
                            <BsListGroup>
                                {comments.map((comment, index) => (
                                    <BsListGroup.Item key={index} className="comment-item">
                                        <Row key={index} className="mb-3 align-items-start">
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
                                            </Col>
                                        </Row>
                                    </BsListGroup.Item>
                                ))}
                            </BsListGroup>
                        </Col>
                        <Col>
                            <h4 className="feedback-title">Your Feedback</h4>
                            <Form onSubmit={handleSubmitFeedback}>
                                <Form.Group>
                                    <Form.Label>Your Comment:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={comment}
                                        onChange={handleFeedbackChange}
                                        onFocus={() => setIsCommentFocused(true)}
                                        onBlur={() => setIsCommentFocused(false)}
                                    />
                                </Form.Group>
                                <Form.Group className="mt-2">
                                    <Form.Label>Your Rating:</Form.Label>
                                    <ReactStars
                                        count={5}
                                        value={rating}
                                        onChange={handleRatingChange}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </Form.Group>
                                <Button type="submit" variant="primary" className="mt-2 feedback-submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default Group;
