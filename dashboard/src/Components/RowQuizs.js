import { React, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

function RowQuizs(props) {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const OnDelete = (id__) => {
    if (window.confirm("vous êtes sur ?")) {
      axios
        .delete(`http://localhost:8000/dashboard/quizs/${id__}`)
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
      <td>{props.name}</td>
      <td>{props.instructions}</td>
      <td>{props.questions.length}</td>
      <td>{props.expiry}</td>
      <td className="gap__actions">
        <span>
          <Link to={`/quizs/${props.Id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-eye-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
          </Link>
        </span>
        <br />
        <span onClick={() => OnDelete(props.Id)}>
          <FaIcons.FaTrashAlt />
        </span>
      </td>
    </tr>
  );
}

export default RowQuizs;
