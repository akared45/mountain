// src/pages/Blog.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs, TabContainer, TabContent, TabPane, Nav, Container } from 'react-bootstrap';
import PostForm from './PostForm';
import '../../style/Blog.css';

const Blog = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <Container>
    <div className="blog-container">
      <h1>Welcome to the Blog</h1>
      
      <div className="tabs-container mt-3">
            <TabContainer defaultActiveKey="history">
              <div className="d-flex">
                <Nav variant="tabs" className="flex-column nav-tabs-custom">
                  <Nav.Item>
                    <Nav.Link eventKey="history" ><p className='Left'>History</p></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="types"><p className='Left'>Typed/Styles</p></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="techniques"><p className='Left'>Techniques</p></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="shelltering"><p className='Left'>Shelltering</p></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="hazards"><p className='Left'>Hazards</p></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="stories"><p className='Left'>Story</p></Nav.Link>
                  </Nav.Item>
                </Nav>
                <TabContent className="tab-content-custom">
                  <TabPane eventKey="history">
                    <p>Content for History tab.</p>
                  </TabPane>
                  <TabPane eventKey="types">
                    <p>Content for Typed/Styles tab.</p>
                  </TabPane>
                  <TabPane eventKey="techniques">
                    <p>Content for Techniques</p>
                  </TabPane>
                  <TabPane eventKey="shelltering">
                    <p>Content for Shelltering</p>
                  </TabPane>
                  <TabPane eventKey="hazards">
                    <p>Content for Hazards tab.</p>
                  </TabPane>
                  <TabPane eventKey="stories">
                    <button className="open-form-button" onClick={handleOpenForm}>
                      Đăng bài
                    </button>
                  </TabPane>
                </TabContent>
              </div>
            </TabContainer>
          </div>
      {isFormOpen && <PostForm onClose={handleCloseForm} />}
    </div>
    </Container>
  );
};

export default Blog;
