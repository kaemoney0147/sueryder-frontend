import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Container, ListGroup, Nav } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import "./patientdetails.css";

export default function PatientDetails() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState([]);
  const [displayBadge, setDisplayBadge] = useState(false);
  const fetchUserbyId = async () => {
    try {
      const url = await fetch(`${process.env.REACT_APP_BE_URL}/patient/${id}`);
      if (url.ok) {
        const response = await url.json();
        setData(response);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {}
  };
  const handleButtonClick = () => {
    // Set displayBadge to false when button is clicked
    setDisplayBadge(false);
  };
  useEffect(() => {
    fetchUserbyId();
  }, []);
  useEffect(() => {
    const now = new Date();
    const oneAM = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      14,
      0,
      0
    );

    if (now > oneAM && now < oneAM.setHours(15)) {
      setDisplayBadge(true);
    } else {
      setDisplayBadge(false);
    }
  }, []);
  return (
    <Container className="detailsBody">
      <div className="fluid-container mb-3 p-3">
        <Link to={`/foodchart/${data._id}`}>
          <Button id="button">Food Chart</Button>
        </Link>
        <Link to={`/fluidchart/${data._id}`}>
          <Button id="button">Fluid Chart</Button>
        </Link>
        <Link to={`/bowelchart/${data._id}`}>
          <Button id="button">Bowel Chart</Button>
        </Link>
        <Link to={`/bodymap/${data._id}`}>
          <Button id="button">Body Map</Button>
        </Link>
        <Link to={`/vital/${data._id}`}>
          <Button id="button">Vital Examination</Button>
        </Link>
        <Link to={`/reposition/${data._id}`}>
          <Button id="button" onClick={handleButtonClick}>
            Repositioning
            {displayBadge && <div className="patientDetailsBadge">Needs</div>}
          </Button>
        </Link>
        <Link to={`/personalcare/${data._id}`}>
          <Button id="button" onClick={handleButtonClick}>
            Personal Care
            {displayBadge && <div className="patientDetailsBadge">Needs</div>}
          </Button>
        </Link>
        <Link to={`/observation/${data._id}`}>
          <Button id="button">Observation</Button>
        </Link>
      </div>
      {/* <div id="recordWrapper">
        <Nav id="recordTask" as="ul">
          <button className="recordsBtn">Food</button>
          <button className="recordsBtn">Fluid</button>
          <button className="recordsBtn">Bowel</button>
          <button className="recordsBtn">Observation</button>
          <button className="recordsBtn">PersonalCare</button>
          <button className="recordsBtn">Vitals</button>
          <button className="recordsBtn">Reposition</button>
        </Nav>
      </div> */}
      <div className="datails">
        <Card id="patient-history">
          <Card.Img src={data.image} id="patientDetails-img" />
          <Card.Body id="detailsCard">
            <ListGroup id="patient-details">
              <ListGroup.Item>
                Name: {data.title} {data.firstName} {data.lastName}
              </ListGroup.Item>
              <ListGroup.Item>Date of Birth: {data.dob}</ListGroup.Item>
              <ListGroup.Item>Gender: {data.Gender}</ListGroup.Item>
              <ListGroup.Item>NHS NO: 2173663-02</ListGroup.Item>
              <ListGroup.Item>Ward: {data.ward}</ListGroup.Item>
              <ListGroup.Item>Allocated Room: {data.room}</ListGroup.Item>
              <ListGroup.Item>Disease: {data.disease}</ListGroup.Item>
              {/* <ListGroup.Item>
                Admission Date: {data.admission.date}
              </ListGroup.Item> */}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card id="discriptionCard">
          <Card.Header className="discriptionTitle">
            Patient History
          </Card.Header>
          <Card.Body>
            <Card.Text>{data.discription}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex mb-3 mt-2">
        <Link to={"/"}>
          <Button id="button">Back Home</Button>
        </Link>
      </div>
    </Container>
  );
}
