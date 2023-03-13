import React, { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../reposition/reposition.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Reposition() {
  const [position, setPosition] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [signatures, setSignatures] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [respo, setRespo] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setShowContent(!showContent);
  };
  const resp = {
    position: position,
    time: time,
    date: date,
    comment: comment,
    signatures: signatures,
  };

  const param = useParams();
  const id = param.id;
  const postRepostion = async (e) => {
    e.preventDefault();
    try {
      let options = {
        method: "POST",
        body: JSON.stringify(resp),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(
        `http://localhost:3001/resposition/${id}/resp`,
        options
      );
      if (url.ok) {
        console.log("Patient Repostion save successfully");
        setComment("");
        setDate("");
        setPosition("");
        setTime("");
        signatures("");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };

  const fetchReposition = async () => {
    try {
      const url = await fetch(
        `http://localhost:3001/resposition/patient/${id}`
      );
      if (url.ok) {
        const response = await url.json();
        console.log(response);
        setRespo(response);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchReposition();
  }, []);
  return (
    <Container>
      <div>
        <div className="food-h1">
          <h1 className="foodTitle">
            Daily Repositioning & Skin inspection Chart
          </h1>
        </div>
        <div className="food-note">
          <ul className="foodchartListItem">
            <li>Inspect the skin for evidence of change.</li>
            <li>Re-assess as every positional change & document below.</li>
            <li>
              Use manual handling aids to mimimise the risk of friction and
              shear.
            </li>
          </ul>
        </div>
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
      <div className="resposition-field mt-5">
        <div className="imgContainer">
          <img
            className="rep-image"
            src="https://cdn.ps.emap.com/wp-content/uploads/sites/3/2020/01/Fig-1-Areas-at-greatest-risk-of-pressure-damage-720x1024.jpg"
            alt="resposition logo"
          />
        </div>
        <div className="rep-form-cont">
          <Form className="respForm">
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Time</Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Position</Form.Label>
              <select
                className="select"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option>Select</option>
                <option>Back</option>
                <option>Left</option>
                <option>Right</option>
              </select>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Comment</Form.Label>
              <Form.Control
                as="textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Signature</Form.Label>
              <Form.Control
                type="text"
                value={signatures}
                onChange={(e) => setSignatures(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className="respBtn">
            <Button
              className="submitAdmissionBtn"
              type="submit"
              onClick={postRepostion}
            >
              Submit
            </Button>
            <span>
              <Button className="submitAdmissionBtn" onClick={handleClick}>
                View
              </Button>
            </span>
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
                <th>Position</th>
                <th>Comment</th>
                <th>Signatures</th>
              </tr>
            </thead>
            <tbody>
              {respo.reverse().map((c) => (
                <tr key={c._id}>
                  <td>{c.date}</td>
                  <td> {c.time}</td>
                  <td>{c.position}</td>
                  <td>{c.comment}</td>
                  <td>{c.signatures}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}
