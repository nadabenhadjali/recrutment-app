import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button,Card,Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import * as MdIcons from "react-icons/md";

function UpdateOffer(props) {

    const [form, setForm] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
  const Type = ["CDI", "CDD", "Contrat à temps partiel"];

    const onChangeHandler = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

    const onSubmitHandler = (e) => {
      e.preventDefault();
      axios
        .patch(`http://localhost:8000/dashboard/offres/${id}`, form)
        .then((res) => {
          navigate("/offres");
        })
        .catch((err) => setErrors(err.response.data));
    };

    useEffect(() => {
      axios
        .get(`http://localhost:8000/dashboard/offres/${id}`)
        .then((res) => {
          setForm(res.data);
        });
    }, []);
  return (
    <Container style={{ alignItems: "center", marginTop: "65px" }}>
      <MdIcons.MdKeyboardBackspace
        onClick={() => navigate(-1)}
        style={{ fontSize: "50px", position: "relative", right: "47%" }}
        className="gap__actions"
      />
      <Card body>
        <h2>Modifier offre</h2>

        <form onSubmit={onSubmitHandler}>
          <label style={{ marginTop: "20px" }}>intitulé du poste:</label>
          <input
            className="form-control"
            placeholder="intitulé du poste"
            label="intitulé Du Poste"
            type="text"
            name="intituleDuPoste"
            onChangeHandler={onChangeHandler}
            value={form.intituleDuPoste}
          />
          <label style={{ marginTop: "20px" }}>description:</label>

          <textarea
            className="form-control"
            placeholder="description"
            label="description"
            type="text"
            name="description"
            onChangeHandler={onChangeHandler}
            value={form.description}
          />
          <label style={{ marginTop: "20px" }}>experience requise:</label>

          <input
            className="form-control"
            placeholder="experience requise"
            label="experience Requise"
            type="text"
            name="experienceRequise"
            onChangeHandler={onChangeHandler}
            value={form.experienceRequise}
          />
          <div style={{ marginTop: "20px" }}>
            <label>type contrat:</label>

            <select
              onChangeHandler={onChangeHandler}
              value={form.TypeContrat}
              class="custom-select"
              id="inputGroupSelect01"
            >
              <option selected>Type Contrat...</option>
              {Type.map((c) => (
                <option value={c}>{c}</option>
              ))}
            </select>
          </div>

          <Button variant="dark" type="submit" style={{ marginTop: "30px" }}>
            Modifier{" "}
          </Button>
        </form>
      </Card>
    </Container>
  );
}

export default UpdateOffer
