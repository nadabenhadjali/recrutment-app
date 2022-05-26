import React from "react";
import { useState } from "react";
import axios from "axios";
import { Container, Table,Card,Button } from "react-bootstrap";
import { useEffect } from "react";
import RowQuizs from "../../Components/RowQuizs"
function Quiz(props) {
  const [show, setShow] = useState(false);
  const [quizs, setQuizs] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8000/dashboard/quizs`).then((res) => {
      setQuizs(res.data);
    });
  
  });
  const handleButton = () => {
    window.location = "/CreateQuiz"
  }
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
        style={{ marginBottom: "25px", marginLeft: "1025px" }}
        onClick={handleButton}
      >
        Ajouter
      </Button>
      <Card body>
        <div>
          <h1 >Quizs</h1>
          <Table responsive style={{ marginTop: "30px" }}>
            <thead>
              <tr>
                <th>name</th>
                <th>instructions</th>
                <th>questions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {quizs.map(({ name, instructions, questions, _id }) => (
                <RowQuizs
                  name={name}
                  instructions={instructions}
                  questions={questions}
                  Id={_id}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </Container>
  );
  
}

export default Quiz;
