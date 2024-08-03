import React, { useState } from 'react';
import { Login } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Login(username, password);
      if (res && res.data && res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        console.log(res.data);
        toast.success("Log in success");
        navigate("/");
      }else{
        toast.error("Log in failed")
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("The provided credentials are incorrect.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
    setLoading(false);
  };


  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form >
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary btn-block" onClick={handleSubmit}> 
                  {loading &&<FontAwesomeIcon icon={faSpinner} spin />}
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;