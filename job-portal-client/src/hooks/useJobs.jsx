import { useState, useEffect } from "react";
import axios from "axios";

const useJobs = (sort, searchText, min, max) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(sort);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/jobs?sort=${sort}&searchText=${searchText}&min=${min}&max=${max}`
      )
      .then((res) => {
        setLoading(false);
        setJobs(res.data);
      });
  }, [sort, searchText, min, max]);

  // console.log(jobs);

  return { jobs, loading };
};

export default useJobs;
