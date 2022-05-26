import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";


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
    });
       
}, []);

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
    <div className="row p-4">
      <form onSubmit={onSubmitHandler}>
        <div className="questionsDiv">
          <select
            onChange={(e) => {
              setQuestionId(e.target.value);
            }}
          >
            <option value="">Select...</option>
            {questions.map((c) => (
              <option value={c._id}>{c.description}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          ajouter un question
        </button>
      </form>
      <ol>

      </ol>
    </div>
  );
}

export default QuizDetails;
