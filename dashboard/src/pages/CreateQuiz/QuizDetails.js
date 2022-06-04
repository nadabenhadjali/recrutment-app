import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, Container, Button } from "react-bootstrap";
import * as MdIcons from "react-icons/md";

function QuizDetails(props) {
  const [Quiz, setQuiz] = useState({});

  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState("");
  const [ques, setQues] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/dashboard/quizs/${id}`).then((res) => {
      setQuiz(res.data);
    });
    axios.get(`http://localhost:8000/dashboard/questions`).then((res) => {
      setQuestions(res.data);
      axios
        .get(`http://localhost:8000/dashboard/quizs/${id}/questions`)
        .then((res) => {
          setQues(res.data.questions);
        });
    }, []);
  });

  async function onSubmitHandler(e) {
    try {
      const sendData = await axios.post(
        `http://localhost:8000/dashboard/quizs/${id}`,
        {
          questionId: questionId,
        }
      );
      console.log(sendData);
      //navigate("/Quizs")
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <Container style={{ marginTop: "65px" }}>
      <MdIcons.MdKeyboardBackspace
        onClick={() => navigate(-1)}
        style={{ fontSize: "50px", position: "relative", right: "47%" }}
        className="gap__actions"
      />
      <Card body>
        <form onSubmit={onSubmitHandler}>
          <Card body>
            <select
              onChange={(e) => {
                setQuestionId(e.target.value);
              }}
              class="custom-select"
              id="inputGroupSelect01"
            >
              <option selected>Select...</option>
              {questions.map((c) => (
                <option value={c._id}>{c.description}</option>
              ))}
            </select>
            <Button variant="dark" type="submit" style={{ marginTop: "30px" }}>
              ajouter un question
            </Button>
          </Card>
        </form>
        <Container style={{ marginTop: "65px" }}>
          <Card body>
            {ques.map((q) => {
              return (
                <>
                  {q.questionId.map((d) => {
                    return <li>{d.description}</li>;
                  })}
                </>
              );
            })}
          </Card>
        </Container>
      </Card>
    </Container>
  );
}

export default QuizDetails;
