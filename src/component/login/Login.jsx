import { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../redux/actions/index.js";
import "./login.css";

export default function Login() {
  //   const tokenRecieved = useSelector((state) => state.list.accessToken);
  const userStatus = useSelector((state) => state.list.loginStatus);
  const loginStatusMessage = userStatus?.status;
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = () => {
    const userLogin = {
      username: user,
      password: password,
    };
    if (userLogin) {
      dispatch(getAccessToken(userLogin));
    } else {
      setError("Username and password do not match");
    }
  };
  useEffect(() => {
    if (loginStatusMessage === "success") {
      navigate("/home");
    }
  }, [userStatus]);
  return (
    <Container className="home-login">
      <img className="homepage-image mb-3" src="logo.svg" alt="logo" />
      {error && <p>{error}</p>}
      <Form onSubmit={handleSubmit} className="loginForm">
        <Form.Group className="form-group " controlId="formBasicEmail">
          <Form.Label className="FormLabel">Username</Form.Label>
          <Form.Control
            className="loginFormField"
            type="text"
            placeholder="Username"
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="form-group" controlId="formBasicPassword">
          <Form.Label className="FormLabel">Password</Form.Label>
          <Form.Control
            className="loginFormField"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="login-btn" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
