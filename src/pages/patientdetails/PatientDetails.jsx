import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Container, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../patientdetails/patientdetails.css";

export default function PatientDetails() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState([]);

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

  useEffect(() => {
    fetchUserbyId();
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
        {/* <Button id="button">Accident</Button> */}
        <Link to={`/reposition/${data._id}`}>
          <Button id="button">Repositioning</Button>
        </Link>
        <Link to={`/personalcare/${data._id}`}>
          <Button id="button">Personal Care</Button>
        </Link>
        {/* <Button id="button">Temperature</Button> */}
        <Link to={`/observation/${data._id}`}>
          <Button id="button">Obeservation</Button>
        </Link>
      </div>

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
              <ListGroup.Item>Allocated Ward: {data.ward}</ListGroup.Item>
              <ListGroup.Item>Room No: {data.room}</ListGroup.Item>
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
