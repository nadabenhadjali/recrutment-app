import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Table, Card } from "react-bootstrap";
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
    <Container style={{ alignItems: "center", marginTop: "65px" }}>
      <Card body>
        <Container>
          <h1>Liste des candidats</h1>
          <Table responsive style={{ marginTop: "30px" }}>
            <thead>
              <tr>
                <th scope="col">nom</th>
                <th scope="col">prenom</th>
                <th scope="col">Email</th>
                <th scope="col">Offre</th>

                <th scope="col">CV</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {candidats.map(({ nom, prenom, email, offres,photo, _id }) => (
                <RowCandidats
                  nom={nom}
                  prenom={prenom}
                  email={email}
                  photo={photo}
                  offre={offres}
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
