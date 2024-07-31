import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile, changePassword, InforUser } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [userInfoEmail, setUserInfoEmail] = useState("");
  const [userInfoName, setUserInfoName] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userImg, setUserImg] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserInfo = async () => {
        try {
          const response = await InforUser(token);
          setUserInfoEmail(response.data.email);
          setUserInfoName(response.data.full_name);
          setUserGender(response.data.gender);
          setUserImg(response.data.img);
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          toast.error('Failed to fetch user info.');
        }
      };
      fetchUserInfo();
    }
  }, []);

  return (
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src={`http://localhost:8000/storage/images/${userImg}`}
                  alt={userInfoName}
                  style={{ width: '100%' }}
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <form>
                    <div class="form-group">
                      <label for="fullname">Fullname</label>
                      <input type="text" class="form-control" id="fullname" name="fullname" value={userInfoName} />
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" class="form-control" id="email" name="email" value={userInfoEmail} />
                    </div>
                    <div class="form-group">
                      <label for="gender">Gender</label>
                      <div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" id="male" name="gender" value="male" checked={userGender === 'male'} onChange={() => setUserGender('male')} />
                          <label class="form-check-label" for="male">Male</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" id="female" name="gender" value="female" checked={userGender === 'female'} onChange={() => setUserGender('female')} />
                          <label class="form-check-label" for="female">Female</label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="address">Address</label>
                      <input type="text" class="form-control" id="address" name="address" value="123 Main St, Anytown USA" />
                    </div>
                    <div class="form-group">
                      <label for="dob">Date of Birth</label>
                      <input type="date" class="form-control" id="dob" name="dob" value="1990-01-01" />
                    </div>
                  </form>
                  <div class="d-flex gap-2 mt-3">
                    <button type="button" class="btn btn-secondary">Edit Profile</button>
                    <button type="button" class="btn btn-secondary">Change Password</button>
                    <button type="button" class="btn btn-danger">Sign Out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;







