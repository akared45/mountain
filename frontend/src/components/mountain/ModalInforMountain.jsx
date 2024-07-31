import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapComponent from './map';
const ModalShowInfotMountain = ({ show, handleClose,dataInfor }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MapComponent dataInfor={dataInfor}></MapComponent>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalShowInfotMountain;