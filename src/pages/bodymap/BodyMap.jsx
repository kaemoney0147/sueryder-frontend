import React, { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import "../bodymap/bodymap.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

export default function BodyMap() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [review, setReview] = useState("");
  const [signatures, setSignatures] = useState("");
  const [bodymap, setBodyMap] = useState([]);
  console.log(bodymap);
  const [showContent, setShowContent] = useState(false);
  const param = useParams();
  const userId = param.id;

  const data = {
    time: time,
    date: date,
    review: review,
    signatures: signatures,
    front: front,
    back: back,
  };

  const handleClick = () => {
    setShowContent(!showContent);
  };
  const postBodyMap = async () => {
    try {
      let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      let response = await fetch(
        `http://localhost:3001/bodymap/${userId}`,
        options
      );
      if (response.ok) {
        alert("You have sucessfully save this patient bodymap");
        setBack("");
        setDate("");
        setFront("");
        setTime("");
        setReview("");
        setSignatures("");
      }
      try {
        const url = await fetch(
          `http://localhost:3001/bodymap/patient/${userId}`
        );
        if (url.ok) {
          const fetchedBodyMap = await url.json();
          setBodyMap(fetchedBodyMap);
        }
      } catch (error) {}
    } catch (error) {}
  };

  useEffect(() => {
    postBodyMap();
  }, []);
  return (
    <Container className="foodChart">
      <div className="foodWrapper">
        <h3 className="foodTitle"> Patient Body Chart</h3>
        <div className="foodListNote">
          <ul className="foodchartListItem">
            <li>
              Please indicate below on the body chart where the patient is
              and/or brusing (B) or a wound(W) and date or when discontinued
              suffering from pressure areas(PA)
            </li>
            <li>
              Please cirlce the area and use the indicated initals to make it
              clear if this is pressure area (PA),a bruise(B) or wound(W).Please
              date and initial all circled areas
            </li>
            <li>
              Please ensure that previously not recorded areas are reported to
              the nurse in charge or nurse in area as soon as possible and are
              recorded in the daily journal sheets
            </li>
            <li>
              If a wound care assesement has not been started please complete
              one
            </li>
          </ul>
        </div>
        <div className="personalBtn">
          <span className="previousBtn">
            <AiOutlineArrowLeft onClick={() => navigate(-1)} />
          </span>
          <span>
            <AiOutlineArrowRight />
          </span>
        </div>
        <div className="foodChartForm mt-5">
          <div className="left">
            <div className="patientDetails">
              <span>Name: SANDRA AKINLOTAN</span>
              <span className="patientDob">Dob: 1989-01-03</span>
            </div>
            <img
              src="https://www.researchgate.net/profile/Lonnie-Zeltzer/publication/51127050/figure/fig1/AS:305778805231623@1449914756894/Suggested-pain-chart-for-studies-of-recurrent-and-chronic-pain-adopted-as-part-of-the_Q320.jpg"
              alt="patient"
              className="foodchart-image"
            />
          </div>
          <div className="right">
            <Form id="form">
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel mb-0">Front </Form.Label>
                <select
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                >
                  <option>None</option>
                  <option>Left</option>
                  <option>Right</option>
                </select>
              </Form.Group>
              <Form.Group controlId="formGridState">
                <Form.Label className="FormLabel mb-0">Back </Form.Label>
                <select value={back} onChange={(e) => setBack(e.target.value)}>
                  <option>None</option>
                  <option>Left</option>
                  <option>Right</option>
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
                  Review Details
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Body Review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel mb-0">Carers Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name of person making entry"
                  value={signatures}
                  onChange={(e) => setSignatures(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="foodchartBtn">
                <Button className="submitAdmissionBtn" onClick={postBodyMap}>
                  Submit
                </Button>
                <span>
                  <Button className="submitAdmissionBtn" onClick={handleClick}>
                    View
                  </Button>
                </span>
              </div>
            </Form>
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
                <th>Front</th>
                <th>Back</th>
                <th>Review</th>
                <th>Signature</th>
              </tr>
            </thead>
            <tbody>
              {bodymap.reverse().map((c) => (
                <tr key={c._id}>
                  <td>{c.date}</td>
                  <td> {c.time}</td>
                  <td>{c.front}</td>
                  <td>{c.back}</td>
                  <td>{c.review}</td>
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
