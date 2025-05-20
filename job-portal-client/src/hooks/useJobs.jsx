import axios from "axios";
import { useEffect, useState } from "react";

const useJobs = (sort, searchText, min, max) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(sort);

  useEffect(() => {
    axios
      .get(
        `https://job-portal-server-ten-puce.vercel.app/jobs?sort=${sort}&searchText=${searchText}&min=${min}&max=${max}`
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
