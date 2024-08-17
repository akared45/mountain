import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Image } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { listPosts } from "../../services/api";
import '../../style/BlogDetail.css'

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      let res = await listPosts();
      if (res && res.data) {
        const selectedPost = res.data.blog.find((post) => post.posts_id === parseInt(id));
        setPost(selectedPost);
        if (selectedPost) {
          const related = res.data.blog.filter(p => p.category === selectedPost.category && p.posts_id !== selectedPost.posts_id);
          setRelatedPosts(related);
        }
      }
    };
    fetchPost();
  }, [id]);

  const navigateBack = () => {
    navigate(-1);
  };
console.log(relatedPosts)
  if (!post) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={9}>
          <Button variant="outline-primary" onClick={navigateBack} className="mb-4">
            Back to Blog
          </Button>
          <Card className="shadow-lg blog-card animate__animated animate__fadeIn">
            <Card.Body>
              <Card.Title className="text-primary">{post.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted d-flex align-items-center">
                {new Date(post.created_at).toLocaleDateString()} by 
                <Image
                  src={`http://localhost:8000/storage/images/${post.img}`}
                  alt={post.username}
                  fluid
                  className="author-img shadow-lg"
                /> {post.username}
              </Card.Subtitle>
              <Card.Text>{post.content}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-lg related-posts-card">
            <Card.Body>
              <Card.Title className="text-primary">Related Posts</Card.Title>
              <ul className="list-unstyled">
                {relatedPosts.map(relatedPost => (
                  <li key={relatedPost.posts_id} className="mb-3">
                    <Link to={`/blog/${relatedPost.posts_id}`} className="related-post-link">
                      <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                          <Card.Title>{relatedPost.title}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetail;
