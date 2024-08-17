import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import './Story.css'; 
import { showStory, createStory } from '../../services/api';
import ModalStoryPost from './ModalStoryPost'; 

const Story = () => {
  const [listStory, setListStory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getListStory();
  }, []);

  const getListStory = async () => {
    let res = await showStory();
    if (res && res.data) {
      setListStory(res.data);
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="mb-4 text-primary">Câu Chuyện Thành Công</h1>
          <p className="lead">Chia sẻ hành trình thành công của bạn và truyền cảm hứng cho người khác.</p>
        </Col>
      </Row>

      {/* Input Trigger */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm border-0 rounded p-3">
            <Form.Control
              type="text"
              placeholder="Bạn muốn chia sẻ?"
              onClick={() => setShowModal(true)}
              readOnly
              className="cursor-pointer"
            />
          </Card>
        </Col>
      </Row>

      {/* Modal for New Story */}
      <ModalStoryPost
        show={showModal}
        handleClose={() => setShowModal(false)}
        listStory={listStory}
        setListStory={setListStory}
      />

      {/* Display Stories */}
      <Row>
        {listStory.map(story => (
          <Col key={story.id} md={6} className="mb-4">
            <Card className="shadow-sm border-0 rounded">
              {story.image && (
                <Card.Img className="card-img" variant="top" src={`http://localhost:8000/storage/${story.image}`} alt={story.title} />
              )}
              <Card.Body>
                <Card.Title className="text-primary">{story.title}</Card.Title>
                <Card.Text>{story.content}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                <small>Ngày đăng: {new Date(story.created_at).toLocaleDateString()}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Story;
