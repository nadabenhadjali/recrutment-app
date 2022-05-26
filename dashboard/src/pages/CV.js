import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

function CV(props) {
    const id = useParams();
    const [candidat,setCandidat]=useState("")
         useEffect(() => {
           axios
             .get(`http://localhost:8000/dashboard/candidats/${id}`, {
               withCredentials: true,
             })
             .then((res) => {
               setCandidat(res.data);
             });
         });
     
  return <img src={"http://127.0.0.1:8887/" + candidat.photo} />;
}

export default CV