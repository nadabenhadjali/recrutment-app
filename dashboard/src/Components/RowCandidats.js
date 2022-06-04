import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link ,Navigate} from 'react-router-dom';
import download from "downloadjs";
import { useEffect } from 'react';

function RowCandidats(props) {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [offre, setOffre] = useState("");
  const id = Object.values(props.offre);
   useEffect(() => {
     axios.get(`http://localhost:8000/dashboard/offres/${id}`).then((res) => {
       setOffre(res.data.intituleDuPoste);
     });
   }, []);
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
   const downloadFile = async (id, path) => {
     try {
       const result = await axios.get(
         `http://localhost:8000/dashboard/candidats/${id}/CV`,
         {
           responseType: "blob",
         }
       );
       const split = path.split("/");
       const filename = split[split.length - 1];
       setMessage("");

       return download(result.data, filename);
     } catch (error) {
       if (error.response && error.response.status === 400) {
         setMessage("Error while downloading file. Try again later");
       }
     }
  };
 
  const handleClick = async () => {

    downloadFile(props.Id, props.photo)

  }
  return (
    <tr>
      <th>{props.nom}</th>
      <td>{props.prenom}</td>
      <td>{props.email}</td>
      <td>{offre}</td>
      <td>
        <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-fill"
              viewBox="0 0 16 16"
            onClick={handleClick}
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>{" "}
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