import React, { Component } from "react";
import './AddStudent.css';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddStudent extends Component {
  state = {
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


  addStudent = async e => {

    e.preventDefault();
    console.log('e', e)
    try {
      const newStudent = await axios.post("/api/students/", {
        idS: this.refs.idS.value,
        name: this.refs.name.value,
        resumeref: this.refs.resumeref.value,
        functionName: this.refs.functionName.value,
        yearsofexp: this.refs.yearsofexp.value,
        availability: this.refs.availability.value,
        dateS: this.refs.dateS.value,
        skills: this.refs.skills.value,
        resume: this.refs.resume.value
      }
      );
      console.log('newStudent', newStudent);

      toast("Created successfully", { type: toast.TYPE.SUCCESS, autoClose: 3000 });
    } catch (err) {
      toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    return (
      <div className="AddStudent-Wrapper">
        <h1>Add Student:</h1>
        <form onSubmit={this.addStudent}>
          <label htmlFor="idS">ID:</label>
          <input
            type="text"
            placeholder="Enter the ID here"
            name="idS"
            ref="idS"
            className="Add-Student-Input"
            required
            id="idS"
          />

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Enter the name here"
            name="name"
            ref="name"
            className="Add-Student-Input"
            required
            id="name"
          />

          <label htmlFor="resumeref">Resume ref: </label>
          <input
            type="text"
            name="resumeref"
            placeholder="Resume reference"
            ref="resumeref"
            className="Add-Student-Input"
            required
            id="resumeref"
          />

          <label htmlFor="functionName">Function: </label>
          <input
            type="text"
            placeholder="Job title"
            name="functionName"
            ref="functionName"
            className="Add-Student-Input"
            required
            id="functionName"
          />

          <label htmlFor="yearsofexp">Years of experience: </label>
          <input
            type="number"
            placeholder="0 to 10"
            name="yearsofexp"

            ref="yearsofexp"
            className="Add-Student-Input"
            required
            id="yearsofexp"
          />

          <label htmlFor="availability">Availability in days: </label>
          <input
            type="number"
            placeholder="0 to 120"
            name="availability"

            ref="availability"
            className="Add-Student-Input"
            required
            id="availability"
          />

          <label htmlFor="dateS">Date: </label>
          <input
            type="date"
            placeholder="0 to 120"
            name="dateS"

            ref="dateS"
            className="Add-Student-Input"
            required
            id="dateS"
          />


          <label htmlFor="skills">Skills: </label>
          <input
            type="text"
            placeholder="Skills sepertaed by ;"
            name="skills"
            ref="skills"
            className="Add-Student-Input"
            required
            id="skills"
          />

          <label htmlFor="resume">Resume: </label>
          <input
            type="file"
            placeholder="upload resume"
            name="resume"
            ref="resume"
            className="Add-Student-Input"
            required
            id="resume"
          />

          <button type="submit" className="Add-Student-Submit fa fa-plus"></button>
          <button type="reset" className="Add-Student-Reset fa fa-refresh"></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default AddStudent;
