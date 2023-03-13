import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPatient } from "../../redux/actions/index.js";
import "./allpatient.css";

export default function AllPatient() {
  const querylist = useSelector((state) => state.patient.showquery);
  const dispatch = useDispatch();
  const allPatient = useSelector((state) => state.patient.patient);
  console.log(allPatient);

  useEffect(() => {
    dispatch(getAllPatient());
  }, []);
  if (querylist.length > 0) {
    return (
      <Container className="mt-3">
        <Row className="mt-3">
          {querylist.map((c) => (
            <Col className="col-4 mb-3" key={c._id}>
              <Card className="patientlistCard">
                <Card.Img src={c.image} className="patient-image" />
                <Card.Body className="listofpaitent-card">
                  <Card.Title>
                    {c.title} {c.firstName} {c.lastName}
                  </Card.Title>
                  <Card.Text className="patientInfo mb-0">
                    Gender: {c.Gender}
                  </Card.Text>
                  <Card.Text className=" patientInfo mb-0">
                    Age: {c.Age}
                  </Card.Text>
                  <Card.Text className="patientInfo mb-0">
                    Ward:{c.ward}
                  </Card.Text>
                  <Card.Text className="patientInfo">Room: {c.room}</Card.Text>
                  <Link to={`/patient/${c._id}`}>
                    <div>
                      <button className="patientList-btn">
                        View Patient Profile
                      </button>
                    </div>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  } else {
    return (
      <Container className="mt-3">
        <Row className="mt-3">
          {allPatient.map((p) => (
            <Col className="col-4 mb-3" key={p._id}>
              <Card className="patientlistCard">
                <Card.Img src={p.image} className="patient-image" />
                <Card.Body className="listofpaitent-card">
                  <Card.Title>
                    {p.title} {p.firstName} {p.lastName}
                  </Card.Title>
                  <Card.Text className="patientInfo mb-0">
                    Gender: {p.Gender}
                  </Card.Text>
                  <Card.Text className=" patientInfo mb-0">
                    Age: {p.Age}
                  </Card.Text>
                  <Card.Text className="patientInfo mb-0">
                    Ward:{p.ward}
                  </Card.Text>
                  <Card.Text className="patientInfo">Room: {p.room}</Card.Text>
                  <Link to={`/patient/${p._id}`}>
                    <div>
                      <button className="patientList-btn">
                        View Patient Profile
                      </button>
                    </div>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
