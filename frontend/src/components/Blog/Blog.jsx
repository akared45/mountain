import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Card, Button, Tabs, Tab } from "react-bootstrap";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { listCategory, listPosts } from "../../services/api";

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

  return (
    <Container className="py-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Tabs
            id="controlled-tab-example"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
            variant="pills"
          >
            {categories.map((category) => (
              <Tab key={category} eventKey={category} title={category}>
                {posts.filter(post => post.category === category).map(post => (
                  <Card key={post.id} className="mb-4 shadow-sm">
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {new Date(post.created_at).toLocaleDateString()}
                      </Card.Subtitle>
                      <Card.Text>{post.content}</Card.Text>
                    </Card.Body>
                    <div className="text-end m-2">
                      <Button variant="outline-primary">Read More</Button>
                    </div>
                  </Card>
                ))}
              </Tab>
            ))}
          </Tabs>
          <div className="d-flex justify-content-between mt-4">
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={faChevronLeft} /> Previous Page
            </Button>
            <Button variant="outline-secondary">
              Next Page <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Blog;
