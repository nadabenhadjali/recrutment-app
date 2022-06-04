import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Container } from "react-bootstrap";
import {  useNavigate } from "react-router";
import * as MdIcons from "react-icons/md";

function CreateQuiz(props) {
  const [name, setName] = useState("");
   const [time, settime] = useState("");
   const [expiry, setexpiry] = useState(new Date());
  const [instructions, setInstructions] = useState("");
    const navigate = useNavigate();

   function submitQuiz(e) {
    try {
       axios
        .post("http://localhost:8000/dashboard/quizs", {
          time:time,
          name: name,
          instructions: instructions,
          expiry:expiry,
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
    <Container style={{ alignItems: "center", marginTop: "65px" }}>
      <MdIcons.MdKeyboardBackspace
        onClick={() => navigate(-1)}
        style={{ fontSize: "50px", position: "relative", right: "47%" }}
        className="gap__actions"
      />
      <Card body>
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
            <label htmlFor="time">
              durée (Mins):
            </label>
            <input
              type="text"
              id="time"
              name="time"
              className="form-control"
              onChange={(e) => settime(e.target.value)}
            />
            <br />
            <label htmlFor="expiry">
              Expiré le:
            </label>
            <input
              type="date"
              id="expiry"
              name="expiry"
              className="form-control"
              onChange={(e) => setexpiry(e.target.value)}
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
      </Card>
    </Container>
  );
}

export default CreateQuiz;
