import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./component/home/Home";
import NavBar from "./component/navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientDetails from "./pages/patientdetails/PatientDetails";
import FoodChart from "./pages/foodchart/FoodChart";
import FluidChart from "./pages/fluidchart/FluidChart";
import PersonalCare from "./pages/personalcare/PersonalCare";
import BowelChart from "./pages/bowelchart/BowelChart";
import VitalExamination from "./pages/vitalexamination/VitalExamination";
import Reposition from "./pages/reposition/Reposition";
import BodyMap from "./pages/bodymap/BodyMap";
import Login from "./component/login/Login";
import { useSelector } from "react-redux";

function App() {
  const userData = useSelector((state) => state.list.userInfo);
  return (
    <BrowserRouter>
      {userData && userData._id ? <NavBar /> : ""}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
        <Route path="/foodchart/:id" element={<FoodChart />} />
        <Route path="/fluidchart/:id" element={<FluidChart />} />
        <Route path="/personalcare/:id" element={<PersonalCare />} />
        <Route path="/bowelchart/:id" element={<BowelChart />} />
        <Route path="/vital/:id" element={<VitalExamination />} />
        <Route path="/reposition/:id" element={<Reposition />} />
        <Route path="/bodymap/:id" element={<BodyMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
