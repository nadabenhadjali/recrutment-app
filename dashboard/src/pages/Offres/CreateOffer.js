import axios from "axios";
import React from "react";
import { useState } from "react";
import { Alert, Container, Card ,Button} from "react-bootstrap";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";

function CreateOffer() {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [intituleDuPoste, setIntituleDuPoste] = useState("");
  const [experienceRequise, setExperienceRequise] = useState("");

  const [TypeContrat, setTypeContrat] = useState("");
  const [duréeContrat, setDuréeContrat] = useState("");
  const [role, setRole] = useState("");
  const [langages, setLangages] = useState([]);
  const [utils, setUtils] = useState([]);
  const Type = ["CDI", "CDD", "Contrat à temps partiel"];



  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/dashboard/offres", {
        intituleDuPoste: intituleDuPoste,
        description: description,
        experienceRequise: experienceRequise,
        TypeContrat: TypeContrat,
        duréeContrat: duréeContrat,
        langages: langages,
        utils: utils,
        role: role,
      })
      .then((res) => {
        window.location = "/offres";
      });
  };
  const handleCheckboxChange = (data) => {
    const isChecked = langages.some(
      (checkedCheckbox) => checkedCheckbox === data
    );
    if (isChecked) {
      setLangages(
        langages.filter((checkedCheckbox) => checkedCheckbox !== data)
      );
    } else {
      setLangages(langages.concat(data));
    }
  };

  const handleUtilsChange = (data) => {
    const isChecked = utils.some((checkedCheckbox) => checkedCheckbox === data);
    if (isChecked) {
      setUtils(utils.filter((checkedCheckbox) => checkedCheckbox !== data));
    } else {
      setUtils(utils.concat(data));
    }
  };
  const lang = ["javascript", "java", "php", "html", "css"];
  const Utils = ["React", "Angular", "Express", "photoshop", "nodejs"];

  return (
    <Container style={{ alignItems: "center", marginTop: "65px" }}>
      <MdIcons.MdKeyboardBackspace
        onClick={() => navigate(-1)}
        style={{ fontSize: "50px", position: "relative", right: "47%" }}
        className="gap__actions"
      />
      <Card body>
        <div>
          <h2>Ajouter une offre d'emploi</h2>

          <div>
            <Alert message={"offre ajouter"} show={show} />

            <form onSubmit={onSubmitHandler}>
              <input
                style={{ marginTop: "20px" }}
                className="form-control"
                placeholder="intitulé du poste"
                label="intitulé Du Poste"
                type="text"
                name="intituleDuPoste"
                onChange={(e) => {
                  setIntituleDuPoste(e.target.value);
                }}
                errors={errors.message}
              />
              <textarea
                style={{ marginTop: "20px" }}
                className="form-control"
                placeholder="description"
                label="description"
                type="text"
                name="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                errors={errors.message}
              />
              <input
                style={{ marginTop: "20px" }}
                className="form-control"
                placeholder="experience requise"
                label="experience Requise"
                type="text"
                name="experienceRequise"
                onChange={(e) => {
                  setExperienceRequise(e.target.value);
                }}
                errors={errors.message}
              />

              <div>
                <select
                  style={{ marginTop: "20px" }}
                  onChange={(e) => {
                    setTypeContrat(e.target.value);
                  }}
                  class="custom-select"
                  id="inputGroupSelect01"
                >
                  <option selected>Type Contrat...</option>
                  {Type.map((c) => (
                    <option value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <label style={{ marginTop: "10px" }}>Langages:</label>
              <div className="checkboxes">
                {lang.map((data) => (
                  <labl style={{ marginLeft: "40px" }}>
                    <input
                      class="form-check-input"
                      id="gridRadios3"
                      value={data}
                      type="checkbox"
                      checked={langages.some(
                        (checkedCheckbox) => checkedCheckbox === data
                      )}
                      onChange={() => handleCheckboxChange(data)}
                    />

                    <span>{data}</span>
                  </labl>
                ))}
              </div>
              <label style={{ marginTop: "10px" }}>technologies:</label>
              <div className="checkboxes">
                {Utils.map((data) => (
                  <labl style={{ marginLeft: "40px" }}>
                    <input
                      value={data}
                      type="checkbox"
                      class="form-check-input"
                      id="gridRadios3"
                      checked={utils.some(
                        (checkedCheckbox) => checkedCheckbox === data
                      )}
                      onChange={() => handleUtilsChange(data)}
                    />
                    <span>{data}</span>
                  </labl>
                ))}
              </div>
              <Button
                variant="dark"
                type="submit"
                style={{ marginTop: "30px" }}
              >
                Ajouter
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default CreateOffer;
