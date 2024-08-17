import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Card, Button, Tabs, Tab } from "react-bootstrap";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { listCategory, listPosts } from "../../services/api";
import "../../style/Blog.css";
import { Link } from "react-router-dom";

const Blog = () => {
  const [activeTab, setActiveTab] = useState("History");
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await listCategory();
        setCategories(response.data.category);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await listPosts();
        setPosts(response.data.blog);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [activeTab]);
  console.log(posts)
  return (
    <Container className="py-5 ">
      <Row className="mb-4">
        <Col className="text-center ">
          <div className="blogtitle">
            <h1 className="mb-4 text-primary">Blog</h1>
            <p className="lead">Explore our latest articles and insights on various topics.</p>
          </div>
        </Col>
      </Row>

      <Row className="blog">
        <Col md={12} className="mx-auto">
          <Tabs
            id="controlled-tab-example"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
            variant="pills"
          >
            {categories.map((category) => (
              <Tab key={category} eventKey={category} title={category} className="animate__animated animate__fadeIn">
                <Row>
                  {posts.filter(post => post.category === category).map(post => (
                    <Col key={post.id} md={6} className="mb-4">
                      <Card className="shadow-sm border-0 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                        <Card.Body>
                          <Card.Title className="text-primary">{post.title}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <img src={`http://localhost:8000/storage/images/${post.img}`} alt="" className="profile-img" />
                              <p className="mb-0">{post.username}</p>
                            </div>
                            <p className="mb-0">{new Date(post.created_at).toLocaleDateString()}</p>
                          </Card.Subtitle>
                          <Card.Text>{post.content.substring(0, 150)}...</Card.Text>
                        </Card.Body>
                        <div className="text-end m-2">
                          <button className="btn btn-primary">
                            <Link to={`/blog/${post.posts_id}`} className="text-white">Read more</Link >
                          </button>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab>
            ))}
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Blog;
