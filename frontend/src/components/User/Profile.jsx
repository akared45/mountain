import React, { useState, useEffect } from 'react';
import { updateProfile, InforUser } from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalPass from './ModalPass';
import { nameRegex, emailRegex, addressRegex } from '../../ultils/regex';

const Profile = () => {
  const [userInfoId, setUserInfoId] = useState("");
  const [userInfoPassword, setUserInfoPassword] = useState("");
  const [userInfoName, setUserInfoName] = useState("");
  const [userInfoEmail, setUserInfoEmail] = useState("");
  const [userInfoGender, setUserGender] = useState("");
  const [userInfoImg, setUserInfoImg] = useState(null);
  const [userInfoAddress, setUserInfoAddress] = useState("");
  const [userInfoDob, setUserInfoDob] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [ModalShowPass, setModalShowPass] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [originalUserInfo, setOriginalUserInfo] = useState({});
  const [errors, setErrors] = useState({
    userInfoName: '',
    userInfoEmail: '',
    userInfoAddress: '',
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserInfo = async () => {
        try {
          const response = await InforUser(token);
          const data = response.data;
          setUserInfoId(data.id);
          setUserInfoPassword(data.password_hash);
          setUserInfoEmail(data.email);
          setUserInfoName(data.full_name);
          setUserGender(data.gender);
          setUserInfoImg(data.img);
          setUserInfoAddress(data.address);
          setUserInfoDob(data.dob);
          setOriginalUserInfo({
            id: data.id,
            password_hash: data.password_hash,
            email: data.email,
            full_name: data.full_name,
            gender: data.gender,
            img: data.img,
            address: data.address,
            dob: data.dob,
          });
        } catch {
          toast.error('Failed to fetch user info.');
        }
      };
      fetchUserInfo();
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserInfoImg(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!nameRegex.test(userInfoName)) {
      newErrors.userInfoName = "Fullname contains invalid characters.";
    }

    if (!emailRegex.test(userInfoEmail)) {
      newErrors.userInfoEmail = "Email is not valid.";
    }

    if (!addressRegex.test(userInfoAddress)) {
      newErrors.userInfoAddress = "Address contains invalid characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleEditProfile = async () => {
    if (!validateInputs()) return;

    try {
      let res = await updateProfile(userInfoId, userInfoName, userInfoEmail, userInfoGender, userInfoImg, userInfoDob, userInfoAddress);
      toast.success("Edit success");
      setIsEditing(false);
      setOriginalUserInfo({
        id: userInfoId,
        password_hash: userInfoPassword,
        email: userInfoEmail,
        full_name: userInfoName,
        gender: userInfoGender,
        img: userInfoImg,
        address: userInfoAddress,
        dob: userInfoDob,
      });
    } catch {
      toast.error('Failed to update profile. Please check the console for details.');
    }
  };

  const handleCancelEdit = () => {
    setUserInfoId(originalUserInfo.id);
    setUserInfoPassword(originalUserInfo.password_hash);
    setUserInfoEmail(originalUserInfo.email);
    setUserInfoName(originalUserInfo.full_name);
    setUserGender(originalUserInfo.gender);
    setUserInfoImg(originalUserInfo.img);
    setUserInfoAddress(originalUserInfo.address);
    setUserInfoDob(originalUserInfo.dob);
    setPreviewImg(null);
    setIsEditing(false);
    setErrors({
      userInfoName: '',
      userInfoEmail: '',
      userInfoAddress: '',
    });
  };

  const handleClose = () => {
    setModalShowPass(false);
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src={previewImg ? previewImg : (userInfoImg ? `http://localhost:8000/storage/images/${userInfoImg}` : 'http://localhost:8000/storage/images/avtdefault.jpg')}
                  alt={userInfoName}
                  style={{ width: '100%' }}
                />
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control mt-2"
                  />
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="fullname">Fullname</label>
                      <input
                        type="text"
                        className={`form-control ${errors.userInfoName ? 'is-invalid' : ''}`}
                        id="fullname"
                        value={userInfoName}
                        onChange={(e) => setUserInfoName(e.target.value)}
                        readOnly={!isEditing}
                        required
                      />
                      {errors.userInfoName && <div className="invalid-feedback">{errors.userInfoName}</div>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className={`form-control ${errors.userInfoEmail ? 'is-invalid' : ''}`}
                        id="email"
                        value={userInfoEmail}
                        onChange={(e) => setUserInfoEmail(e.target.value)}
                        readOnly={!isEditing}
                        required
                      />
                      {errors.userInfoEmail && <div className="invalid-feedback">{errors.userInfoEmail}</div>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={userInfoGender === 'male'}
                            onChange={() => setUserGender('male')}
                            disabled={!isEditing}
                            required
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={userInfoGender === 'female'}
                            onChange={() => setUserGender('female')}
                            disabled={!isEditing}
                            required
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className={`form-control ${errors.userInfoAddress ? 'is-invalid' : ''}`}
                        id="address"
                        value={userInfoAddress}
                        onChange={(e) => setUserInfoAddress(e.target.value)}
                        readOnly={!isEditing}
                        required
                      />
                      {errors.userInfoAddress && <div className="invalid-feedback">{errors.userInfoAddress}</div>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dob"
                        value={userInfoDob}
                        onChange={(e) => setUserInfoDob(e.target.value)}
                        readOnly={!isEditing}
                      />
                    </div>
                  </form>
                  <div className="d-flex gap-2 mt-3">
                    {isEditing ? (
                      <>
                        <button type="button" className="btn btn-secondary" onClick={handleEditProfile}>
                          Save
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </button>
                    )}
                    <button type="button" className="btn btn-secondary" onClick={() => setModalShowPass(true)}>
                      Change Password
                    </button>
                    <ModalPass show={ModalShowPass} handleClose={handleClose} userInfoPassword={userInfoPassword} userInfoId={userInfoId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
