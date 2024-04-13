import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TryComponent() {
  const [department, setDepartment] = useState();
  const [teacher, setTeacher] = useState();
  const [subject, setSubject] = useState();

//   useEffect(() => {
//     const handleDropDown = async () => {
//       try {
//         const departmentResponse = await axios.post(
//           "http://localhost:4000/getTeacherName"
//         );
//         setDepartments(departmentResponse.data);
//         // console.log(departmentResponse.data);

//         let data 
//         departments.map((item) => {
//             console.log(item.department);
//             setDepartmentsdata(item.department);
//         });

//         // Assuming teachers data endpoint is "/teachers", adjust it as per your backend API
//         const teachersResponse = await axios.post(
//           "http://localhost:4000/getTeacherName"
//         );
//         setTeacherdepartments(teachersResponse.data);
//         console.log(teachersResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     handleDropDown();
//   }, []);

//   -------------------------------------------------------------------------------
const [dep , setDep] = useState();
const [departmentsAndTeachers, setDepartmentsAndTeachers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:4000/getTeacherName");
        setDepartmentsAndTeachers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // departmentsAndTeachers.map((item)=>{
    //     handleDropDown(item.department);
    // })
  }, []);

  const handleDropDown = (department) => {
    const selectedDept = departmentsAndTeachers.find((item) => item.department === department);
    const teachers = selectedDept.map((dept)=> dept.teachers).flat();

    setSelectedDepartment(department);
    setTeacherByDepartment(teachers)
    console.log("hello->  "+selectedDepartment);
    setSelectedTeacher(""); // Reset selected teacher when department changes
  };

  const handleGetReport = async () => {
    // Your logic to handle getting the report
  }


  //   ------------------Geting Teacher Name ----------------------------------
  const [name, setName] = useState();

  //   const handleDropDown = async () => {
  //     let result = await axios.post("http://localhost:4000/getTeacherName");
  //     setName(result.data);
  //   };

  // ----------------------------------------- JSX ------------------------------
  return (
    <div className="showreportpage  container">
      <h3 className="studentheading">Report</h3>
      <div className="row">
        <div className="col-6 oneout">
          <select
            name="teacher"
            id="teacher"
            className="inputBox"
            // onChange={(e) => {
            //   setDepartment(e.target.value);
            // }}
            onChange={(e)=>{
                handleDropDown(e.target.value)
                setDep(e.target.value)
            }}
            // value={selectedDepartment}
          >
            <option value="none" selected disabled hidden>
              Select Department
            </option>
            {departmentsAndTeachers.map((item)=>{
                <option key={item.department} value={item.department}>{item.department}</option>
            })}
            {/* {name &&
              name.map((item) => (
                <option
                  onChange={(e) => {
                    setDep(e.target.value);
                  }}
                >
                  {item.department}
                </option>
              ))} */}
          </select>
          <select
            name="teacher"
            className="inputBox"
            id="teacher"
            onChange={(e) => {
              setTeacher(e.target.value);
            }}
          >
            <option value="none" selected disabled hidden>
              Select Teachers
            </option>
            {name && name.map((item) => <option>{item.name}</option>)}
          </select>
          <select
            name="subject"
            className="inputBox"
            id="subject"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          >
            <option value="none" selected disabled hidden>
              Select Subject
            </option>
            <option value="Java">Java</option>
            <option value="CPP">CPP</option>
            <option value="web">Web Dev</option>
            <option value="Data Base">Data Base</option>
          </select>

          <div>
            <button
              className="inputBox studentButton"
              //   onClick={handleGetReport}
            >
              Get Report
            </button>
          </div>
          <div>
            <Link className="inputBox studentButton" to="/adminHome">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TryComponent;
