import { React, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as CgIcons from "react-icons/cg";

function RowQuizs(props) {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const OnDelete = (id__) => {
    if (window.confirm("vous êtes sur ?")) {
      axios
        .delete(`http://localhost:8000/dashboard/candidats/${id__}`)
        .then((res) => {
          setMessage(res.data.message);
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 4000);
        });
    }
  };
  return (
    <tr>
      <th>{props.name}</th>
      <td>{props.instructions}</td>
      <td>{props.questions.length}</td>
      <td>
        <span>
          <Link to={`/quizs/${props.Id}`} className="text-white"></Link>
        </span>
      </td>

      <td className="gap__actions">
        <span>
          <Link to={`/quizs/${props.Id}`} className="text-white">
            <CgIcons.CgArrowRightO
              style={{
                color: "black",
              }}
            />
          </Link>
        </span>

        <span onClick={() => OnDelete(props.Id)}>
          <li className="fas fa-trash-alt"></li>
        </span>
      </td>
    </tr>
  );
}

export default RowQuizs;
