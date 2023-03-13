import { Container } from "react-bootstrap";
import AllPatient from "../allpatient/AllPatient";
import "./home.css";

export default function Home() {
  return (
    <Container className="Home">
      <AllPatient />
    </Container>
  );
}
