import React, { useState, useEffect } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "../bowelchart/bowelchart.css";

export default function BowelChart() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patient, setPatient] = useState([]);
  const params = useParams();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [intervention, setIntervention] = useState("");
  const [signature, setSignature] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [food, setFoood] = useState([]);
  const navigate = useNavigate();

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
      const url = await fetch(`http://localhost:3001/bowel/patient/${id}`);
      if (url.ok) {
        const response = await url.json();
        console.log(response);
        setFoood(response);
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
        body: JSON.stringify({
          date,
          time,
          type,
          amount,
          intervention,
          signature,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(`http://localhost:3001/bowel/${id}`, options);
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
        <h3 className="foodTitle"> Daily Patient Bowel Chart</h3>
        <div className="foodListNote">
          <ul className="foodchartListItem">
            <li>Complete this bowel form each time a patient open one</li>
            <li>
              Please do not leave it until the end of the day or you may forget.
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
              src="https://images.squarespace-cdn.com/content/v1/6144993d63872e76c5419b92/59c921ab-d536-459a-9a0e-a4c054a7cfa1/IMG-1257.PNG"
              alt="patient"
              className="bowelChart-image mb-2"
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
                  placeholder="Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel mb-0">Amount </Form.Label>
                <select
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                >
                  <option>...</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </Form.Group>
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel mb-0">Type </Form.Label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option>...</option>
                  <option>Type1</option>
                  <option>Type2</option>
                  <option>Type3</option>
                  <option>Type4</option>
                  <option>Type5</option>
                  <option>Type6</option>
                  <option>Type7</option>
                </select>
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Intervention</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Suppository"
                  value={intervention}
                  onChange={(e) => setIntervention(e.target.value)}
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
        <div>
          <Table className="table mt-2">
            <thead>
              <tr className="tr-bowel">
                <th>Date</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Intervention</th>
                <th>Signature</th>
              </tr>
            </thead>
            <tbody>
              {food.reverse().map((c) => (
                <tr key={c._id}>
                  <td>{c.date}</td>
                  <td> {c.time}</td>
                  <td>{c.amount}</td>
                  <td>{c.type}</td>
                  <td>{c.intervention}</td>
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
