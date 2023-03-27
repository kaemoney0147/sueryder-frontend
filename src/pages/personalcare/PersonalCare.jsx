import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../personalcare/personalcare.css";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function PersonalCare() {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;
  console.log({ userId });
  const [care, setCare] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [caregive, setCaregive] = useState("");
  const [givenby, setGivenby] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [daychecks, setDayChecks] = useState("");
  const [nightchecks, setNightChecks] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [patient, setPatient] = useState([]);
  const [sliceIndex, setSliceIndex] = useState(0);
  const sliceSize = 5;

  const nextSlice = () => {
    const nextIndex = sliceIndex + sliceSize;
    if (nextIndex >= care.length) {
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

  const inputDate = {
    caregive,
    date,
    time,
    givenby,
    from: from,
    to: to,
    daychecks: daychecks,
    nightchecks: nightchecks,
  };
  const fetchCare = async () => {
    try {
      const url = await fetch(
        `http://localhost:3001/personalcare/patient/${userId}`
      );
      if (url.ok) {
        const response = await url.json();
        console.log(response);
        setCare(response);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchCare();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let options = {
        method: "POST",
        body: JSON.stringify(inputDate),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(
        `http://localhost:3001/personalcare/${userId}`,
        options
      );
      if (url.ok) {
        alert("You have successfully save care for the patient");
        setCare("");
        setCaregive("");
        setDate("");
        setDayChecks("");
        setFrom("");
        setNightChecks("");
        setTo("");
        setTime("");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };
  const fetchUserbyId = async () => {
    try {
      const url = await fetch(`http://localhost:3001/patient/${userId}`);
      if (url.ok) {
        const response = await url.json();
        console.log(response);
        setPatient(response);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchUserbyId();
  }, []);
  return (
    <>
      <Container>
        <div className="personcare-maincontainer">
          <div className="personalcare-textarea">
            <div className="personcareInfo">
              <h1>Clinical Daily Journal</h1>
              <p>
                Name: {patient.title} {patient.firstName} {patient.lastName}
              </p>
              <p>Date of Birth: {patient.dob}</p>
              <p>Ward: {patient.ward}</p>
            </div>

            <div id="personalBtn">
              <span className="previousBtn">
                <AiOutlineArrowLeft onClick={() => navigate(-1)} />
                Previous
              </span>
              <span className="previousBtn">
                <AiOutlineArrowRight
                  onClick={() => navigate(`/observation/${userId}`)}
                />
                Next
              </span>
            </div>
            <Form onSubmit={handleSubmit} id="personalCareForm">
              {/* <div className="personcareFormWrapper"> */}
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel ">Date</Form.Label>
                <Form.Control
                  className="personalcareInputfield"
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
                  className="personalcareInputfield"
                  type="time"
                  placeholder="Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </Form.Group>
              {/* </div> */}
              {/* <div className="personcareFormWrapper"> */}
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel ">Postion From</Form.Label>
                <select
                  className="foodSelect personalcareInputfield"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                >
                  <option>Select</option>
                  <option>Bed</option>
                  <option>Chair</option>
                </select>
              </Form.Group>
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel ">Position To</Form.Label>
                <select
                  className="foodSelect personalcareInputfield"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                >
                  <option>Select</option>
                  <option>Bed</option>
                  <option>Chair</option>
                </select>
              </Form.Group>
              {/* </div> */}
              {/* <div className="personcareFormWrapper"> */}
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel ">Day Checks</Form.Label>
                <select
                  className="foodSelect personalcareInputfield"
                  value={daychecks}
                  onChange={(e) => setDayChecks(e.target.value)}
                >
                  <option>Select</option>
                  <option>Asleep</option>
                  <option>Awake</option>
                  <option>Restless</option>
                </select>
              </Form.Group>
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel ">Night Checks</Form.Label>
                <select
                  className="foodSelect personalcareInputfield"
                  value={nightchecks}
                  onChange={(e) => setNightChecks(e.target.value)}
                >
                  <option>Select</option>
                  <option>Asleep</option>
                  <option>Awake</option>
                  <option>Restless</option>
                </select>
              </Form.Group>
              {/* </div> */}

              <Form.Control
                className="personlCareTextarea "
                as="textarea"
                placeholder="Please enter details"
                required
                value={caregive}
                onChange={(e) => setCaregive(e.target.value)}
              />
              <Form.Group>
                <Form.Label>Carers</Form.Label>
                <Form.Control
                  className="personalcareInputfield"
                  type="text"
                  placeholder="Name of carers"
                  required
                  value={givenby}
                  onChange={(e) => setGivenby(e.target.value)}
                />
              </Form.Group>
            </Form>
            <div className="view-personalcare mb-3">
              <Button id="submitAdmissionBtn" type="submit">
                Submit
              </Button>
              <span className="ViewBtn">
                <Button
                  id="submitAdmissionBtn"
                  onClick={() => {
                    handleClick();
                  }}
                >
                  View
                </Button>
              </span>
            </div>
          </div>
        </div>
      </Container>
      {showContent && (
        <div>
          <Table className="table mt-2">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Person care</th>
                <th>DayChecks</th>
                <th>NightChecks</th>
                <th>Carer</th>
              </tr>
            </thead>
            <tbody>
              {care.reverse().map((c) => (
                <tr key={c._id}>
                  <td>{c.date}</td>
                  <td> {c.time}</td>
                  <td>{c.caregive}</td>
                  <td>{c.daychecks}</td>
                  <td>{c.nightchecks}</td>

                  <td>{c.givenby}</td>
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
    </>
  );
}
