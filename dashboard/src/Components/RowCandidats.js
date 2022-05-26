import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function RowCandidats(props) {
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
      <th>{props.nom}</th>
      <td>{props.prenom}</td>
      <td>{props.email}</td>
      <td>
        <span >
                  <Link to={`/candidats/${props.Id}`} >
                      Click
          </Link>
        </span>
      </td>

      <td className="gap__actions">
        <span onClick={() => OnDelete(props.Id)}>
          <li className="fas fa-trash-alt"></li>
        </span>
      </td>
    </tr>
  );
}

export default RowCandidats