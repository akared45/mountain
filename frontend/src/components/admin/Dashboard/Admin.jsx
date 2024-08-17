import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "../../../style/SideBar.css";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { toast } from "react-toastify";
import { InforUser } from "../../../services/api";
import { Navigate } from 'react-router-dom';

const Admin = () => {
    const [toggle, setToggle] = useState(true);
    const [userRole, setUserRole] = useState(null); 
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const Toggle = () => {
        setToggle(prevToggle => !prevToggle);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await InforUser(token);
                setUserRole(response.data.role);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                toast.error('Failed to fetch user info.');
                navigate('/login'); 
            }
        };
        fetchUserInfo();
    }, [token, navigate]);

    useEffect(() => {
        if (userRole && userRole !== 'admin') {
            toast.error("You are not authorized to access this page.");
            navigate("/");
        }
    }, [userRole, navigate]);

    if (userRole === null) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="container-fluid bg-white min-vh-100">
            <div className="row">
                {toggle && (
                    <div className="col-2 bg-white vh-100">
                        <SideBar />
                    </div>
                )}
                <div className="col">
                    <Nav Toggle={Toggle} />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Admin;
