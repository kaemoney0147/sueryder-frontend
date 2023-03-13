import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../patientdetails/patientdetails.css";

export default function PatientDetails() {
  const params = useParams();
  const id = params.id;
  console.log(id);
  const [data, setData] = useState([]);

  const fetchUserbyId = async () => {
    try {
      const url = await fetch(`http://localhost:3001/patient/${id}`);
      if (url.ok) {
        const response = await url.json();
        console.log(response);
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
    <Container>
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
        <Button id="button">Accident</Button>
        <Link to={`/reposition/${data._id}`}>
          <Button id="button">Repositioning</Button>
        </Link>
        <Link to={`/personalcare/${data._id}`}>
          <Button id="button">Personal Care</Button>
        </Link>
        <Button id="button">Temperature</Button>
        <Button id="button">Obeservation</Button>
      </div>

      <div className="patient-history">
        <div className="image-details">
          <img src={data.image} alt="imag" className="patientDetails-img" />
        </div>
        <div className="patient-details patientInfo mt-3">
          Name: {data.title} {data.firstName} {data.lastName}
          <p className="patientInfo mb-0">Age: {data.Age}</p>
          <p className="patientInfo mb-0">Date of birth: {data.dob}</p>
          <p className="patientInfo mb-0">Gender: {data.Gender}</p>
          <p className="patientInfo">NHS NO: 1234567</p>
        </div>
      </div>
      <div>
        <div className="discription mt-5">
          <h3>Patient History</h3>
          {data.discription}
        </div>
      </div>
      <div className="d-flex mt-3">
        <Link to={"/"}>
          <Button id="primary">Back Home</Button>
        </Link>
      </div>
    </Container>
  );
}
