import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { addMountain, showMountain } from '../../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  mountainNameRegex,
  descriptionRegex,
  latitudeRegex,
  longitudeRegex,
  altitudeRegex,
  countryRegex,
  regionRegex
} from '../../../ultils/regex';
const ModalAddNew = ({ show, handleClose, setListMountain }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [altitude, setAltitude] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    latitude: '',
    longitude: '',
    altitude: '',
    country: '',
    region: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error("Định dạng hình ảnh không hợp lệ.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { 
        toast.error("Kích thước hình ảnh vượt quá 5MB.");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!mountainNameRegex.test(name)) {
      newErrors.name = "Tên núi không hợp lệ.";
    }
    if (!descriptionRegex.test(description)) {
      newErrors.description = "Mô tả phải có ít nhất 10 ký tự.";
    }
    if (!latitudeRegex.test(latitude)) {
      newErrors.latitude = "Vĩ độ không hợp lệ.";
    }
    if (!longitudeRegex.test(longitude)) {
      newErrors.longitude = "Kinh độ không hợp lệ.";
    }
    if (!altitudeRegex.test(altitude)) {
      newErrors.altitude = "Độ cao không hợp lệ.";
    }
    if (!countryRegex.test(country)) {
      newErrors.country = "Quốc gia không hợp lệ.";
    }
    if (!regionRegex.test(region)) {
      newErrors.region = "Khu vực không hợp lệ.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      let res = await addMountain(name, description, latitude, longitude, altitude, country, region, image);
      if (res) {
        handleClose();
        setName('');
        setDescription('');
        setLatitude('');
        setLongitude('');
        setAltitude('');
        setCountry('');
        setRegion('');
        setImage(null);
        setImagePreview('');
        toast.success("Thêm núi mới thành công");
        const response = await showMountain();
        setListMountain(response.data.ListMountain);
      } else {
        toast.error("Có lỗi khi thêm núi mới.");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi thêm núi.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm Núi Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="mountainName">Tên Núi</label>
              <input type="text" className="form-control" id="mountainName" placeholder="Nhập tên núi" value={name} onChange={(e) => setName(e.target.value)} required />
              {errors.name && <span className="text-danger">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="description">Mô Tả</label>
              <textarea className="form-control" id="description" placeholder="Nhập mô tả" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              {errors.description && <span className="text-danger">{errors.description}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="latitude">Vĩ Độ</label>
              <input type="text" className="form-control" id="latitude" placeholder="Nhập vĩ độ" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
              {errors.latitude && <span className="text-danger">{errors.latitude}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="longitude">Kinh Độ</label>
              <input type="text" className="form-control" id="longitude" placeholder="Nhập kinh độ" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
              {errors.longitude && <span className="text-danger">{errors.longitude}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="altitude">Độ Cao</label>
              <input type="number" className="form-control" id="altitude" placeholder="Nhập độ cao" step="any" value={altitude} onChange={(e) => setAltitude(e.target.value)} required />
              {errors.altitude && <span className="text-danger">{errors.altitude}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="country">Quốc Gia</label>
              <input type="text" className="form-control" id="country" placeholder="Nhập quốc gia" value={country} onChange={(e) => setCountry(e.target.value)} required />
              {errors.country && <span className="text-danger">{errors.country}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="region">Khu Vực</label>
              <input type="text" className="form-control" id="region" placeholder="Nhập khu vực" value={region} onChange={(e) => setRegion(e.target.value)} required />
              {errors.region && <span className="text-danger">{errors.region}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="imageFile">Tải Lên Hình Ảnh</label>
              <input
                type="file"
                className="form-control"
                id="imageFile"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Xem trước"
                  style={{ maxWidth: '100%', marginTop: '10px' }}
                />
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu Thay Đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;
