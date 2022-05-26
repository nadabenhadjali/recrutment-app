import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Button,Card,Container } from "react-bootstrap";

function CreateQuestion() {
  const [description, setDescription] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [SubjectId, setSubjectId] = useState("");

  const [correct_answer, setCorrectAnsw] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:8000/dashboard/subjects`).then((res) => {
      setSubjects(res.data);
    });
  }, []);

  async function submitQuestion(e) {
    let correctAnsArr = [];
    correctAnsArr.splice(0, 0, answer1, answer2, answer3, answer4);
    if (correctAnsArr.includes(correct_answer)) {
      try {
        const sendData = await axios.post(
          "http://localhost:8000/dashboard/questions",
          {
            subject: SubjectId,
            description: description,
            correct_answer: correct_answer,
            answers: correctAnsArr,
          }
        );
        console.log(sendData);
        alert("question is successfully added to database");
      } catch (e) {
        console.error(e.message);
      }
    } else {
      toast.error("Any Answer not matched with correct answer", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const qfrom = {
    width: "60%",
    padding: "2vw",
  };
  return (
     <Container style={{alignItems:"center", marginTop:"65px"}}>
      <Card body>
    <div className="d-flex align-items-center justify-content-center">
      <div style={qfrom}>
        <h2>Ajouter une question </h2>
        <label htmlFor="question">Entrer question:</label> <br />
        <input
          type="text"
          name="description"
          className="form-control"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <br />
        <hr></hr>
        <label htmlFor="question">Entrer Reponse:</label> <br />
        <input
          type="text"
          name="answers"
          className="form-control"
          placeholder="reponse 1"
          onChange={(e) => {
            setAnswer1(e.target.value);
          }}
        />{" "}
        <br />
        <input
          type="text"
          name="answers"
          className="form-control"
          placeholder="reponse 2"
          onChange={(e) => {
            setAnswer2(e.target.value);
          }}
        />{" "}
        <br />
        <input
          type="text"
          name="answers"
          className="form-control"
          placeholder="reponse 3"
          onChange={(e) => {
            setAnswer3(e.target.value);
          }}
        />{" "}
        <br />
        <input
          type="text"
          name="answers"
          className="form-control"
          placeholder="reponse 4"
          onChange={(e) => {
            setAnswer4(e.target.value);
          }}
        />
        <br />
        <hr></hr>
        <label htmlFor="correct_answer">Entrer la reponse correct:</label>{" "}
        <br />
        <input
          type="text"
          name="correct_answer"
          className="form-control"
          onChange={(e) => {
            setCorrectAnsw(e.target.value);
          }}
        />
        <br />
        <select
          name="questionId"
          onChange={(e) => {
            setSubjectId(e.target.value);
          }}
        >
          <option value="">Sujet...</option>
          {subjects.map((c) => (
            <option value={c._id}>{c.name}</option>
          ))}
        </select>
        <br />
        <hr></hr>
        <div className="d-flex align-items-center justify-content-center mt-5">
          <Button
            onClick={(e) => {
              submitQuestion(e);
            }}
            variant="dark"
          >
            Ajouter
          </Button>
        </div>
      </div>
        </div>
      </Card>
      </Container>
  );
}

export default CreateQuestion;
