import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Job(props) {
  const post = props.intituleDuPoste;
  const role = props.role;
  const langages = props.langages;
  const utils = props.utils;
  const lang = langages.map((langage) => (
    <Badge bg="secondary" style={{ marginLeft: "5px" }}>
      {langage}
    </Badge>
  ));
  const tools = utils.map((util) => (
    <Badge bg="secondary" style={{ marginLeft: "5px" }}>
      {util}
    </Badge>
  ));
  console.log(role);
  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
      <Card.Body>
        <Card.Title>
          {post} {role}
        </Card.Title>
        <Card.Text style={{ marginTop: "20px", fontSize: "20px" }}>
          {lang}

          {tools}
          <Link to={`/offres/${props.Id}`} className="text-white">
            <button
              className="btn"
              style={{ position: "absolute", left: "80%" }}
            >
              <span> Voir Plus</span>
            </button>
          </Link>
        </Card.Text>
      </Card.Body>
    </div>
  );
}
export default Job;
