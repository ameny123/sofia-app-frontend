import React from 'react';
import './Student.css';
import { Link } from 'react-router-dom';


const Student = ({ _id, idS, name, resumeref, functionName, yearsofexp, availability, date, skills, removeStudent  }) => {

  return (
    <tr>
      <td>{idS}</td>
      <td>{name}</td>
      <td>{resumeref}</td>
      <td>{functionName}</td>
      <td>{yearsofexp}</td>
      <td>{availability}</td>
      <td>{date}</td>
      <td>{skills}</td>
      
      <td>
        <button onClick={() => removeStudent(_id)} className="Action-Button fa fa-trash"></button>
        <Link to={{ pathname: '/edit', search: _id }}>
          <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>

    </tr>
  );
};

export default Student;
