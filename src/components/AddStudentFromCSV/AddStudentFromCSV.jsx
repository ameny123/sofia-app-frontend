import React, { Component } from "react";
import './AddStudent.css';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddStudents extends Component {
  state = {
    file: "",
    response: ""
  };

  handleOnFileChange = (e) => {
    let file = e.target.files[0];
    console.log('file', file);
    this.setState({
      [e.target.id]: file
    })
  }

  addStudents = async e => {
    e.preventDefault();
    try {
      const newStudent = await axios.post("http://localhost:5000/api/students", {
        file: this.refs.file.value,
      }
      );

      toast("File imported successfully", { type: toast.TYPE.SUCCESS, autoClose: 3000 });
    } catch (err) {
      toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    return (
      <div className="addStudentsFromCSV-Wrapper">
        <h1>Import Student:</h1>
        <form onSubmit={this.addStudents}>
          <label htmlFor="name">CSV File:</label>
          <input
            type="file"
            name="file"
            onChange={this.handleOnFileChange}
            ref="file"
            className="Add-Student-Input"
            required
            id="file"
          />

          <button type="submit" className="Add-Student-Submit fa fa-plus"></button>
          <button type="reset" className="Add-Student-Reset fa fa-refresh"></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default AddStudents;
