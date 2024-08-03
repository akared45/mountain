import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalChangeRole = ({ show, handleClose, users, fetchUsers }) => {
    return (
        <Modal show={true} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Change Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <select>
                    <option value="">Select a role</option>
                    {users.map((user, index) => (
                        <option key={index} value={user.role}>
                            {user.role}
                        </option>
                    ))}
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" >
                    Close
                </Button>
                <Button variant="primary" >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalChangeRole;
