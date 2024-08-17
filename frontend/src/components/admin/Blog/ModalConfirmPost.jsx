import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalConfirmPost = ({ show, handleClose, handleDelete, postId }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this post?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => handleDelete(postId)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalConfirmPost;
