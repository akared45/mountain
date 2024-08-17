import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.jpg";
import "../../../style/Header.css";
import { toast } from "react-toastify";
import { InforUser } from "../../../services/api";

const Header = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchUserInfo = async () => {
        try {
          const response = await InforUser(token);
          setUserRole(response.data.role);
          setAvatarUrl(response.data.img);
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          toast.error('Failed to fetch user info.');
        }
      };
      fetchUserInfo();
    }

  }, [token]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("page_visited");
    navigate("/");
    toast.success("Log out success");
  };

  return (
    <header>
      <Navbar expand="lg" className="justify-content-between">
        <Container className="container">
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              width="150"
              height="120"
              className="d-inline-block align-top"
              alt="Alpine Ascents International logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/mountains">Mountain</Nav.Link>
              <Nav.Link as={Link} to="/group">Group</Nav.Link>
              <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
              <Nav.Link as={Link} to="/story">Story</Nav.Link>
              <Nav.Link as={Link} to="/about">About Us</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
            <NavDropdown title={token ?
              <img
                src={avatarUrl ? `http://localhost:8000/storage/images/${avatarUrl}` : 'http://localhost:8000/storage/images/avtdefault.jpg'}
                alt="avatar"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              /> : "Account"} id="basic-nav-dropdown">
              {!token ? (
                <>
                  <NavDropdown.Item as={Link} to="/login">Log in</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>Logout</NavDropdown.Item>
                  {userRole === 'admin' && (
                    <NavDropdown.Item as={Link} to="/admin">Admin</NavDropdown.Item>
                  )}
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
