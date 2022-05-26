import React from "react";
import { Link } from "react-router-dom";

function RowSubjects(props) {
  return (
    <tr>
      <th>{props.name}</th>
     

      <td className="gap__actions">
       
        <span
          onClick={() => props.OnDelete(props.Id)}
        >
          <li className="fas fa-trash-alt"></li>
        </span>
      </td>
    </tr>
  );
}

export default RowSubjects;
