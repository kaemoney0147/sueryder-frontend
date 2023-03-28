import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form, Table } from "react-bootstrap";
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
  const [sliceIndex, setSliceIndex] = useState(0);
  const sliceSize = 5;

  const nextSlice = () => {
    const nextIndex = sliceIndex + sliceSize;
    if (nextIndex >= food.length) {
      return;
    }
    setSliceIndex(nextIndex);
  };

  const prevSlice = () => {
    const prevIndex = sliceIndex - sliceSize;
    if (prevIndex < 0) {
      return;
    }
    setSliceIndex(prevIndex);
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
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/bowel/patient/${id}`
      );
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
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/bowel/${id}`,
        options
      );
      if (url.ok) {
        alert("You have successfully save a bowel for the patient");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };
  return (
    <Container className="foodChart">
      <div className="foodWrapper mb-3">
        {/* <h3 className="foodTitle"> Daily Patient Bowel Chart</h3> */}
        {/* <div className="foodListNote">
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
        </div> */}
        <Card className="FoodchatCard mt-4">
          <Card.Header as="h5" className="text-center">
            Daily Patient Bowel Chart
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <ul>
                <li>
                  Complete this food chart each time you offer food to a patient
                </li>
                <li>
                  Please do not leave it until the end of the day or you may
                  forget what they have given.
                </li>
                <li>
                  specify the quantity of food eaten by filling the approriate
                  amount
                </li>
                <li>
                  Even if no food is taken, whereable please hight reason.
                </li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
        <div id="personalBtn">
          <span className="previousBtn">
            <AiOutlineArrowLeft onClick={() => navigate(-1)} />
            Previous
          </span>
          <span className="previousBtn">
            <AiOutlineArrowRight onClick={() => navigate(`/bodymap/${id}`)} />
            Next
          </span>
        </div>
        <div className="bowelChartForm">
          <div className="bowelLeft">
            <div className="bowelPatiendetails">
              Name: {patient.title} {patient.firstName} {patient.lastName}
              <p>Ward: {patient.ward}</p>
            </div>
            <img
              src="https://www.pediatricassociatesny.com/uploads/1/2/9/7/129767943/bristol-stool-chart-cropped_orig.jpg"
              alt="patient"
              className="bowelChart-image mb-3"
            />
          </div>
          <div className="bowelRight">
            <h3>Record Bowel</h3>
            <Form id="form" onSubmit={handleSubmit}>
              <div className="foodFormWrapper">
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">Date</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="date"
                    value={date}
                    placeholder="DD/MM/YY"
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">Time</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="time"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group controlId="formGridState">
                  <Form.Label className="FormLabel">Amount </Form.Label>
                  <select
                    className="inputField"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  >
                    <option>Select</option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </Form.Group>
                <Form.Group controlId="formGridState">
                  <Form.Label className="FormLabel">Type </Form.Label>
                  <select
                    className="inputField"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option>Select</option>
                    <option>Type1</option>
                    <option>Type2</option>
                    <option>Type3</option>
                    <option>Type4</option>
                    <option>Type5</option>
                    <option>Type6</option>
                    <option>Type7</option>
                  </select>
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">Intervention</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Suppository"
                    value={intervention}
                    onChange={(e) => setIntervention(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">Carers Name</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Carers Name"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
            </Form>
            <div className="foodchartBtn mb-3">
              <Button
                id="submitAdmissionBtn"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <span className="ViewBtn">
                <Button
                  id="submitAdmissionBtn"
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
          <Table className="foorChartTable mt-2">
            <thead>
              <tr className="tr-food">
                <th>Date</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Intervention</th>
                <th>Carers</th>
              </tr>
            </thead>
            <tbody>
              {food.reverse().map((c) => (
                <tr key={c._id}>
                  <td className="td">{c.date}</td>
                  <td className="td"> {c.time}</td>
                  <td className="td">{c.amount}</td>
                  <td className="td">{c.type}</td>
                  <td className="td">{c.intervention}</td>
                  <td className="td">{c.signature}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="tabelBtn">
            <span className="previousBtn">
              <AiOutlineArrowLeft onClick={prevSlice} />
              Prev
            </span>
            <span className="previousBtn">
              Next
              <AiOutlineArrowRight onClick={nextSlice} />
            </span>
          </div>
        </div>
      )}
    </Container>
  );
}
