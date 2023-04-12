import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../reposition/reposition.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Reposition() {
  const [position, setPosition] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [signatures, setSignatures] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [respo, setRespo] = useState("");
  const navigate = useNavigate();
  const [sliceIndex, setSliceIndex] = useState(0);
  const sliceSize = 5;
  const user = useSelector((state) => state.list.userInfo);
  const nextSlice = () => {
    const nextIndex = sliceIndex + sliceSize;
    if (nextIndex >= resp.length) {
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
  const resp = {
    position: position,
    time: time,
    date: date,
    comment: comment,
    signatures: `${user.firstName} ${user.lastName}`,
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
        `${process.env.REACT_APP_BE_URL}/resposition/${id}/resp`,
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
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReposition = async () => {
    try {
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/resposition/patient/${id}`
      );
      if (url.ok) {
        const response = await url.json();
        setRespo(response);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchReposition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Card className="FoodchatCard mt-4">
        <Card.Header as="h5" className="text-center">
          <h3 className="foodTitle">
            {" "}
            Daily Repositioning & Skin inspection Chart
          </h3>
        </Card.Header>
        <Card.Body>
          <div>
            <ul>
              <li>
                This review focuses on identifying the most appropriate position
                for people who are at risk of developing a pressure ulcer, in
                order to reduce or relieve the pressure and prevent the
                development of a pressure ulcer.
              </li>
              <li>
                The review also aims to identify the optimum frequency at which
                people should be repositioned.
              </li>
              <li>
                The aims of repositioning are to reduce or relieve the pressure
                on the area at risk, maintain muscle mass and general tissue
                integrity and ensure adequate blood supply to the at risk area
              </li>
            </ul>
          </div>
        </Card.Body>
      </Card>

      <div id="personalBtn">
        <Link onClick={() => navigate(-1)} className="Link">
          <span className="previousBtn">
            <AiOutlineArrowLeft />
            Previous
          </span>
        </Link>
        <Link
          to={`/personalcare/${id}`}
          onClick={() => navigate(`/personalcare/${id}`)}
          className="Link"
        >
          <span className="previousBtn">
            <AiOutlineArrowRight />
            Next
          </span>
        </Link>
      </div>
      <div className="resposition-field mt-2">
        <div className="imgContainer">
          <img
            className="rep-image"
            src="https://cdn.ps.emap.com/wp-content/uploads/sites/3/2020/01/Fig-1-Areas-at-greatest-risk-of-pressure-damage-720x1024.jpg"
            alt="resposition logo"
          />
        </div>
        <div className="rep-form-cont">
          <Form className="respForm mt-2">
            <h3>Record Position</h3>
            <div className="foodFormWrapper">
              <Form.Group className="form-group">
                <Form.Label className="FormLabel">Date</Form.Label>
                <Form.Control
                  className="inputField"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label className="FormLabel">Time</Form.Label>
                <Form.Control
                  className="inputField"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="foodFormWrapper">
              <Form.Group className="form-group">
                <Form.Label className="FormLabel">Position</Form.Label>
                <select
                  className="select inputField"
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
                  id="respTextarea"
                  className="inputField"
                  as="textarea"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
            </div>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Signature</Form.Label>
              <Form.Control
                className="inputField"
                type="text"
                value={`${user.firstName} ${user.lastName}`}
                onChange={(e) => setSignatures(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className="respBtn foodchartBtn mb-3">
            <Button
              id="submitAdmissionBtn"
              type="submit"
              onClick={postRepostion}
            >
              Submit
            </Button>
            <span className="ViewBtn">
              <Button id="submitAdmissionBtn" onClick={handleClick}>
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
                <th>Position</th>
                <th>Comment</th>
                <th>Signatures</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan="6">
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
              {respo
                .map((c) => (
                  <tr key={c._id}>
                    <td>{c.date}</td>
                    <td> {c.time}</td>
                    <td>{c.position}</td>
                    <td>{c.comment}</td>
                    <td>{c.signatures}</td>
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
