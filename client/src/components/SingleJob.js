import axios from "axios";
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import "./SingleJob.css";

export default function SingleJob(props) {
  const { id } = useParams();

  const [offre, setOffre] = useState({});
  const [langages, setLangages] = useState([]);
  const [utils, setUtils] = useState([]);
  const [newUser, setNewUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    photo: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewUser({ ...newUser, photo: e.target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("photo", newUser.photo);
    form.append("nom", newUser.nom);
    form.append("prenom", newUser.prenom);
    form.append("email", newUser.email);

    axios
      .post(`http://localhost:8000/api/offres/${id}/postuler`, form)
      .then((res) => {
        if (res.status === 200) {
          alert("vous avez postulez");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("!!");
      });
    setShow(false);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/dashboard/offres/${id}`).then((res) => {
      setOffre(res.data);
      setLangages(res.data.langages);
      setUtils(res.data.utils);
    });
  }, []);

  return (
    <div>
      <div class="container">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Postuler</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Container fluid>
                <div className="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="nom"
                    name="nom"
                    value={newUser.nom}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    class="form-control"
                    type="text"
                    style={{ margintop: "50px" }}
                    placeholder="prenom"
                    name="prenom"
                    value={newUser.prenom}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    class="form-control"
                    type="file"
                    accept=".pdf"
                    name="photo"
                    onChange={handlePhoto}
                  />
                </div>
              </Container>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn-bd-primary" onClick={handleSubmit}>
              envoyer
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="bbbootstrap"></div>

      <Container Bordered>
        <Card>
          <Card.Header>
            <div className="Post">{offre.intituleDuPoste}</div>
            <button
              style={{
                position: "absolute",
                left: "88%",
                marginTop: "-45px",
              }}
              className="btn-bd-primary"
              onClick={handleShow}
            >
              postuler
            </button>
          </Card.Header>
          <Card.Body className="desc">
            <Card.Title>
              <div className="title"> description</div>
            </Card.Title>
            <Card.Text>
              <div>{offre.description}</div>
              <div className="title">type de contrat:</div>

              <div>{offre.TypeContrat}</div>
              <div className="title">Niveau d'expérience:</div>
              <div>{offre.experienceRequise}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
