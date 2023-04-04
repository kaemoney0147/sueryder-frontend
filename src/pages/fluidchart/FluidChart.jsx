import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import "../fluidchart/flidchart.css";
import { ToastContainer, toast } from "react-toastify";

import { useSelector } from "react-redux";

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
  const [sliceIndex, setSliceIndex] = useState(0);
  const sliceSize = 5;
  const user = useSelector((state) => state.list.userInfo);
  const nextSlice = () => {
    const nextIndex = sliceIndex + sliceSize;
    if (nextIndex >= fluid.length) {
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
    givenby: user.username,
  };
  const navigate = useNavigate();
  const handleClick = () => {
    setShowContent(!showContent);
  };
  const params = useParams();
  const id = params.id;
  const fetchUserbyId = async () => {
    try {
      const url = await fetch(`${process.env.REACT_APP_BE_URL}/patient/${id}`);
      if (url.ok) {
        const response = await url.json();
        setPatient(response);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFluid = async () => {
    try {
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/fluid/patient/${id}`
      );
      if (url.ok) {
        const response = await url.json();
        setFluid(response);
        // const total = totalaccept(response);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {
      console.log(error);
    }
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
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/fluid/${id}`,
        options
      );
      if (url.ok) {
        toast("You have successfully save a fluid for this patient");
        setAmountofferd("");
        setAmounttaken("");
        setDate("");
        setGivenby("");
        setRunning("");
        setOutput("");
        setTimeofday("");
        setRoute("");
        setType("");
        setTime("");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="foodChart">
      <div className="foodWrapper mb-3">
        <Card className="FluidchatCard mt-4">
          <Card.Header className="text-center">
            <h3 className="foodTitle">Daily Fluid Chart</h3>
          </Card.Header>
          <Card.Body>
            <div>
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
            </div>
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
                    className="inputField foodSelect"
                    value={timeofday}
                    onChange={(e) => setTimeofday(e.target.value)}
                    required
                  >
                    <option>Please Select</option>
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
                    className="inputField foodSelect"
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    required
                  >
                    <option>Please Select</option>
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
                    value={user.username}
                    required
                  />
                </Form.Group>
              </div>
              <ToastContainer />
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
                  View Chart
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
      {showContent && (
        <div>
          <table className="blueTable mb-3">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Route</th>
                <th>Offered</th>
                <th>Accepted</th>
                <th>Total</th>
                <th>Output</th>
                <th>Givenby</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan="9">
                  <div className="links">
                    <a onClick={prevSlice} className="tableBtn">
                      &laquo;
                    </a>{" "}
                    <a className="active" href="#">
                      1
                    </a>{" "}
                    <a href="#">2</a> <a href="#">3</a> <a href="#">4</a>{" "}
                    <a onClick={nextSlice} className="tableBtn">
                      &raquo;
                    </a>
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>
              {fluid
                .map((c) => (
                  <tr key={c._id}>
                    <td>{c.date}</td>
                    <td>{c.time}</td>
                    <td>{c.type}</td>
                    <td>{c.route}</td>
                    <td>{c.amountofferd}</td>
                    <td>{c.amounttaken}</td>
                    <td>{c.running}</td>
                    <td>{c.output}</td>
                    <td>{c.givenby}</td>
                  </tr>
                ))
                .reverse()
                .slice(sliceIndex, sliceIndex + sliceSize)}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
