import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import "../foodchart/foodchart.css";
// import { MdArrowForward } from "react-icons/md";
// import { BiArrowBack } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function FoodChart() {
  const [timeofday, setTimeofday] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patient, setPatient] = useState([]);
  const params = useParams();
  const [offered, setOffered] = useState("");
  const [amountaccepted, setAmountaccepted] = useState("");
  const [amountoffered, setAmountoffered] = useState("");
  const [givenby, setGivenby] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [food, setFoood] = useState([]);
  const navigate = useNavigate();
  const [sliceIndex, setSliceIndex] = useState(0);
  const sliceSize = 5;
  const user = useSelector((state) => state.list.userInfo);
  console.log(user);

  const foodInput = {
    timeofday: timeofday,
    date: date,
    time: time,
    offered: offered,
    amountoffered: amountoffered,
    amountaccepted: amountaccepted,
    givenby: user.username,
  };
  const nextSlice = () => {
    const nextIndex = sliceIndex + sliceSize;
    if (nextIndex >= food.length) {
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
    } catch (error) {}
  };
  const fetchFood = async () => {
    try {
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/foodchart/patient/${id}`
      );
      if (url.ok) {
        const response = await url.json();

        setFoood(response);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {}
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
        body: JSON.stringify(foodInput),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/foodchart/${id}`,
        options
      );
      if (url.ok) {
        toast("You have successfully save a food for the patient");
        setAmountoffered("");
        setAmountaccepted("");
        setDate("");
        setGivenby("");
        setTimeofday("");
        setTime("");
        setOffered("");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="foodChart mt-5 ">
      <div className="foodWrapper">
        <Card className="FoodchatCard">
          <Card.Header className="text-center">
            <h3 className="foodTitle">24Hours Food Intake Chart</h3>
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
              onClick={() => navigate(`/fluidchart/${id}`)}
            />
            Next
          </span>
        </div>
        <div className="foodChartForm mb-4">
          <div className="left">
            <div className="patiendetails mb-2">
              Name: {patient.title} {patient.firstName} {patient.lastName}
              <p>Ward: {patient.ward}</p>
            </div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeuFqIfKH9g5j4X6H3HXtpjSa8G8XidNqOA&usqp=CAU"
              alt="patient"
              className="foodchart-image mb-3"
            />
          </div>
          <div className="right">
            <h3>Record Intake</h3>
            <Form id="form" onSubmit={handleSubmit}>
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
                  </select>
                </Form.Group>
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">Date</Form.Label>
                  <Form.Control
                    className="inputField "
                    type="date"
                    value={date}
                    placeholder="DD/MM/YY"
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
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
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">
                    What did you offer?
                  </Form.Label>
                  <Form.Control
                    className="inputField"
                    type="text"
                    placeholder="Type of Food"
                    value={offered}
                    onChange={(e) => setOffered(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">Amount</Form.Label>
                  <select
                    className="inputField foodSelect"
                    value={amountoffered}
                    onChange={(e) => setAmountoffered(e.target.value)}
                    required
                  >
                    <option>Please Select</option>
                    <option>Full Plate</option>
                    <option>Meat Plate</option>
                    <option>Joint Plate</option>
                  </select>
                </Form.Group>
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">Accept</Form.Label>
                  <select
                    className="inputField foodSelect"
                    value={amountaccepted}
                    onChange={(e) => setAmountaccepted(e.target.value)}
                    required
                  >
                    <option>Please Select</option>
                    <option>Refuse</option>
                    <option>Decline</option>
                    <option>All</option>
                    <option>Half</option>
                    <option>Small</option>
                  </select>
                </Form.Group>
              </div>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel ">Signature</Form.Label>
                <Form.Control
                  className="inputField"
                  type="text"
                  placeholder="Carers Name"
                  value={user.username}
                  // onChange={(e) => setGivenby(e.target.value)}
                  required
                />
              </Form.Group>
              <ToastContainer />
            </Form>
            <div className="foodchartBtn mb-4">
              <Button
                id="submitAdmissionBtn"
                type="submit"
                onClick={handleSubmit}
              >
                Save
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
                <th>Offered</th>
                <th>Amount</th>
                <th>Accept</th>
                <th>Givenby</th>
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
              {food
                .map((c) => (
                  <tr key={c._id}>
                    <td>{c.date}</td>
                    <td>{c.time}</td>
                    <td>{c.offered}</td>
                    <td>{c.amountoffered}</td>
                    <td>{c.amountaccepted}</td>
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
