import React, { useEffect, useState } from 'react';
import { ListUser, Register } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const RegisterForm = () => {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkuser,setCheckUser]=useState([]);
    const [checkemail,setCheckEmail]=useState([]);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        setUsernameError('');
        setEmailError('');

        if (checkuser.includes(username)) {
            setUsernameError("Username already exists");
            hasError = true;
        }
        if (checkemail.includes(email)) {
            setEmailError("Email already exists");
            hasError = true;
        }
        if (hasError) return;

        let res = await Register(username, password, fullname, email);
        if (res && res.data && res.data.access_token) {
            localStorage.setItem("token", res.data.access_token);
            toast.success("Register success");
            navigate("/");
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            const response = await ListUser();
            if(response.data){
                const usernames = response.data.ListUser.map(user => user.username);
                const emails = response.data.ListUser.map(email => email.email);
                setCheckUser(usernames);
                setCheckEmail(emails);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="mb-0">Register</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                     {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fullname" className="form-label">
                                        Fullname
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullname"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                      {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                                </div>

                                <button className="btn btn-primary" >
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;