import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import Student from "../../components/Student/Student";
import SearchStudents from "../../components/SearchStudent/SearchStudents";

class Home extends Component {
  state = {
    data: null,
    allStudents: null,
    error: ""
  };

  async componentDidMount() {
    try {
      const students = await axios("https://sofia-app-backend.herokuapp.com/api/students/");
      console.log('students', students);
      this.setState({ data: students.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  // removeStudent = async id => {
  //   try {
  //     // const studentRemoved = await axios.delete(`/api/students/${id}`);
  //     const students = await axios("/api/students/");
  //     this.setState({ data: students.data });
  //   } catch (err) {
  //     this.setState({ error: err.message });
  //   }
  // };

  //search based on the name
  searchStudents = async username => {
    let allStudents = [...this.state.data.students];
    if (this.state.allStudents === null) this.setState({ allStudents });

    let students = this.state.data.students.filter((element) => {
      return element.idS.toLowerCase().includes(username.toLowerCase())
        || element.name.toLowerCase().includes(username.toLowerCase())
        || element.resumeref.toLowerCase().includes(username.toLowerCase())
        || element.functionName.toLowerCase().includes(username.toLowerCase())
        // || element.yearsofexp.toLowerCase().includes(username.toLowerCase())
        || element.availability.toLowerCase().includes(username.toLowerCase())
        || element.skills.toLowerCase().includes(username.toLowerCase())

    }
      // ({idS}) => idS.toLowerCase().includes(username.toLowerCase()), ({name}) => name.toLowerCase().includes(username.toLowerCase())
    );
    if (students.length > 0) this.setState({ data: { students } });

    if (username.trim() === "")
      this.setState({ data: { students: this.state.allStudents } });
  };

  render() {
    let students;

    if (this.state.data)
      students =
        this.state.data.students &&
        this.state.data.students.map(student => (
          <Student key={student._id} {...student} />
        ));
    else return <div className="Spinner-Wrapper"> <PropagateLoader color={'#333'} /> </div>;

    if (this.state.error) return <h1>{this.state.error}</h1>;
    if (this.state.data !== null)
      if (!this.state.data.students.length)
        return <h1 className="No-Students">No recrods found!</h1>;

    return (
      <div className="Table-Wrapper">

        <SearchStudents searchStudents={this.searchStudents} />
        {students ?
          <>
            <h1>List:</h1>
            <table className="Table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Resume ref</th>
                  <th>Function</th>
                  <th>Years of experience</th>
                  <th>Availability in days</th>
                  <th>Date</th>
                  <th>Skills</th>
                </tr>
              </thead>
              <tbody>{students}</tbody>
            </table> </> : <div></div>}
      </div>
    );
  }
}

export default Home;
