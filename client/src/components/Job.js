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
    <Badge
      bg="secondary"
      style={{ marginLeft: "5px", }}
    >
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
    <Card className="mb-3">
      <Card.Body >
        <Card.Title>
          {post} {role}
        </Card.Title>
        <Card.Text style={{ marginTop: "20px", fontSize: "20px" }}>
          {lang}

          {tools}
            <Link to={`/offres/${props.Id}`} className="text-white">
              <Button
                variant="outline-secondary"
                style={{ marginLeft: "935px" }}
              >
                Voir Plus
              </Button>
            </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Job;
