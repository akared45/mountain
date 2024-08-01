import React, { useState, useEffect } from 'react';
import { updateProfile, InforUser } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserInfo = async () => {
        try {
          const response = await InforUser(token);
          const data = response.data;
          console.log(response.data);
          setUserInfoId(data.id);
          setUserInfoPassword(data.password_hash);
          setUserInfoEmail(data.email);
          setUserInfoName(data.full_name);
          setUserGender(data.gender);
          setUserInfoImg(data.img);
          setUserInfoAddress(data.address);
          setUserInfoDob(data.dob);
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          toast.error('Failed to fetch user info.');
        }
      };
      fetchUserInfo();
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUserInfoImg(e.target.files[0].name);
    }
  };

  const handleEditProfile = async () => {
    try {
      console.log(userInfoDob);
      let res = await updateProfile(userInfoId, userInfoPassword, userInfoName, userInfoEmail, userInfoGender, userInfoImg, userInfoDob,userInfoAddress );
      toast.success("Edit success");
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please check the console for details.');
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src={userInfoImg ? `http://localhost:8000/storage/images/${userInfoImg}` : '/default-avatar.png'}
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
                        className="form-control"
                        id="fullname"
                        value={userInfoName}
                        onChange={(e) => setUserInfoName(e.target.value)}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={userInfoEmail}
                        onChange={(e) => setUserInfoEmail(e.target.value)}
                        readOnly={!isEditing}
                      />
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
                        className="form-control"
                        id="address"
                        value={userInfoAddress}
                        onChange={(e) => setUserInfoAddress(e.target.value)}
                        readOnly={!isEditing}
                      />
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
                        <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </button>
                    )}
                    <button type="button" className="btn btn-secondary">Change Password</button>
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
