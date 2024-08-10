import React from 'react';
import { Form, Button } from 'react-bootstrap';
import ReactStars from 'react-stars';


const FeedbackForm = ({ comment, rating, onFeedbackChange, onRatingChange, onSubmit, onFocus, onBlur, feedbackSubmitted }) => (
    <div>
        <Form 
            onSubmit={onSubmit} 
            className={`feedback-form ${feedbackSubmitted ? 'hidden' : ''}`}
        >
            <Form.Group>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={onFeedbackChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Your Rating:</Form.Label>
                <ReactStars
                    count={5}
                    value={rating}
                    onChange={onRatingChange}
                    size={24}
                    activeColor="#ffd700"
                />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2 feedback-submit">
                Submit
            </Button>
        </Form>
    </div>
);

export default FeedbackForm;
