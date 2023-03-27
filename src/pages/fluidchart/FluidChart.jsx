import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Table } from "react-bootstrap";
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
      <div className="foodWrapper mb-3">
        {/* <div className="foodListNote">
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
        </div> */}
        <Card className="FluidchatCard mt-4">
          <Card.Header as="h5" className="text-center">
            <h3 className="foodTitle">Daily Fluid Chart</h3>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <ul>
                <li>
                  Complete this fluid chart each time you offer patient any
                  drink!
                </li>
                <li>
                  Please do not leave it until the end of the day or you may
                  forget what they have given.
                </li>
                <li>
                  specify the quantity of drink by filling the approriate amount
                </li>
                <li>
                  Even if no drink is taken, whereable please highlight reason.
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
            <AiOutlineArrowRight
              onClick={() => navigate(`/bowelchart/${id}`)}
            />
            Next
          </span>
        </div>
        <div className="fluidChartForm ">
          <div className="fluidLeft">
            <div className="patiendetails">
              Name: {patient.title} {patient.firstName} {patient.lastName}
              <p>Ward: {patient.ward}</p>
            </div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeV0O5PFEropKwvdSrOl9zLaR84_O919oVA&usqp=CAU"
              alt="patient"
              className="fluidChart-image mb-2"
            />
          </div>
          <div className="fluidRight">
            <h3>Record Fluid Intake</h3>
            <Form id="fluidForm">
              <div className="foodFormWrapper">
                <Form.Group controlId="formGridState">
                  <Form.Label className="FormLabel ">Period: </Form.Label>
                  <select
                    className="inputField"
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
                  <Form.Label className="FormLabel ">Route </Form.Label>
                  <select
                    className="inputField"
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    required
                  >
                    <option>Select</option>
                    <option>Peg</option>
                    <option>Oral</option>
                  </select>
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">Date</Form.Label>
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
                  <Form.Label className="FormLabel ">Time</Form.Label>
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
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">
                    What fluid did you offer?
                  </Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Please input fluid here"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">Amount</Form.Label>
                  <Form.Control
                    className="inputField"
                    placeholder="Amount offered"
                    value={amountofferd}
                    onChange={(e) => setAmountofferd(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">Accept</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Amount accepted"
                    value={amounttaken}
                    onChange={(e) => setAmounttaken(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">Total</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Total Running"
                    value={running}
                    onChange={(e) => setRunning(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">Output</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Output in ml"
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">Carers Name</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Carers Name"
                    value={givenby}
                    onChange={(e) => setGivenby(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
            </Form>
            <div className="foodchartBtn mb-3">
              <Button
                id="submitAdmissionBtn"
                type="submit"
                onClick={handleSubmitFluid}
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
                  <td className="td">{c.date}</td>
                  <td className="td"> {c.time}</td>
                  <td className="td">{c.type}</td>
                  <td className="td">{c.amountofferd}</td>
                  <td className="td">{c.amounttaken}</td>
                  <td className="td">{c.running}</td>
                  <td className="td">{c.givenby}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}
