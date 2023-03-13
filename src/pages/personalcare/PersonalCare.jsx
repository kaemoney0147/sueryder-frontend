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
  const id = params.id;
  console.log({ id });
  const [care, setCare] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [caregive, setCaregive] = useState("");
  const [givenby, setGivenby] = useState("");
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(!showContent);
  };

  const fetchCare = async () => {
    try {
      const url = await fetch(
        `http://localhost:3001/personalcare/patient/${id}`
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
        body: JSON.stringify({
          caregive,
          date,
          time,
          givenby,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(
        `http://localhost:3001/personalcare/${id}`,
        options
      );
      if (url.ok) {
        alert("You have successfully save care for the patient");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };
  return (
    <>
      <Container>
        <div className="personcare-maincontainer">
          <div className="personalcare-textarea">
            <Form onSubmit={handleSubmit}>
              <Form.Label>
                <h1>Clinical Daily Journal</h1>
                <p>Name:{care.firstName}</p>
                <p>Date of Birth:</p>
              </Form.Label>

              <div className="personalBtn">
                <span className="previousBtn">
                  <AiOutlineArrowLeft onClick={() => navigate(-1)} />
                </span>
                <span>
                  <AiOutlineArrowRight />
                </span>
              </div>

              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                placeholder="DD/MM/YY"
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
              <Form.Control
                as="textarea"
                style={{
                  height: "400px",
                }}
                required
                value={caregive}
                onChange={(e) => setCaregive(e.target.value)}
              />
              <Form.Group>
                <Form.Label>Carers</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name of carers"
                  required
                  value={givenby}
                  onChange={(e) => setGivenby(e.target.value)}
                />
              </Form.Group>
              <div className="view-personalcare">
                <Button className="mt-2" type="submit">
                  Submit
                </Button>
                <Button
                  className="btn"
                  onClick={() => {
                    handleClick();
                  }}
                >
                  View
                </Button>
              </div>
            </Form>
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
                <th>Personal Care Given</th>

                <th>Carers</th>
              </tr>
            </thead>
            <tbody>
              {care.reverse().map((c) => (
                <tr key={c._id}>
                  <td>{c.date}</td>
                  <td> {c.time}</td>
                  <td>{c.caregive}</td>
                  <td>{c.givenby}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}
