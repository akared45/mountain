import React from 'react';
import { Carousel, Row, Col, Image } from 'react-bootstrap';
import ReactStars from 'react-stars';

const GroupCarousel = ({ groups, activeGroupId, onSelect }) => (
    <Carousel
        controls
        indicators
        interval={3000}
        onSelect={onSelect}
        className="carousel-custom"
    >
        {groups.map((item) => (
            <Carousel.Item key={item.id} className="carousel-item-custom">
                <Row className="align-items-center">
                    <Col md={6} className="text-center">
                        <div className="group-info">
                            <h3 className="group-title">{item.name}</h3>
                            <p className="group-description">{item.description}</p>
                            <p className="group-description">{item.leader_name}</p>
                            <ReactStars
                                count={5}
                                value={item.average_rating}
                                edit={false}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                    </Col>
                    <Col md={6} className="group-image-container">
                        <Image
                            className="group-image"
                            src={`http://localhost:8000/storage/images/${item.image}`}
                            alt="Group"
                            fluid
                        />
                    </Col>
                </Row>
            </Carousel.Item>
        ))}
    </Carousel>
);

export default GroupCarousel;
