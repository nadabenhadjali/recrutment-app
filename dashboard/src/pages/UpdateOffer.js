import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../Components/Input';

function UpdateOffer(props) {

    const [form, setForm] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

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
    <div className="container mt-4 col-12 col-lg-4">
      <form onSubmit={onSubmitHandler}>
        <Input
          label="intitulé Du Poste"
          type="text"
          name="intituleDuPoste"
          onChangeHandler={onChangeHandler}
          value={form.intituleDuPoste}
        />
        <Input
          label="description"
          type="text"
          name="description"
          onChangeHandler={onChangeHandler}
          value={form.description}
        />
        <Input
          label="experience Requise"
          type="text"
          name="experienceRequise"
          onChangeHandler={onChangeHandler}
          value={form.experienceRequise}
        />
        <Input
          label="Type du Contrat"
          type="text"
          name="TypeContrat"
          onChangeHandler={onChangeHandler}
          value={form.TypeContrat}
        />
        <Input
          label="durée du Contrat"
          type="text"
          name="duréeContrat"
          onChangeHandler={onChangeHandler}
          value={form.duréeContrat}
        />

        <Button variant="dark" type="submit">
          modifier offre
        </Button>
      </form>
    </div>
  );
}

export default UpdateOffer
