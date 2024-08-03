// src/components/PostForm.js
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../style/PostForm.css';

const PostForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    postAbout: '',
    title: '',
    mainPost: '',
    otherInfo: '',
    file: null,
    options: [],
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        options: checked
          ? [...prevData.options, value]
          : prevData.options.filter((option) => option !== value),
      }));
    } else if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        file: e.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý việc gửi form tại đây, ví dụ gửi dữ liệu tới server
    console.log(formData);
    onClose();
  };


  return (
    <>
      <Modal show={true} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>PostForm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="post-form">

            <label>
              What's your post about?
              <input
                type="text"
                name="postAbout"
                value={formData.postAbout}
                onChange={handleChange}
              />
            </label>
            <label>
              Title *
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Main Post *
              <textarea
                name="mainPost"
                value={formData.mainPost}
                onChange={handleChange}
                required
              ></textarea>
            </label>
            <label>
              Other information
              <textarea
                name="otherInfo"
                value={formData.otherInfo}
                onChange={handleChange}
              ></textarea>
            </label>
            <label>
              File Upload
              <input
                type="file"
                name="file"
                onChange={handleChange}
              />
            </label>
            <label>
              If applicable, list any topics your post includes
              <div>
                <input
                  type="checkbox"
                  name="options"
                  value="option1"
                  onChange={handleChange}
                />{' '}
                Topic option 1
                <input
                  type="checkbox"
                  name="options"
                  value="option2"
                  onChange={handleChange}
                />{' '}
                Topic option 2
                <input
                  type="checkbox"
                  name="options"
                  value="option3"
                  onChange={handleChange}
                />{' '}
                Topic option 3
                <input
                  type="checkbox"
                  name="options"
                  value="option4"
                  onChange={handleChange}
                />{' '}
                Topic option 4
              </div>
            </label>
            <label>
              Notes
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </label>
            <button type="submit">Apply</button>
          </form>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default PostForm;
