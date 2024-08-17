import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { showMountain } from "../../services/api";
import MapComponent from './map';
import './MountainDetails.css'; 
    
const MountainDetails = () => {
    const { id } = useParams();
    const [mountain, setMountain] = useState(null);

    useEffect(() => {
        const fetchMountain = async () => {
            let res = await showMountain();
            if (res && res.data) {
                const selectedMountain = res.data.ListMountain.find((mount) => mount.id === parseInt(id));
                setMountain(selectedMountain);
            }
        };
        fetchMountain();
    }, [id]);

    if (!mountain) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
                <Spinner animation="grow" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <Container className="mt-5">
            <Card className="shadow-lg rounded border-0">
                <Card.Header className="text-center bg-primary text-white rounded-top">
                    <h1 className="display-4">{mountain.name}</h1>
                </Card.Header>
                <Card.Body>
                    <Row className="mt-4">
                        <Col md={6} className="d-flex align-items-center justify-content-center">
                            <Image
                                src={`http://localhost:8000/storage/images/${mountain.img}`}
                                alt={mountain.name}
                                fluid
                                rounded
                                className="shadow-lg"
                                style={{ maxHeight: '400px', objectFit: 'cover', border: '1px solid #ddd' }}
                            />
                        </Col>
                        <Col md={6}>
                            <Card className="border-0">
                                <Card.Body>
                                    <Card.Title className="text-primary mb-3">Description</Card.Title>
                                    <Card.Text className="text-muted">{mountain.description}</Card.Text>
                                    <Card.Title className="text-primary mt-4">Coordinates</Card.Title>
                                    <Card.Text className="text-muted">{mountain.latitude}, {mountain.longitude}</Card.Text>
                                    <Card.Title className="text-primary mt-4">Altitude</Card.Title>
                                    <Card.Text className="text-muted">{mountain.altitude} meters</Card.Text>
                                    <Card.Title className="text-primary mt-4">Country</Card.Title>
                                    <Card.Text className="text-muted">{mountain.country} meters</Card.Text>
                                    <Card.Title className="text-primary mt-4">Region</Card.Title>
                                    <Card.Text className="text-muted">{mountain.region}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <MapComponent dataInfor={mountain} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MountainDetails;
