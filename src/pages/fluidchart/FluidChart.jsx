import React, { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "../fluidchart/flidchart.css";

export default function FluidChart() {
  const [timeofday, setTimeofday] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [fluid, setFluid] = useState([]);
  const [patient, setPatient] = useState([]);
  const [type, setType] = useState("");
  const [amounttaken, setAmounttaken] = useState("");
  const [amountofferd, setAmountofferd] = useState("");
  const [givenby, setGivenby] = useState("");
  // const [running2, setRunning2] = useState(0);
  const [running, setRunning] = useState("");
  const [output, setOutput] = useState("");
  const [route, setRoute] = useState("");

  const [showContent, setShowContent] = useState(false);
  let sum = 0;
  const totalaccept = (total) => {
    for (let i = 0; i <= total.length; i++) {
      sum += Number(total[i].amounttaken);
      console.log("this is sum", sum);
      console.log(total[i].amounttaken);
      // setRunning(sum);
    }
  };
  // console.log("running", running2);
  const putData = {
    timeofday: timeofday,
    date: date,
    time: time,
    type: type,
    route: route,
    running: running,
    output: output,
    amountofferd: amountofferd,
    amounttaken: amounttaken,
    givenby: givenby,
  };
  const navigate = useNavigate();
  const handleClick = () => {
    setShowContent(!showContent);
  };
  const params = useParams();
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
  const fetchFluid = async () => {
    try {
      const url = await fetch(`http://localhost:3001/fluid/patient/${id}`);
      if (url.ok) {
        const response = await url.json();
        console.log(response);
        setFluid(response);
        console.log(fluid);
        const total = totalaccept(response);
        console.log("total", total);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchFluid();
    fetchUserbyId();
  }, []);
  const handleSubmitFluid = async (e) => {
    e.preventDefault();
    try {
      let options = {
        method: "POST",
        body: JSON.stringify(putData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(`http://localhost:3001/fluid/${id}`, options);
      if (url.ok) {
        alert("You have successfully save a fluid for this patient");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };
  return (
    <Container className="foodChart">
      <div className="foodWrapper">
        <h3 className="foodTitle">Fluid Balance Chart</h3>

        <div className="foodListNote">
          <ul className="foodchartListItem">
            <li>
              Complete this fluid chart each time you offer patient any drink!
            </li>
            <li>
              Please do not leave it until the end of the day or you may forget
              what they have given.
            </li>
            <li>
              specify the quantity of drink by filling the approriate amount
            </li>
            <li>
              Even if no drink is taken, whereable please highlight reason.
            </li>
          </ul>
        </div>
        <div className="personalBtn">
          <span className="previousBtn">
            <AiOutlineArrowLeft onClick={() => navigate(-1)} />
            Back
          </span>
          <span>
            Next
            <AiOutlineArrowRight />
          </span>
        </div>
        <div className="foodChartForm mt-5">
          <div className="left">
            <div className="patiendetails">
              Name: {patient.title} {patient.firstName} {patient.lastName}
              <p>Ward: {patient.ward}</p>
            </div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeV0O5PFEropKwvdSrOl9zLaR84_O919oVA&usqp=CAU"
              alt="patient"
              className="foodchart-image mb-2"
            />
          </div>
          <div className="right">
            <h3>Record Fluid Intake</h3>
            <Form id="fluidForm">
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel mb-0">Period: </Form.Label>
                <select
                  value={timeofday}
                  onChange={(e) => setTimeofday(e.target.value)}
                  required
                >
                  <option>Select</option>
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>TeaTime</option>
                  <option>MidMorning</option>
                  <option>Midnight</option>
                </select>
              </Form.Group>
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel mb-0">Route </Form.Label>
                <select
                  className="form-option"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  required
                >
                  <option>Select</option>
                  <option>Peg</option>
                  <option>Oral</option>
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
                  What fluid did you offer?
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please input fluid here"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Amount</Form.Label>
                <Form.Control
                  placeholder="Amount offered"
                  value={amountofferd}
                  onChange={(e) => setAmountofferd(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Accept</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Amount accepted"
                  value={amounttaken}
                  onChange={(e) => setAmounttaken(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Total</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total Running"
                  value={running}
                  onChange={(e) => setRunning(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Output</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Output in ml"
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                />
              </Form.Group>
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
            </Form>
            <div className="foodchartBtn">
              <Button
                className="submitAdmissionBtn"
                type="submit"
                onClick={handleSubmitFluid}
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
              <tr className="fluidTr">
                <th>Date</th>
                <th>Time</th>
                <th>Offered</th>
                <th>Amount</th>
                <th>Accept</th>
                <th>Total</th>
                <th>Givenby</th>
              </tr>
            </thead>
            <tbody>
              {fluid.reverse().map((c) => (
                <tr key={c._id}>
                  <td>{c.date}</td>
                  <td> {c.time}</td>
                  <td>{c.type}</td>
                  <td>{c.amountofferd}</td>
                  <td>{c.amounttaken}</td>
                  <td>{c.running}</td>
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
