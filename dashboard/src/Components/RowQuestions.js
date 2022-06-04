import { React, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function RowQuestions(props) {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const[subject,setSubject]=useState("")
  const subjectId = props.subject;
  const OnDelete = (id__) => {
    if (window.confirm("vous êtes sur ?")) {
      axios
        .delete(`http://localhost:8000/dashboard/questions/${id__}`)
        .then((res) => {
          setMessage(res.data.message);
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 4000);
        });
    }
  };
   useEffect(() => {
     axios.get(`http://localhost:8000/dashboard/subjects/${subjectId}`).then((res) => {
       setSubject(res.data);
     });
   });
  return (
    <tr>
      <th>{props.description}</th>
      <td>
        {props.answers.map((a) => (
          <div>{a}</div>
        ))}
      </td>
      <td>{props.correct_answer}</td>
      <td>{subject.name}</td>

      <td>
        <span onClick={() => OnDelete(props.Id)} className="gap__actions">
          <li className="fas fa-trash-alt"></li>
        </span>
      </td>
    </tr>
  );
}

export default RowQuestions;
