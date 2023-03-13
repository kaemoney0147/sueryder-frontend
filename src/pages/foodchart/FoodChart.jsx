import React, { useState, useEffect } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../foodchart/foodchart.css";
import { MdArrowForward } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

export default function FoodChart() {
  const [timeofday, setTimeofday] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patient, setPatient] = useState([]);
  const params = useParams();
  const [offered, setOffered] = useState("");
  const [amountaccepted, setAmountaccepted] = useState("");
  const [amountoffered, setAmountoffered] = useState("");
  const [givenby, setGivenby] = useState("");
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
      const url = await fetch(`http://localhost:3001/foodchart/patient/${id}`);
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
          timeofday,
          date,
          time,
          offered,
          amountoffered,
          amountaccepted,
          givenby,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(`http://localhost:3001/foodchart/${id}`, options);
      if (url.ok) {
        alert("You have successfully save a food for the patient");
        setAmountoffered("");
        setAmountaccepted("");
        setDate("");
        setGivenby("");
        setTimeofday("");
        setTime("");
        setOffered("");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };
  return (
    <Container className="foodChart">
      <div className="foodWrapper">
        <h3 className="foodTitle"> 24hrFOOD Intake CHART</h3>
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
        <div className="backbtn-fowarbtn">
          <span className="previousBtn">
            <BiArrowBack onClick={() => navigate(-1)} />
            Previous
          </span>
          <span>
            next
            <MdArrowForward />
          </span>
        </div>
        <div className="foodChartForm mt-5">
          <div className="left">
            <div className="patiendetails mb-2">
              Name: {patient.title} {patient.firstName} {patient.lastName}
              <p>Ward: {patient.ward}</p>
            </div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeuFqIfKH9g5j4X6H3HXtpjSa8G8XidNqOA&usqp=CAU"
              alt="patient"
              className="foodchart-image"
            />
          </div>
          <div className="right">
            <Form id="form" onSubmit={handleSubmit}>
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel mb-0">Period: </Form.Label>
                <select
                  value={timeofday}
                  onChange={(e) => setTimeofday(e.target.value)}
                  required
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                </select>
              </Form.Group>
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
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">
                  What did you offer?
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type of Food"
                  value={offered}
                  onChange={(e) => setOffered(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">offer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Amount Offered?"
                  value={amountoffered}
                  onChange={(e) => setAmountoffered(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Accept</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Amount Accepted?"
                  value={amountaccepted}
                  onChange={(e) => setAmountaccepted(e.target.value)}
                  required
                />
              </Form.Group>
            </Form>
            <Form.Group className="form-group mb-0">
              <Form.Label className="FormLabel mb-0">Carers Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Carers Name"
                value={givenby}
                onChange={(e) => setGivenby(e.target.value)}
                required
              />
            </Form.Group>
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
          <Table className="foorChartTable mt-2">
            <thead>
              <tr className="tr-food">
                <th>Date</th>
                <th>Time</th>
                <th>Offered</th>
                <th>Amount</th>
                <th>Accept</th>
                <th>Givenby</th>
              </tr>
            </thead>
            <tbody>
              {food.reverse().map((c) => (
                <tr key={c._id}>
                  <td>{c.date}</td>
                  <td> {c.time}</td>
                  <td>{c.offered}</td>
                  <td>{c.amountoffered}</td>
                  <td>{c.amountaccepted}</td>
                  <td>{c.givenby}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}
