import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Table } from "react-bootstrap";
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
      <div className="foodWrapper mb-3">
        <Card className="FoodchatCard mt-4">
          <Card.Header as="h5" className="text-center">
            <h3 className="foodTitle">Patient Body Chart</h3>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <ul>
                <li>
                  Please indicate below on the body chart where the patient is
                  and/or brusing (B) or a wound(W) and date or when discontinued
                  suffering from pressure areas(PA)
                </li>
                <li>
                  Please cirlce the area and use the indicated initals to make
                  it clear if this is pressure area (PA),a bruise(B) or
                  wound(W).Please date and initial all circled areas
                </li>
                <li>
                  Please ensure that previously not recorded areas are reported
                  to the nurse in charge or nurse in area as soon as possible
                  and are recorded in the daily journal sheets
                </li>
                <li>
                  If a wound care assesement has not been started please
                  complete one
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
            <AiOutlineArrowRight onClick={() => navigate(`/vital/${userId}`)} />
            Next
          </span>
        </div>
        <div className="foodChartForm">
          <div className="left">
            <div className="patiendetails">
              <p className="mb-0">Name: SANDRA AKINLOTAN</p>
              <p>Dob: 1989-01-03</p>
            </div>
            <img
              src="https://www.researchgate.net/profile/Lonnie-Zeltzer/publication/51127050/figure/fig1/AS:305778805231623@1449914756894/Suggested-pain-chart-for-studies-of-recurrent-and-chronic-pain-adopted-as-part-of-the_Q320.jpg"
              alt="patient"
              className="foodchart-image mb-3"
            />
          </div>
          <div className="right">
            <h3>Record BodyMap</h3>
            <Form id="form">
              <div className="foodFormWrapper">
                <Form.Group controlId="formGridState">
                  <Form.Label className="FormLabel ">Front </Form.Label>
                  <select
                    className="inputField"
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                  >
                    <option>None</option>
                    <option>Left</option>
                    <option>Right</option>
                  </select>
                </Form.Group>
                <Form.Group controlId="formGridState">
                  <Form.Label className="FormLabel">Back </Form.Label>
                  <select
                    className="inputField"
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                  >
                    <option>None</option>
                    <option>Left</option>
                    <option>Right</option>
                  </select>
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">Date</Form.Label>
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
                  <Form.Label className="FormLabel">Time</Form.Label>
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
                  <Form.Label className="FormLabel">Review Details</Form.Label>
                  <Form.Control
                    className="inputField"
                    id="bodyMapTextarea"
                    as="textarea"
                    placeholder="Body Review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">Carers Name</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Name of person making entry"
                    value={signatures}
                    onChange={(e) => setSignatures(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
            </Form>
            <div className="foodchartBtn mb-3">
              <Button id="submitAdmissionBtn" onClick={postBodyMap}>
                Submit
              </Button>
              <span className="ViewBtn">
                <Button id="submitAdmissionBtn" onClick={handleClick}>
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
