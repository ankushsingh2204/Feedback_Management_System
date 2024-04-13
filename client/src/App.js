import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Pages/Navbar";
import Home from "./Components/Pages/Home";
import StudentLogin from "./Components/Students/StudentLogin";
import Adminlogin from "./Components/Administration/Login/Adminlogin";
import StudentRegister from "./Components/Students/StudentRegister";
import Feedback from "./Components/Students/Feedback";
import AdminHome from "./Components/Administration/Home/AdminHome";
import AddTeacher from "./Components/Administration/Teacher/AddTeacher";
import RemoveTeacher from "./Components/Administration/Teacher/RemoveTeacher";
import Removepage from "./Components/Administration/Teacher/Removepage";
import ReportOne from "./Components/Administration/Reports/ReportOne";
import ErrorPage from "./Components/Pages/ErrorPage";
import PrivateComponent from "./Components/Pages/PrivateComp";
import Footer from "./Components/Pages/Footer";
import ChangePassword from "./Components/Administration/Teacher/ChangePassword";
import TeacherLogin from "./Components/Administration/Teacher/TeacherLogin";
import TeacherFeedback from "./Components/Administration/Teacher/TeacherFeedback";
// import ReportAll from "./Components/Administration/Reports/ReportAll";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/studentregister" element={<StudentRegister />} />
          <Route path="/teacherLogin" element={<TeacherLogin />} />

          <Route element={<PrivateComponent />}>
            <Route exact={true} path="/feedback" element={<Feedback />} />
            <Route path="/removeTeacher" element={<RemoveTeacher />} />
            <Route path="/teacherFeedbackPage" element={<TeacherFeedback/>} />
            <Route path="/reportOneTeacher" element={<ReportOne />} />
            <Route path="/removepage" element={<Removepage />} />
            <Route path="/addTeacher" element={<AddTeacher />} />
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/changePassword" element={<ChangePassword />} />

            {/* <Route path="/reportall" element={<ReportAll />} /> */}
          </Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
