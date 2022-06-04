import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Job from "../components/Job";
import "../components/SearchBar.css";
import "../components/Header.css";
import { Card } from "react-bootstrap";
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
      <div className="bbbootstrap"></div>
      <div className="container">
        <div className="row" style={{ position: "relative", left: "65%" }}>
          <div className="col-md-4 col-md-offset-3">
            <form action="" className="search-form">
              <div className="form-group has-feedback">
                <label for="search" class="sr-only">
                  Rechercher
                </label>
                <input
                  type="text"
                  onChange={(event) => setQuery(event.target.value)}
                  className="form-control"
                  name="search"
                  id="search"
                  placeholder="Rechercher"
                />
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{
          alignItems: "center",
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
