import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { updateMountain,showMountain } from '../../../services/api';
import { toast } from 'react-toastify';
const ModalUpdate = ({ show, handleClose, dataMountain , setListMountain}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [altitude, setAltitude] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const handleEdit = async () => {
        let res = await updateMountain(dataMountain.id,name,description,latitude,longitude,altitude,country,region,image);
        console.log(res.data.ListMountain);
        if(res){
            handleClose();
            toast.success("Edit Mountain succsess");
            updateMountainList();
        }
    }
    const updateMountainList = async () => {
        let res = await showMountain();
        if (res) {
            setListMountain(res.data.ListMountain);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file)); 
        }
    };
    useEffect(() => {
        if (show) {
            setName(dataMountain.name);
            setDescription(dataMountain.description);
            setLatitude(dataMountain.latitude);
            setLongitude(dataMountain.longitude);
            setAltitude(dataMountain.altitude);
            setCountry(dataMountain.country);
            setRegion(dataMountain.region);
            setImagePreview(`http://localhost:8000/storage/images/${dataMountain.img}`);
        }
    }, [dataMountain])
    // console.log(dataMountain);
    
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Mountain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="mountainName">Mountain name</label>
                            <input type="text" className="form-control" id="mountainName" placeholder="Enter mountain name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" id="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="latitude">Latitude</label>
                            <input type="text" className="form-control" id="latitude" placeholder="Enter latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="longitude">Longitude</label>
                            <input type="text" className="form-control" id="longitude" placeholder="Enter longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="altitude">Altitude</label>
                            <input type="number" className="form-control" id="altitude" placeholder="Enter altitude" step="any" value={altitude} onChange={(e) => setAltitude(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" className="form-control" id="country" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="region">Region</label>
                            <input type="text" className="form-control" id="region" placeholder="Enter region" value={region} onChange={(e) => setRegion(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageFile">Upload Image</label>
                            <div className="form-group">
                                <input type="file" className="form-control" id="imageFile" onChange={handleImageChange} />
                                {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />}
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEdit()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdate;