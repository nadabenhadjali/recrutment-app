import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as CgIcons from "react-icons/cg";
function RowOffers(props) {
   const [message, setMessage] = useState("");
   const [show, setShow] = useState(false);
    const OnDelete = (id__) => {
      if (window.confirm("are you sure to delete this offer")) {
        axios
          .delete(`http://localhost:8000/dashboard/offres/${id__}`)
          .then((res) => {
            setMessage("vous-êtes sûr ?");
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 4000);
          });
      }
    };
  return (
    <tr>
      <th>{props.intituleDuPoste}</th>
      <td>{props.description}</td>
      <td>{props.experienceRequise}</td>
      <td>{props.TypeContrat}</td>

      <td className="gap__actions">
        <span>
          <Link to={`/offres/${props.Id}`} className="text-white">
            <CgIcons.CgArrowRightO
              style={{
                color: "black",
              }}
            />
          </Link>
        </span>

        <span onClick={() => OnDelete(props.Id)} className="gap__actions">
          <li className="fas fa-trash-alt"></li>
        </span>
      </td>
    </tr>
  );
}

export default RowOffers;
