import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Table ,Card} from "react-bootstrap";
import RowCandidats from "../Components/RowCandidats";
function Candidats() {
    const [candidats, setCandidats] = useState([]);
      useEffect(() => {
        axios
          .get("http://localhost:8000/dashboard/candidats", {
            withCredentials: true,
          })
          .then((res) => {
            setCandidats(res.data);
          });
      });
  return (
      <Container style={{alignItems:"center", marginTop:"65px"}}>
      <Card body>
        <Container>
            <h1>Liste des candidats</h1>
            <Table responsive style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>nom</th>
              <th>prenom</th>
              <th>Email</th>
              <th>CV</th>
            </tr>
          </thead>
          <tbody>
            {candidats.map(({ nom, prenom, email, photo, _id }) => (
              <RowCandidats
                nom={nom}
                prenom={prenom}
                email={email}
                photo={photo}
                Id={_id}
              />
            ))}
          </tbody>
        </Table>
      </Container>
    </Card>
    </Container>
    );
}

export default Candidats;
