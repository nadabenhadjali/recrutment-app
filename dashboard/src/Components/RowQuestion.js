import React from "react";
import { Link } from "react-router-dom";

function RowQuestion(props) {
  return (
    <tr>
      <th>{props.description}</th>
      <td>{props.answer}</td>

      <td>{props.correct_answer}</td>

      <td className="gap__actions">
        <span>
          <Link to={`/questions/${props.Id}`} className="text-white">
            <li className="fas fa-edit"></li>
          </Link>
        </span>

        <span onClick={() => props.OnDelete(props.Id)}>
          <li className="fas fa-trash-alt"></li>
        </span>
      </td>
    </tr>
  );
}

export default RowQuestion;
