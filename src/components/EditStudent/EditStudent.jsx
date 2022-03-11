import React, { Component } from "react";
import './EditStudent.css';
import axios from "axios";
import { withRouter } from 'react-router'
import { toast, ToastContainer } from "react-toastify";

class EditStudent extends Component {
  state = {
    _id: '',
    idS: "",
    name: "",
    resumeref: "",
    functionName: "",
    yearsofexp: "",
    availability: "",
    date: "",
    skills: "",
    response: ""
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  async componentDidMount() {
    try {
      let search = this.props.location.search,
        idStudent = search.substring(1, search.length);
      console.log('id EDIT', idStudent);
      const updateStudent = await axios(`http://localhost:5000/api/students/${idStudent}`);
      console.log('updateStudent', updateStudent);
      const { _id, idS, name, resumeref, functionName, yearsofexp, availability, date, skills } = updateStudent.data.student;
      console.log('response', updateStudent.data.student);
      this.setState({ _id, idS, name, resumeref, functionName, yearsofexp, availability, date, skills });
    } catch (err) {
      this.setState({ response: "Student not found!" })
    }
  };

  updateStudentHandler = async (e) => {
    e.preventDefault();
    try {
      const student = await axios.put(`http://localhost:5000/api/students/${this.state._id}`, {
        idS: this.refs.idS.value,
        name: this.refs.name.value,
        resumeref: this.refs.resumeref.value,
        functionName: this.refs.functionName.value,
        yearsofexp: this.refs.yearsofexp.value,
        availability: this.refs.availability.value,
        dateS: this.refs.dateS.value,
        skills: this.refs.skills.value,
      });
      toast(student.data.message, { type: toast.TYPE.INFO, autoClose: 3000 });

    } catch (err) {
      toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    if (this.state.response === "Student not found!")
      return <h1>Student not found!</h1>
    return (
      <div className="Edit-Student-Wrapper">
        <h1>Edit page</h1>
        <form onSubmit={this.updateStudentHandler}>
          <label htmlFor="idS">ID:</label>
          <input
            type="text"
            name="idS"
            ref="idS"
            className="Edit-Student-Input"
            onChange={this.onChangeHandler}
            value={this.state.idS}
            required
            id="idS"
          />

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            ref="name"
            className="Edit-Student-Input"
            onChange={this.onChangeHandler}
            value={this.state.name}
            required
            id="name"
          />

          <label htmlFor="resumeref">Resume ref: </label>
          <input
            type="text"
            name="resumeref"
            ref="resumeref"
            className="Edit-Student-Input"
            onChange={this.onChangeHandler}
            value={this.state.resumeref}
            required
            id="resumeref"
          />

          <label htmlFor="functionName">Function: </label>
          <input
            type="text"
            name="functionName"
            ref="functionName"
            className="Edit-Student-Input"
            onChange={this.onChangeHandler}
            value={this.state.functionName}
            required
            id="functionName"
          />

          <label htmlFor="yearsofexp">Years of experience: </label>
          <input
            type="number"
            name="yearsofexp"
            ref="yearsofexp"
            className="Edit-Student-Input"
            onChange={this.onChangeHandler}
            value={this.state.yearsofexp}
            required
            id="yearsofexp"
          />

          <label htmlFor="availability">Availability in days: </label>
          <input
            type="number"
            name="availability"
            ref="availability"
            className="Edit-Student-Input"
            onChange={this.onChangeHandler}
            value={this.state.availability}
            required
            id="availability"
          />

          <label htmlFor="dateS">Date: </label>
          <input
            type="date"
            name="dateS"
            ref="dateS"
            className="Edit-Student-Input"
            onChange={this.onChangeHandler}
            value={new Date(this.state.dateS)}
            required
            id="dateS"
          />


          <label htmlFor="skills">Skills: </label>
          <input
            type="text"
            className="Edit-Student-Input"
            onChange={this.onChangeHandler}
            value={this.state.skills}
            name="skills"
            ref="skills"
            required
            id="skills"
          />

          <button type="submit" className="Edit-Student-Submit fa fa-pencil"></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(EditStudent);
