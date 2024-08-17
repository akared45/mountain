import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createStory, InforUser, showMountain, showStory } from '../../services/api';
import Select from 'react-select';

const ModalStoryPost = ({ show, handleClose, listStory, setListStory }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [selectedMountain, setSelectedMountain] = useState(null);
    const [listMountain, setListMountain] = useState([]);
    const [userId,setUserID]=useState(null);
    useEffect(() => {
        fetchMountains();
    }, []);
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (token) {
        const fetchUserInfo = async () => {
          try {
            const response = await InforUser(token);
            setUserID(response.data.id);
          } catch (error) {
            console.error('Failed to fetch user info:', error);
            toast.error('Failed to fetch user info.');
          }
        };
        fetchUserInfo();
      }
    }, [token]);
    const fetchMountains = async () => {
        try {
            const res = await showMountain();
            const mountains = res.data.ListMountain.map(mountain => ({
                value: mountain.id,
                label: mountain.name
            }));
            setListMountain(mountains);
        } catch (error) {
            toast.error("Không thể tải danh sách núi.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                toast.error("Định dạng hình ảnh không hợp lệ.");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Kích thước hình ảnh vượt quá 5MB.");
                return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImage(null);
            setImagePreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await createStory(title, content, userId,selectedMountain.value, image);
            console.log(res);
            if (res) {
                handleClose();
                setTitle('');
                setContent('');
                setImage(null);
                setImagePreview('');
                setSelectedMountain(null);
                toast.success("Đăng câu chuyện thành công");
                const response = await showStory();
                setListStory(response.data);
            } else {
                toast.error("Có lỗi khi thêm câu chuyện.");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi thêm câu chuyện.");
            console.log(error)
        }
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chia sẻ câu chuyện của bạn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Control
                            type="text"
                            placeholder="Tiêu đề câu chuyện của bạn..."
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formContent">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Chia sẻ câu chuyện của bạn..."
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMountain">
                        <Form.Label>Chọn núi</Form.Label>
                        <Select
                            options={listMountain}
                            value={selectedMountain}
                            onChange={setSelectedMountain}
                            placeholder="Chọn núi..."
                            isClearable
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formImage">
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Image preview"
                                className="img-fluid mt-2"
                                style={{ maxHeight: '200px' }}
                            />
                        )}
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Đăng câu chuyện
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalStoryPost;
