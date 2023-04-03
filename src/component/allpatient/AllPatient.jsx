import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPatient } from "../../redux/actions/index.js";
import "./allpatient.css";
import { fetchWithQuery } from "../../redux/actions/index.js";
import { BsFilter, BsSearch } from "react-icons/bs";
import { LIST_OF_QUERY } from "../../redux/actions/index.js";
import { MdOutlineFiberNew, MdOutlineBedroomChild } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { GiAges } from "react-icons/gi";
import { FaRestroom } from "react-icons/fa";
import { BsHouseDoor } from "react-icons/bs";
import { GrAlert } from "react-icons/gr";
export default function AllPatient() {
  const querylist = useSelector((state) => state.query.query);
  const dispatch = useDispatch();
  const [codiocte, setCodicote] = useState([]);
  const [digswell, setDigswell] = useState([]);
  const [benington, setBenington] = useState([]);
  const allPatient = useSelector((state) => state.patient.data);
  const [newPatientDays, setNewPatientDays] = useState(7);
  const [displayBadge, setDisplayBadge] = useState(false);

  function getDaysDiff(date1, date2) {
    const oneDay = 12 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
    return diffDays;
  }

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const filterByCodicote = () => {
    const filter = allPatient.filter((item) => item.ward.includes(codiocte));
    dispatch({
      type: LIST_OF_QUERY,
      payload: filter,
    });
  };

  const filterByBenington = () => {
    const filterWard = allPatient.filter((item) =>
      item.ward.includes(benington)
    );
    dispatch({
      type: LIST_OF_QUERY,
      payload: filterWard,
    });
  };

  const filterByDigswell = () => {
    const filters = allPatient.filter((item) => item.ward.includes(digswell));
    dispatch({
      type: LIST_OF_QUERY,
      payload: filters,
    });
  };

  useEffect(() => {
    dispatch(getAllPatient());
  }, []);

  useEffect(() => {
    dispatch(fetchWithQuery(query));
  }, [query]);
  useEffect(() => {
    filterByCodicote();
  }, [codiocte]);
  useEffect(() => {
    filterByDigswell();
  }, [digswell]);
  useEffect(() => {
    filterByBenington();
  }, [benington]);
  useEffect(() => {
    const now = new Date();
    const oneAM = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      1,
      0,
      0
    );

    if (now > oneAM && now < oneAM.setHours(2)) {
      setDisplayBadge(true);
    } else {
      setDisplayBadge(false);
    }
  }, []);
  // const handleClick = () => {
  //   setDisplayBadge(false);
  // };
  // const [patientStates, setPatientStates] = useState([]);

  // useEffect(() => {
  //   // initialize state for all patient cards to false
  //   const initialState = querylist.map(() => false);
  //   setPatientStates(initialState);
  // }, [querylist]);

  // const toggleBadge = (index) => {
  //   // toggle the state for the patient card at the specified index
  //   const newStates = [...patientStates];
  //   newStates[index] = !newStates[index];
  //   setPatientStates(newStates);
  // };
  if (querylist !== 0) {
    return (
      <Container className="allPatientContainer mt-3">
        <Form>
          <div className="searchDiv">
            <div className="filterItem">
              <DropdownButton
                id="filterIcon"
                title={<BsFilter className="icon" />}
                className="dropdown-toggle-no-caret"
              >
                <Dropdown.Item>All</Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setCodicote("Codicote");
                  }}
                >
                  Codicote
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setDigswell("Digswell");
                  }}
                >
                  Digswell
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setBenington("Benington");
                  }}
                >
                  Benington
                </Dropdown.Item>
              </DropdownButton>
            </div>
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={handleChange}
              className="searchInput"
            />

            <BsSearch className="searchIcon" />
          </div>
        </Form>
        <Row xs={1} ms={1} md={2} xl={3} id="patientDiplaysCard">
          {querylist
            .map((p, index) => (
              <Col className="allPatientCol col-4 mb-3" key={index}>
                <Card id="patientlistCard">
                  {getDaysDiff(new Date(p.createdAt), new Date()) <=
                    newPatientDays && (
                    <Badge variant="danger" id="new-patient-badge">
                      <MdOutlineFiberNew className="newAdmissionIcon" />
                    </Badge>
                  )}
                  {/* {displayBadge && <GrAlert className="alertIcon" />} */}

                  <Card.Img src={p.image} className="patient-image" />
                  <Card.Body className="listofpaitent-card">
                    <Card.Title className="patientTitle mb-0">
                      <span className="profileInfoIcon">
                        <IoMdContacts />
                      </span>
                      {p.title} {p.firstName} {p.lastName}
                    </Card.Title>
                    <Card.Text className="patientInfo mb-0">
                      <span className="profileInfoIcon">
                        <FaRestroom />
                      </span>
                      Gender: {p.Gender}
                    </Card.Text>
                    <Card.Text className=" patientInfo mb-0">
                      <span className="profileInfoIcon">
                        <GiAges />
                      </span>
                      Age: {p.age}
                    </Card.Text>
                    <Card.Text className="patientInfo mb-0">
                      <span className="profileInfoIcon">
                        <BsHouseDoor />
                      </span>
                      Ward: {p.ward}
                    </Card.Text>

                    <Card.Text className="patientInfo">
                      <span className="profileInfoIcon">
                        <MdOutlineBedroomChild />
                      </span>
                      Room: {p.room}
                    </Card.Text>
                    <Link to={`/patient/${p._id}`}>
                      <div>
                        <button className="patientList-btn">
                          View Profile
                        </button>
                      </div>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
            .reverse()}
        </Row>
      </Container>
    );
  } else {
    return (
      <Container className="mt-3">
        <Row xs={1} ms={2} md={2} xl={3} id="patientDiplaysCard">
          {allPatient.map((p, index) => (
            <Col className=" allPatientCol col-4 mb-3" key={p._id}>
              <Card className="patientlistCard">
                <Card.Img src={p.image} className="patient-image" />
                <Card.Body className="listofpaitent-card">
                  <Card.Title className="patientTitle mb-0">
                    <span className="profileInfoIcon">
                      <IoMdContacts />
                    </span>
                    {p.title} {p.firstName} {p.lastName}
                  </Card.Title>
                  <Card.Text className="patientInfo mb-0">
                    <span className="profileInfoIcon">
                      <FaRestroom />
                    </span>
                    Gender: {p.Gender}
                  </Card.Text>
                  <Card.Text className=" patientInfo mb-0">
                    <span className="profileInfoIcon">
                      <GiAges />
                    </span>
                    Age: {p.age}
                  </Card.Text>
                  <Card.Text className="patientInfo mb-0">
                    <span className="profileInfoIcon">
                      <BsHouseDoor />
                    </span>
                    Ward: {p.ward}
                  </Card.Text>

                  <Card.Text className="patientInfo">
                    <span className="profileInfoIcon">
                      <MdOutlineBedroomChild />
                    </span>
                    Room: {p.room}
                  </Card.Text>
                  <Link to={`/patient/${p._id}`}>
                    <div>
                      <button className="patientList-btn">View Profile</button>
                    </div>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* <button onClick={loadMoreData}>Load More</button> */}
      </Container>
    );
  }
}
