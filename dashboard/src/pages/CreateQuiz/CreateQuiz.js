import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import {  useNavigate } from "react-router";

function CreateQuiz(props) {
  const [name, setName] = useState("");

  const [instructions, setInstructions] = useState("");
    const navigate = useNavigate();

  async function submitQuiz(e) {
    try {
      const sendData = await axios
        .post("http://localhost:8000/dashboard/quizs", {
          name: name,
          instructions: instructions,
        })
        .then((res) => {
          navigate("/Quizs");
        });
    } catch (e) {
      console.error(e.message);
    }
  }

  const qfrom = {
    width: "60%",
    padding: "2vw",
  };
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div style={qfrom}>
        <h2>ajouter un quiz </h2>
        <label htmlFor="question">nom du quiz:</label> <br />
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Entrer nom quiz "
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <hr></hr>
        <label htmlFor="question">Instructions:</label> <br />
        <input
          type="text"
          name="instructions"
          className="form-control"
          placeholder="Entrer  instructions"
          onChange={(e) => {
            setInstructions(e.target.value);
          }}
        />
        <div className="d-flex align-items-center justify-content-center mt-5">
          <Button
            variant="dark"
            onClick={(e) => {
              submitQuiz(e);
            }}
            className="theme_btn_submit"
          >
            ajouter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
