import React from "react";
import { Icon } from "@iconify/react";
import sendCircle from "@iconify/icons-mdi/send-circle";
import axios from 'axios'
import "./Form.css";
import { useState } from "react";

const formInputs = [
  { id: "name", type: "text", label: "nom et prénom" },
  {
    id: "tel",
    type: "tel",
    label: "telephone",
  },
  {
    id: "email",
    type: "email",
    label: "address Email",
  },
  {
    id: "message",
    type: "textarea",
    label: "Votre message",
    placeholder: "Comment pouvons-nous vous aidez?",
  },
];


function Form() {
    const [status, setStatus] = useState("Submit");
    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("Sending...");
      const { name, email, tel, message } = e.target.elements;
      let details = {
        name: name.value,
        email: email.value,
        tel: tel.value,
        message: message.value,
      };
      let response = axios
        .post(`http://localhost:8000/api/contactUs`, details)
        .then((res) => {
          if (res.status === 200) {
            alert("message enovyé");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("!!");
        });

      setStatus("Submit");
      alert(response.status);
    };
    return(
  <form className="form">
    <h2 className="form-h2">envoyez-nous un message</h2>

    {formInputs.map((input) => (
      <label key={input.label} id={input.id} className="form-label">
        {input.label}

        {input.type === "textarea" ? (
          <textarea className="form-textarea" placeholder={input.placeholder} />
        ) : (
          <input
            className="form-input"
            type={input.type}
            placeholder={input.placeholder}
          />
        )}
      </label>
    ))}

        <Icon className="form-submit" icon={sendCircle} onClick={handleSubmit}/>

    {/* <button className="form-submit" type="submit">
      Send message
    </button> */}
        </form>
    )
};

export default Form;
