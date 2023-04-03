import "../observation/observation.css";
import { Button, Card, Container, Form } from "react-bootstrap";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Observation() {
  const navigate = useNavigate();
  const params = useParams();
  const [patient, setPatient] = useState([]);

  const userId = params.id;
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
    <Container className="observation">
      <div className="obsWrapper">
        <Card className="FoodchatCard mt-4">
          <Card.Header as="h5" className="text-center">
            <h3 className="foodTitle">
              Observation Form For Resident "AT RISK"
            </h3>
          </Card.Header>
          <Card.Body>
            <div>
              <ul>
                <li>
                  All residents must be checked as prescribed in accordance with
                  their use of bed rails risk score whenever they are in bed
                </li>
                <li>
                  Please indicate as approriate the resident's risk score and
                  corresponding timely observation as prescribed
                </li>
                <li>
                  Selectn the word that describes the resident's observed state.
                </li>
                <li>
                  Describe other details-if details compromise safety- re-assess
                  risk assessment
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
            <AiOutlineArrowRight />
            Next
          </span>
        </div>
        <div className="ObsInfo">
          <div className="obsLeft">
            <div className="patiendetails">
              Name: {patient.title} {patient.firstName} {patient.lastName}
              <p className="mb-0">Room NO: {patient.room}</p>
              <p>Ward: {patient.ward}</p>
            </div>
            <img src={patient.image} alt="" className="obsPatientImage" />
          </div>
          <div className="obsRight">
            <h3>Record Observation</h3>
            <Form id="form" className="obsForm">
              <div className="foodFormWrapper">
                <Form.Group controlId="formGridState">
                  <Form.Label className="FormLabel ">Residual Risk </Form.Label>
                  <select
                    className="foodSelect inputField"
                    //   value={timeofday}
                    //   onChange={(e) => setTimeofday(e.target.value)}
                    //   required
                  >
                    <option>High</option>
                    <option>Significant</option>
                    <option>Insignificant</option>
                  </select>
                </Form.Group>
                <Form.Group controlId="formGridState">
                  <Form.Label className="FormLabel ">Frequency </Form.Label>
                  <select
                    className="foodSelect inputField"
                    //   value={timeofday}
                    //   onChange={(e) => setTimeofday(e.target.value)}
                    //   required
                  >
                    <option>15minutes</option>
                    <option>30minutes</option>
                    <option>45minutes</option>
                    <option>1Hourly</option>
                    <option>2Hourly</option>
                  </select>
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">Date</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="date"
                    //   value={date}
                    //   placeholder="DD/MM/YY"
                    //   onChange={(e) => setDate(e.target.value)}
                    //   required
                  />
                </Form.Group>
                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel ">Time</Form.Label>
                  <Form.Control
                    className="inputField"
                    type="time"
                    placeholder="Time"
                    //   value={time}
                    //   onChange={(e) => setTime(e.target.value)}
                    //   required
                  />
                </Form.Group>
              </div>
              <div className="foodFormWrapper">
                <Form.Group controlId="formGridState">
                  <Form.Label className="FormLabel ">
                    Observed State{" "}
                  </Form.Label>
                  <select
                    className="foodSelect inputField"
                    //   value={timeofday}
                    //   onChange={(e) => setTimeofday(e.target.value)}
                    //   required
                  >
                    <option>Quiet</option>
                    <option>Restless</option>
                    <option>Asleep</option>
                    <option>Awake</option>
                  </select>
                </Form.Group>

                <Form.Group className="form-group mb-0">
                  <Form.Label className="FormLabel">Others</Form.Label>
                  <Form.Control
                    id="obsTextarea"
                    className="inputField"
                    as="textarea"
                    placeholder="Please give details"
                    // value={comment}
                    // onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
              </div>
              <Form.Group className="form-group mb-0">
                <Form.Label className="FormLabel">Signature</Form.Label>
                <Form.Control
                  className="inputField"
                  type="text"
                  // value={signatures}
                  // onChange={(e) => setSignatures(e.target.value)}
                />
              </Form.Group>
            </Form>
            <div className="foodchartBtn">
              <Button
                id="submitAdmissionBtn"
                type="submit"
                // onClick={handleSubmit}
              >
                Submit
              </Button>
              <span className="ViewBtn">
                <Button
                  id="submitAdmissionBtn"
                  type="submit"
                  //   onClick={handleClick}
                >
                  View Chart
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
