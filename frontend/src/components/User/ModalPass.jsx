import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { changePass } from '../../services/api';
import { toast } from 'react-toastify';
const ModalPass = ({ show, handleClose, userInfoPassword ,userInfoId}) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }
        try {
            const response = await changePass(userInfoId, newPassword);
            if (response) {
                toast.success('Mật khẩu đã được thay đổi thành công.');
                handleClose(); 
            } else {
                toast.error('Có lỗi xảy ra khi thay đổi mật khẩu.');
            }
        } catch  {
            toast.error('Có lỗi xảy ra khi thay đổi mật khẩu.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Thay Đổi Mật Khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCurrentPassword">
                        <Form.Label>Mật Khẩu Hiện Tại</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={showCurrentPassword ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu hiện tại"
                                value={userInfoPassword}
                                required
                                readOnly
                            />
                            <span
                                className="input-group-text"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                style={{ cursor: 'pointer' }}
                            >
                                <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formNewPassword">
                        <Form.Label>Mật Khẩu Mới</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu mới"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <span
                                className="input-group-text"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                style={{ cursor: 'pointer' }}
                            >
                                <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Xác Nhận Mật Khẩu Mới</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Xác nhận mật khẩu mới"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span
                                className="input-group-text"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ cursor: 'pointer' }}
                            >
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu Thay Đổi
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalPass;
