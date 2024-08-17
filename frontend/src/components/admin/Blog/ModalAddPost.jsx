import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AddPost, listPosts } from '../../../services/api';
import { toast } from 'react-toastify';

const ModalAddPost = ({ show, handleClose, ListCategory ,Id,setListBlog }) => {
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddPost(title, content, category, Id);
      toast.success("Add new post success");
      const fetchBlog = async () => {
        try {
          const res = await listPosts();
          setListBlog(res.data.blog);
        } catch (error) {
          console.error('Failed to fetch blog posts:', error);
          toast.error('Failed to fetch blog posts.');
        }
      };
      fetchBlog();
      handleClose();
      setTitle('');
      setContent('');
      setCategory('');
    } catch (error) {
      console.error('Failed to add post:', error);
      toast.error('Failed to add new post.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Add New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="postTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="postContent" className="mt-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="postCategory" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {ListCategory && ListCategory.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Modal.Footer className="mt-4">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddPost;
