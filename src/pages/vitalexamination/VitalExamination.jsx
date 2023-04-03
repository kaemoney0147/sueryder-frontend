import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Table } from "react-bootstrap";
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
  const [sliceIndex, setSliceIndex] = useState(0);
  const sliceSize = 5;

  const nextSlice = () => {
    const nextIndex = sliceIndex + sliceSize;
    if (nextIndex >= vital.length) {
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
  const fetchFood = async () => {
    try {
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/vital/patient/${id}`
      );
      if (url.ok) {
        const response = await url.json();

        setVital(response);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {
      console.log(error);
    }
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
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/vital/${id}`,
        options
      );
      if (url.ok) {
        alert("You have successfully submit patient vital information");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="foodChart">
      <div className="foodWrapper mt-3 mb-3">
        <Card className="FoodchatCard">
          <Card.Header className="text-center">
            <h3 className="foodTitle"> Vital Examination</h3>
          </Card.Header>
          <Card.Body>
            <div>
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
              onClick={() => navigate(`/reposition/${id}`)}
            />
            Next
          </span>
        </div>
        <div className="foodChartForm">
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
            <h3>Record Examination</h3>
            <Form id="form" onSubmit={handleSubmit}>
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
                    placeholder="Respiration"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">Resp</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Respiration"
                    value={respiration}
                    onChange={(e) => setRespiration(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">Blood Pressure</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Blood pressure"
                    value={bloodpressure}
                    onChange={(e) => setBloodpressure(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">01Sats</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Oxygen Saturation %"
                    value={scale1}
                    onChange={(e) => setScale1(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">02Sats</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Use Scale 2 if urgent"
                    value={scale2}
                    onChange={(e) => setScale2(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group controlId="formGridState">
                  <Form.Label className="FormLabel">Acvpu </Form.Label>
                  <select
                    className="inputField foodSelect "
                    value={consciousness}
                    onChange={(e) => setConsciousness(e.target.value)}
                    required
                  >
                    <option>Please Select</option>
                    <option>Alert</option>
                    <option>Confusion</option>
                  </select>
                </Form.Group>
                <Form.Group controlId="formGridState">
                  <Form.Label className="FormLabel">Inspired O2</Form.Label>
                  <select
                    className="inputField foodSelect "
                    value={breathing}
                    onChange={(e) => setBreathing(e.target.value)}
                    required
                  >
                    <option>Please Select</option>
                    <option>Air</option>
                    <option>Oxygen</option>
                  </select>
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">Pulse</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Pulse"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">Temp</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Temprature"
                    value={temparature}
                    onChange={(e) => setTemparature(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">Carers Name</Form.Label>
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
                <th>BP</th>
                <th>O2</th>
                <th>ACVPU</th>
                <th>Pulse</th>
                <th>Resp</th>
                <th>Temp</th>
                <th>scale1</th>
                <th>scale2</th>
                <th>Signature</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan="12">
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
              {vital
                .map((c) => (
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
