import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import RowOffers from "../../Components/RowOffers";
import { Container, Table, Card, Button } from "react-bootstrap";

axios.defaults.withCredentials = true;

function Offers(props) {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/offres", {
        withCredentials: true,
      })
      .then((res) => {
        setOffers(res.data);
      });
  });
  const handleButton = () => {
    window.location = "/AjouterOffre";
  };
  return (
    <Container style={{ alignItems: "center", marginTop: "30px" }}>
      <Button
        variant="dark"
        style={{ marginBottom: "25px", marginLeft: "1025px" }}
        onClick={handleButton}
      >
        Ajouter
      </Button>
      <Card body>
        <div>
          <h1>Liste des offres</h1>

          <Table responsive style={{ marginTop: "30px" }}>
            <thead>
              <tr>
                <th scope="col">intitulé du poste</th>
                <th scope="col">description</th>
                <th scope="col">experience requise</th>
                <th scope="col">type du contrat</th>
                <th scope="col">durée du contrat</th>

                <th scope="col"></th>
              </tr>
            </thead>
            <tbody >
              {offers.map(
                ({
                  intituleDuPoste,
                  description,
                  experienceRequise,
                  TypeContrat,
                  duréeContrat,
                  id,
                }) => (
                  <RowOffers
                    intituleDuPoste={intituleDuPoste}
                    description={description}
                    experienceRequise={experienceRequise}
                    TypeContrat={TypeContrat}
                    duréeContrat={duréeContrat}
                    Id={id}
                  />
                )
              )}
            </tbody>
          </Table>
        </div>
      </Card>
    </Container>
  );
}

export default Offers;
