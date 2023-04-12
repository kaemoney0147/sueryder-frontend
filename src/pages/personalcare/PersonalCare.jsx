import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../personalcare/personalcare.css";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function PersonalCare() {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;
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
  const user = useSelector((state) => state.list.userInfo);

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
    caregive: `${user.firstName} ${user.lastName}`,
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
        `${process.env.REACT_APP_BE_URL}/personalcare/patient/${userId}`
      );
      if (url.ok) {
        const response = await url.json();
        setCare(response);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {
      console.log(error);
    }
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
        `${process.env.REACT_APP_BE_URL}/personalcare/${userId}`,
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
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserbyId = async () => {
    try {
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/patient/${userId}`
      );
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
  useEffect(() => {
    fetchUserbyId();
  }, []);
  return (
    <>
      <Container>
        <div className="personcare-maincontainer mb-3 mt-4">
          <div className="personalcare-textarea">
            <div className="personcareInfo">
              <h1>Daily Clinical Journal</h1>
              <p>
                Name: {patient.title} {patient.firstName} {patient.lastName}
              </p>
              {/* <p>Date of Birth: {patient.dob}</p> */}
              <p>Ward: {patient.ward}</p>
            </div>

            <div id="personalBtn">
              <Link onClick={() => navigate(-1)} className="Link">
                <span className="previousBtn">
                  <AiOutlineArrowLeft />
                  Previous
                </span>
              </Link>
              <Link
                to={`/observation/${userId}`}
                onClick={() => navigate(`/observation/${userId}`)}
                className="Link"
              >
                <span className="previousBtn">
                  <AiOutlineArrowRight />
                  Next
                </span>
              </Link>
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
                  value={`${user.firstName} ${user.lastName}`}
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
                  View Chart
                </Button>
              </span>
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
                  <th>Person care</th>
                  <th>Day Checks</th>
                  <th>Night Checks</th>
                  <th>Carer</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <td colSpan="6">
                    <div className="links">
                      <a onClick={prevSlice} className="tableBtn">
                        &laquo;
                      </a>{" "}
                      <a class="active" href="#">
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
                {care
                  .map((c) => (
                    <tr key={c._id}>
                      <td>{c.date}</td>
                      <td> {c.time}</td>
                      <td>{c.caregive}</td>
                      <td>{c.daychecks}</td>
                      <td>{c.nightchecks}</td>
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
    </>
  );
}
