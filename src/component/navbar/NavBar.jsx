import { useEffect, useState } from "react";
import { persistor } from "../../redux/store/index.js";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/index.js";
import { fetchWithQuery } from "../../redux/actions/index.js";

import "./navbar.css";
// import { fetchMyData } from "../../redux/actions/index.js";

export default function NavBar() {
  const [query, setQuery] = useState("");
  const profile = useSelector((state) => state.list.userInfo);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchWithQuery(query));
    setQuery("");
  };

  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logoutUser());
    persistor.purge();
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar className="Topbar">
      <Container fluid className="navList">
        <Navbar.Brand href="/">
          <img src="logo.svg" alt="" className="navLogo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/" className="nav-text">
              Home
            </Nav.Link>
            <Nav.Link href="#action2" className="nav-text">
              All
            </Nav.Link>
            <NavDropdown
              title="General Task"
              id="navbarScrollingDropdown"
              className="nav-text"
            >
              <NavDropdown.Item href="#action3">Work Round</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Wheelchair</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
      <div className="topbarImageContainer">
        <img
          src="https://images.unsplash.com/photo-1578496781379-7dcfb995293d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fHBhdGllbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          alt=""
          className="topBarImage"
        />
        <NavDropdown title={profile.username} id="dropwonLIST">
          <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
        </NavDropdown>
      </div>
    </Navbar>
  );
}
