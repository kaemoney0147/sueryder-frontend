import React, { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "../vitalexamination/vitalexamination.css";

export default function VitalExamination() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patient, setPatient] = useState([]);
  const params = useParams();
  const [respiration, setRespiration] = useState("");
  const [pulse, setPulse] = useState("");
  const [bloodpressure, setBloodpressure] = useState("");
  const [signature, setSignature] = useState("");
  const [temparature, setTemparature] = useState("");
  const [breathing, setBreathing] = useState("");
  const [scale1, setScale1] = useState("");
  const [scale2, setScale2] = useState("");
  const [consciousness, setConsciousness] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [vital, setVital] = useState([]);
  const navigate = useNavigate();
  const inputData = {
    date: date,
    time: time,
    respiration: respiration,
    pulse: pulse,
    bloodpressure: bloodpressure,
    signature: signature,
    temparature: temparature,
    breathing: breathing,
    scale1: scale1,
    scale2: scale2,
    consciousness: consciousness,
  };
  const handleClick = () => {
    setShowContent(!showContent);
  };
  const id = params.id;
  const fetchUserbyId = async () => {
    try {
      const url = await fetch(`http://localhost:3001/patient/${id}`);
      if (url.ok) {
        const response = await url.json();
        console.log(response);
        setPatient(response);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {}
  };
  const fetchFood = async () => {
    try {
      const url = await fetch(`http://localhost:3001/vital/patient/${id}`);
      if (url.ok) {
        const response = await url.json();
        console.log(response);
        setVital(response);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchUserbyId();
    fetchFood();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let options = {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(`http://localhost:3001/vital/${id}`, options);
      if (url.ok) {
        alert("You have successfully save a bowel for the patient");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };
  return (
    <Container className="foodChart">
      <div className="foodWrapper">
        <h3 className="foodTitle"> Recording Patient Vital Examination</h3>
        <div className="foodListNote">
          <ul className="foodchartListItem">
            <li>
              Complete this food chart each time you offer food to a patient
            </li>
            <li>
              Please do not leave it until the end of the day or you may forget
              what they have given.
            </li>
            <li>
              specify the quantity of food eaten by filling the approriate
              amount
            </li>
            <li>Even if no food is taken, whereable please hight reason.</li>
          </ul>
        </div>
        <div className="personalBtn">
          <span className="previousBtn">
            <AiOutlineArrowLeft onClick={() => navigate(-1)} />
            Back
          </span>
          <span>
            <AiOutlineArrowRight />
            Next
          </span>
        </div>
        <div className="foodChartForm mt-5">
          <div className="left">
            <div className="patiendetails">
              Name: {patient.title} {patient.firstName} {patient.lastName}
              <p>Ward: {patient.ward}</p>
            </div>
            <img
              src="https://www.reayaonline.com/media/catalog/product/cache/119487587ed045808d459dbb41eef5d5/2/0/2051326a_3.jpg"
              alt="patient"
              className="vitalChart-image"
            />
          </div>
          <div className="right">
            <Form id="form" onSubmit={handleSubmit}>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  placeholder="DD/MM/YY"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Respiration"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Resp</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Respiration"
                  value={respiration}
                  onChange={(e) => setRespiration(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">
                  Blood Pressure
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Blood pressure"
                  value={bloodpressure}
                  onChange={(e) => setBloodpressure(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">01Sats</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Oxygen Saturation %"
                  value={scale1}
                  onChange={(e) => setScale1(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">02Sats</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Use Scale 2 if urgent"
                  value={scale2}
                  onChange={(e) => setScale2(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel mb-0">ACVPU </Form.Label>
                <select
                  className="form-option"
                  value={consciousness}
                  onChange={(e) => setConsciousness(e.target.value)}
                  required
                >
                  <option>Default</option>
                  <option>Alert</option>
                  <option>Confusion</option>
                </select>
              </Form.Group>
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel mb-0">Inspired O2</Form.Label>
                <select
                  className="form-option"
                  value={breathing}
                  onChange={(e) => setBreathing(e.target.value)}
                  required
                >
                  <option>Default</option>
                  <option>Air</option>
                  <option>Oxygen</option>
                </select>
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Pulse</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Pulse"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Temp</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Temprature"
                  value={temparature}
                  onChange={(e) => setTemparature(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Carers Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Carers Name"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  required
                />
              </Form.Group>
            </Form>
            <div className="foodchartBtn">
              <Button
                className="submitAdmissionBtn"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <span>
                <Button
                  className="submitAdmissionBtn"
                  type="submit"
                  onClick={handleClick}
                >
                  View
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
      {showContent && (
        <div className="table-div">
          <Table className="table mt-2">
            <thead>
              <tr className="tr-bowel">
                <th>Date</th>
                <th>Time</th>
                <th>BloodPresure</th>
                <th>Inspired O2</th>
                <th>Consciousness</th>
                <th>Pulse</th>
                <th>Respiration</th>
                <th>Temparature</th>
                <th>scale1</th>
                <th>scale2</th>
                <th>Signature</th>
              </tr>
            </thead>
            <tbody>
              {vital.reverse().map((c) => (
                <tr key={c._id}>
                  <td>{c.date}</td>
                  <td> {c.time}</td>
                  <td>{c.bloodpressure} mmHg</td>
                  <td>{c.breathing}</td>
                  <td>{c.consciousness}</td>
                  <td>{c.pulse}/min</td>
                  <td>{c.respiration} /min</td>
                  <td>{c.temparature}°C</td>
                  <td>{c.scale1}%</td>
                  <td>{c.scale2}%</td>
                  <td>{c.signature}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}
