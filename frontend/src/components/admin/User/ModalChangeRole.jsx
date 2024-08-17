import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { changeRole, role } from '../../../services/api';
const ModalChangeRole = ({ show, handleClose, user , setUsers}) => {
    const [newRole, setNewRole] = useState(user.role);
    const [listRole, setListRole] = useState([]);

    useEffect(() => {
        showrole()
    }, [])
    const showrole = async () => {
        const res = await role()
        setListRole(res.data.role)
    }
    const handleSaveChanges = async () => {
        try {
            await changeRole(user.id, newRole);
            setUsers((prevUsers) =>
                prevUsers.map((users) =>
                    users.Id === user.Id ? { ...user, role: newRole } : user
                )
            );
            handleClose();
        } catch (error) {
            console.error('Error changing role:', error);
        }
    }
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Change Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formRole">
                        <Form.Label>Select a role</Form.Label>
                        <Form.Control
                            as="select"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            required
                        >
                            <option value="">Select a role</option>
                            {listRole.map((roleItem) => (
                                <option key={roleItem} value={roleItem}>
                                    {roleItem}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalChangeRole;
