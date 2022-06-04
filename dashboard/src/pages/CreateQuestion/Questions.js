import React from "react";
import { useState } from "react";
import axios from "axios";
import { Container, Table, Card, Button } from "react-bootstrap";
import { useEffect } from "react";
import RowQuestions from "../../Components/RowQuestions";

function Questions() {
  const [show, setShow] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/dashboard/questions`).then((res) => {
      setQuestions(res.data);
    });
  });
  const handleButton = () => {
    window.location = "/AjoutQuestion";
  };
  return (
    <Container
      style={{
        alignItems: "center",
        marginTop: "35px",
        alignContent: "center",
      }}
    >
      <Button
        variant="dark"
        style={{ marginBottom: "25px", position: "relative", left: "45%" }}
        onClick={handleButton}
      >
        Ajouter
      </Button>
      <div>
        <Card body>
          <div>
            <h1>Questions</h1>
            <Table responsive style={{ marginTop: "30px" }}>
              <thead>
                <tr>
                  <th scope="col">description</th>
                  <th scope="col">alternatives</th>
                  <th scope="col">réponse correcte</th>
                  <th scope="col">sujet</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {questions.map(
                  ({ description, answers, correct_answer, subject, _id }) => (
                    <RowQuestions
                      description={description}
                      answers={answers}
                      correct_answer={correct_answer}
                      subject={subject}
                      Id={_id}
                    />
                  )
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </div>
    </Container>
  );
}

export default Questions;
