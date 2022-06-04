import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import SingleJob from '../components/SingleJob';

function JobDetails(props) {
      const { id } = useParams();

      const [job, setJob] = useState({});

    useEffect(() => {
      axios.get(`http://localhost:8000/dashboard/offres/${id}`).then((res) => {
        setJob(res.data);
      });
    }, []);
  return (
    <div className="single">

      <SingleJob />
    </div>
  );
}

export default JobDetails