import { useEffect } from "react";
import { persistor } from "../../redux/store/index.js";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/index.js";

import "./navbar.css";

export default function NavBar() {
  const profile = useSelector((state) => state.list.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    function startTimer() {
      timeoutId = setTimeout(() => {
        logOut();
      }, 30 * 60 * 1000); // 30 minutes in milliseconds
    }

    function resetTimer() {
      clearTimeout(timeoutId);
      startTimer();
    }

    function handleUserAction() {
      resetTimer();
    }

    startTimer();

    window.addEventListener("mousemove", handleUserAction);
    window.addEventListener("keydown", handleUserAction);

    return () => {
      window.removeEventListener("mousemove", handleUserAction);
      window.removeEventListener("keydown", handleUserAction);
    };
  }, []);

  const logOut = () => {
    dispatch(logoutUser());
    persistor.purge();
    navigate("/");
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
            <NavDropdown
              title="General Task"
              id="navbarScrollingDropdown"
              className="nav-text"
            >
              <NavDropdown.Item href="#action3">Work Round</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Wheelchair</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="topbarImageContainer mb">
        <img src={profile.avatar} alt="" className="topBarImage" />
        <NavDropdown
          title={`${profile.firstName} ${profile.lastName}`}
          id="dropwonLIST"
        >
          <NavDropdown.Item>Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
        </NavDropdown>
      </div>
    </Navbar>
  );
}
