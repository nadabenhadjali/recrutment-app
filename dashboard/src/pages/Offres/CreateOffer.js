import axios from "axios";
import React from "react";
import { useState } from "react";
import { Alert, Container ,Card} from "react-bootstrap";

function CreateOffer() {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const [description, setDescription] = useState("");
  const [intituleDuPoste, setIntituleDuPoste] = useState("");
  const [experienceRequise, setExperienceRequise] = useState("");

  const [TypeContrat, setTypeContrat] = useState("");
  const [duréeContrat, setDuréeContrat] = useState("");
  const [role, setRole] = useState("");
  const [langages, setLangages] = useState([]);
  const [utils, setUtils] = useState([]);
  const Type = ["CDI", "CDD", "Contrat à temps partiel"];

  const qfrom = {
    width: "60%",
    padding: "2vw",
  };

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
        setMessage(res.data.message);

        /* hide errors after save */
        setErrors({});
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
      });
    //.catch((err) => setErrors(err.response.data));
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
  const lang = ["javascript", "java", "C", "C#", "php", "html", "css"];
  const Utils = ["React", "Angular", "Express", "photoshop", "nodejs"];

  return (
     <Container style={{ alignItems: "center", marginTop: "65px" }}>
     
      <Card body>
    <div>
   
      <h2>Ajouter un offre d'emploi</h2>

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
          <input
            style={{ marginTop: "20px" }}
            className="form-control"
            placeholder="role"
            label="role"
            type="text"
            name="rol"
            onChange={(e) => {
              setRole(e.target.value);
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

          <input
            style={{ marginTop: "20px" }}
            className="form-control"
            placeholder="durée du contrat"
            label="durée du Contrat"
            type="text"
            name="duréeContrat"
            onChange={(e) => {
              setDuréeContrat(e.target.value);
            }}
            errors={errors.message}
          />
          <select
            style={{ marginTop: "20px" }}
            onChange={(e) => {
              setTypeContrat(e.target.value);
            }}
          >
            <option style={{ marginTop: "20px" }}>Type Contrat...</option>
            {Type.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>

          <div style={{ marginTop: "20px" }}>
            <h5>langages:</h5>

            {lang.map((data) => (
              <div style={{ marginTop: "5px" }}>
                <input
                  value={data}
                  type="checkbox"
                  checked={langages.some(
                    (checkedCheckbox) => checkedCheckbox === data
                  )}
                  onChange={() => handleCheckboxChange(data)}
                />

                <label className="form-check-label">{data}</label>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "30px" }}>
            <h5>Utils:</h5>

            {Utils.map((data) => (
              <div style={{ marginTop: "5px" }}>
                <input
                  value={data}
                  type="checkbox"
                  checked={utils.some(
                    (checkedCheckbox) => checkedCheckbox === data
                  )}
                  onChange={() => handleUtilsChange(data)}
                />

                <label className="form-check-label">{data}</label>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            style={{ marginTop: "30px" }}
          >
            Ajouter une offre
          </button>
        </form>
      </div>
        </div>
      </Card>
      </Container>
  );
}

export default CreateOffer;
