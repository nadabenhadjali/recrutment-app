import React from 'react'
import { Container, Table } from 'react-bootstrap';

function Questions() {
  return (
    <Container>
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
        <tbody>
          
        </tbody>
      </Table>
    </Container>
  );
}

export default Questions