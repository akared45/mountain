import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GroupComment, InforUser, ListGroups, UserComment } from '../../services/api';
import { toast } from 'react-toastify';
import GroupCarousel from './GroupCarousel';
import CommentsSection from './CommentsSection';
import FeedbackForm from './FeedbackForm';
import './Group.css';

const Group = () => {
    const [groups, setGroups] = useState([]);
    const [comments, setComments] = useState([]);
    const [activeGroupId, setActiveGroupId] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
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
                    const userComment = res.data.comments.find(comment => comment.commenter_id === userId);
                    if (userComment) {
                        setFeedbackSubmitted(true);
                    }
                } catch (error) {
                    console.error('Failed to fetch comments:', error);
                }
            };
            fetchComments();
        }
    }, [activeGroupId, userId]);

    const handleFeedbackChange = (e) => {
        setComment(e.target.value);
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        try {
            await UserComment(userId, activeGroupId, comment, rating);
            toast.success("Comment success");
            const updatedCommentsRes = await GroupComment(activeGroupId);
            setComments(updatedCommentsRes.data.comments);
            const updatedGroupRes = await ListGroups();
            setGroups(updatedGroupRes.data.groups);
            if (updatedGroupRes.data.groups.length > 0) {
                const updatedGroup = updatedGroupRes.data.groups.find(group => group.id === activeGroupId);
                if (updatedGroup) {
                    setActiveGroupId(updatedGroup.id);
                }
            }
            setComment("");
            setRating(0);
            setFeedbackSubmitted(true);

        } catch (error) {
            console.error("Failed to add comment:", error);
            toast.error("Failed to add comment");
        }
    };
    const handleSelect = (selectedIndex) => {
        const selectedGroup = groups[selectedIndex];
        if (selectedGroup && selectedGroup.id) {
            setActiveGroupId(selectedGroup.id);
        }
    };

    return (
        <Container className="my-5">
            <GroupCarousel groups={groups} activeGroupId={activeGroupId} onSelect={handleSelect} />
            {activeGroupId && (
                <Row className="mt-4">
                    <Col md={feedbackSubmitted ? 12 : 6} className={`col-comments ${feedbackSubmitted ? 'full-width' : ''}`}>
                        <h4 className="comments-title">Comments for Selected Group</h4>
                        <CommentsSection 
                            comments={comments} 
                            userId={userId} 
                            activeGroupId={activeGroupId} 
                            setComment={setComments} 
                            setGroups={setGroups}
                            setFeedbackSubmitted={setFeedbackSubmitted}    
                        />
                    </Col>
                    {!feedbackSubmitted && (
                        <Col md={feedbackSubmitted ? 0 : 6} className={`col-feedback ${feedbackSubmitted ? 'hidden' : ''}`}>
                            <h4 className={`feedback-title ${feedbackSubmitted ? 'hidden' : ''}`}>Your Comment</h4>
                            <FeedbackForm
                                comment={comment}
                                rating={rating}
                                onFeedbackChange={handleFeedbackChange}
                                onRatingChange={handleRatingChange}
                                onSubmit={handleSubmitFeedback}
                                onFocus={() => setIsCommentFocused(true)}
                                onBlur={() => setIsCommentFocused(false)}
                                feedbackSubmitted={feedbackSubmitted}
                            />
                        </Col>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default Group;
