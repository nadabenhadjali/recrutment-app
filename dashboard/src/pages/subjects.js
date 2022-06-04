import React from "react";
import { useEffect } from "react";
import Input from "../Components/Input";
import RowSubjects from "../Components/RowSubjects";
import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Card, Container,Modal} from "react-bootstrap";
axios.defaults.withCredentials = true;

function Subjects(props) {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  /* delete */
  const OnDelete = (id__) => {
    if (window.confirm("are you sure to delete this subject")) {
      axios
        .delete(`http://localhost:8000/dashboard/subjects/${id__}`)
        .then((res) => {
          setMessage(res.data.message);
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 4000);
        });
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/dashboard/subject", form).then((res) => {
      setMessage(res.data.message);
      /* hide form after save */
      setForm({});
      /* hide errors after save */
      setErrors({});
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 4000);
    });
    //.catch((err) => setErrors(err.response.data));
  };
  useEffect(() => {
    axios.get("http://localhost:8000/dashboard/subjects").then((res) => {
      setSubjects(res.data);
    });
  });
  return (
    <div>
      <Container
        style={{
          alignItems: "center",
          alignContent: "center",
          marginTop: "65px",
        }}
      >
        <Button
          variant="dark"
          style={{ marginBottom: "25px", position: "relative", left: "40%" }}
          onClick={() => setShow(true)}
        >
          Ajouter
        </Button>

        <Card body>
          <div>
            <Table responsive size="sm">
              <thead>
                <tr>
                  <th scope="col">nom du sujet</th>

                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {subjects.map(({ name, id }) => (
                  <RowSubjects name={name} Id={id} OnDelete={OnDelete} />
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter sujet</Modal.Title>
        </Modal.Header>
        <div>
          <form onSubmit={onSubmitHandler}>
            <div className="form-group col-md-auto">
                <Input
                  class="form-control "
                  type="text"
                name="name"
                placeholder="nom du sujet"
                  onChangeHandler={onChangeHandler}
                  errors={errors.message}
                />
            </div>

            <Button
              variant="dark"
              type="submit"
              style={{ position: "relative", left: "40%", marginBottom: "10%" }}
            >
              Ajouter
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Subjects;
