import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";
import { Accordion, Card } from 'react-bootstrap';
import './SideBar.css';
const SideBar = () => {
  return (
    <div className="bg-white sidebar">
      <div className="m-2">
        <i className="bi bi-bootstrap-fill me-2 fs-4"></i>
        <span className="brand-name fs-4">You</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `list-group-item list-group-item-action my-2 ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-speedometer2 fs-5 me-3"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin/mountain"
          className={({ isActive }) =>
            `list-group-item list-group-item-action my-2 ${isActive ? "active" : ""}`
          }
        >
          <i className="bi-geo-alt fs-4 me-3"></i>
          <span>Mountain</span>
        </NavLink>
        <NavLink
          to="/admin/group"
          className={({ isActive }) =>
            `list-group-item list-group-item-action my-2 ${isActive ? "active" : ""}`
          }
        >
          <i className="bi-people fs-4 me-3"></i>
          <span>Group</span>
        </NavLink>

        <Accordion defaultActiveKey="" className="no-border">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <i className="bi-person fs-4 me-3"></i> User
            </Accordion.Header>
            <Accordion.Body>
              <NavLink
                to="/admin/user/role"
                className={({ isActive }) =>
                  `list-group-item list-group-item-action ${isActive ? "active" : ""}`
                }
              >
                Role
              </NavLink>
              <NavLink
                to="/admin/user/comment"
                className={({ isActive }) =>
                  `list-group-item list-group-item-action  ${isActive ? "active" : ""}`
                }
              >
                Comment
              </NavLink>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <NavLink
          to="/admin/blog"
          className={({ isActive }) =>
            `list-group-item list-group-item-action my-2 ${isActive ? "active" : ""}`
          }
        >
          <i className="bi-pencil-square fs-4 me-3"></i>
          <span>Blog</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;