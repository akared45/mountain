import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "./SideBar.css"
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { toast } from "react-toastify";
const Admin = () => {
    const [toggle, setToggle] = useState(true);
    const Toggle = () => {
        setToggle(!toggle);
    }
    const navigate = useNavigate();
    const userRole = localStorage.getItem("role");

    useEffect(() => {
        if (userRole !== 'admin') {
            toast.error("You are not authorized to access this page.");
            navigate("/");
        }
    }, [navigate, userRole]);
    return (
        <div className="container-fluid bg-white min-vh-100">
            <div className="row">
                {toggle && <div className="col-2 bg-white vh-100">
                    <SideBar></SideBar>
                </div>}
                <div className="col">
                    <Nav Toggle={Toggle}></Nav>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Admin;