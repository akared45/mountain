import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel, Form, Button, ListGroup as BsListGroup } from 'react-bootstrap';
import { CommentGroup, ListGroup } from '../../services/api';
import ReactStars from 'react-stars';
import '../../style/Group.css'
const Group = () => {
    const [listGroup, setListGroup] = useState([]);
    // const [comments, setComments] = useState([]);
    // const [starRating, setstarRating] = useState(0);
    useEffect(() => {
        fetchGroup();
    }, [])

    const fetchGroup = async () => {
        const res = await ListGroup();
        setListGroup(res.data.Group);
    }
    return (
        <Container>
            <Carousel>
                {
                    listGroup.map((item) => (
                        <Carousel.Item key={item.id}>
                            <Row>
                                <Col>
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                    {/* <ReactStars
                                        count={5}
                                        value={starRating}
                                        edit={false}
                                        size={24}
                                        activeColor="#ffd700"
                                    /> */}
                                </Col>
                                <Col>
                                    <img
                                        className="d-block w-100"
                                        src="https://via.placeholder.com/800x400"
                                        alt="Nhóm"
                                    />
                                </Col>
                            </Row>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
            <Row>
                <Col>
                    <h2>Bình Luận</h2>
                    <BsListGroup>
                        {listGroup.map((comment) => (
                            <BsListGroup.Item key={comment.id} >
                                <h5>{comment.commenter_name}</h5>
                                <p className='group-item'>{comment.content}</p>
                                {comment.rating !== null && (
                                    <ReactStars
                                    count={5}
                                    value={comment.rating}
                                    edit={false}
                                    size={24}
                                    activeColor="#ffd700"
                                    emptyIcon={<i className="fa fa-star half-star" />}
                                    filledIcon={<i className="fa fa-star full-star" />}
                                  />
                                )}
                            </BsListGroup.Item>
                        ))}
                    </BsListGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Góp Ý Của Bạn</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nhận xét của bạn:</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Button variant="primary" className='my-3'>
                            Gửi
                        </Button>
                    </Form>
                </Col>
            </Row>

        </Container>
    );
};

export default Group;