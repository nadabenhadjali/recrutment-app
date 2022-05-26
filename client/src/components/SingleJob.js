import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
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
      <div class="bbootstrap">
        <div class="container">
          <Button
            style={{ marginLeft: "950px", marginTop: "-50px" }}
            className="Postuler"
            variant="outline-info"
            onClick={handleShow}
          >
            postuler
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Postuler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="nom"
                    name="nom"
                    value={newUser.nom}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
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
                    type="text"
                    placeholder="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="photo"
                    onChange={handlePhoto}
                  />
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleSubmit}>
                envoyer
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="Post">
            {offre.intituleDuPoste} {offre.role}
          </div>
        </div>
      </div>
      <Container bordered >
        <Container
          style={{
            marginTop: "0px",
            backgroundColor: "rgba(206, 223, 241, 0.25)",
          }}
        >
          <Row>
            <Col >
              <div className="desc" style={{ marginBottom: "10px" }}>
                type:
              </div>

              <div>{offre.TypeContrat}</div>
            </Col>
            <div className="v-divider"></div>

            <Col>
              <div className="desc" style={{ marginBottom: "10px" }}>
                technologies:
              </div>
              {langages.map((l) => (
                <Badge bg="secondary">{l}</Badge>
              ))}
            </Col>
          </Row>
          <hr className="mt-5 mb-5" />

          <Row>
            <Col >
              <div className="desc" style={{ marginBottom: "10px" }}>
                experience:
              </div>
              <div>{offre.experienceRequise}</div>
            </Col>

            <Col>
              <div className="desc" style={{ marginBottom: "10px" }}>
                utils:
              </div>
              <div>
                {utils.map((l) => (
                  <Badge bg="secondary">{l}</Badge>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
        <Container style={{ marginTop: "80px", marginBottom: "100px" }}>
          <div style={{ marginBottom: "30px" }} className="desc">
            description
          </div>
          {offre.description}
        </Container>
      </Container>
    </div>
  );
}
