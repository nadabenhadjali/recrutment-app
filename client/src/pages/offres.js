import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Job from "../components/Job";
import "../components/Header.css";
import { Container, FormControl, InputGroup } from "react-bootstrap";
function Offers(props) {
  const [offers, setOffers] = useState([]);
  const [langages, setLangages] = useState([]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/offres").then((res) => {
      setOffers(res.data, res.data.id);
      setLangages(res.data.langages);
    });
  });
  return (
    <div>
      <div class="bbbootstrap">
        <div class="container">
          <form>
            <span
              role="status"
              aria-live="polite"
              class="ui-helper-hidden-accessible"
            ></span>

            <InputGroup className="col-6">
              <FormControl
                placeholder="rechercher une offre"
                aria-label="Search"
                id="Form_Search"
                class="InputBox "
                aria-describedby="basic-addon2"
                onChange={(event) => setQuery(event.target.value)}
              />
            </InputGroup>
          </form>
        </div>
      </div>
      <div
        className="container"
        style={{
          alignItems: "center",
          backgroundColor: "rgb(0, 54, 105)",
        }}
      >
        {offers
          .filter((offre) => {
            if (query === "") {
              return offre;
            } else if (
              offre.intituleDuPoste
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              offre.role.toLowerCase().includes(query.toLowerCase())
            ) {
              return offre;
            }
          })
          .map(
            ({
              offre,
              intituleDuPoste,
              description,
              experienceRequise,
              TypeContrat,
              duréeContrat,
              utils,
              role,
              langages,
              id,
            }) => (
              <Job
                intituleDuPoste={intituleDuPoste}
                description={description}
                experienceRequise={experienceRequise}
                TypeContrat={TypeContrat}
                duréeContrat={duréeContrat}
                utils={utils}
                role={role}
                langages={langages}
                Id={id}
              />
            )
          )}
      </div>
    </div>
  );
}

export default Offers;
