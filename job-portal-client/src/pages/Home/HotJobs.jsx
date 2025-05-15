import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import HotJobCards from "./HotJobCards";

const HotJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { count } = useLoaderData();
  const [jobsPerPage, setJobsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const handleJobsPerPage = (e) => {
    const value = parseInt(e.target.value);
    console.log(value);
    setJobsPerPage(value);
  };

  // const jobsPerPage = 3;

  const numberOfPages = Math.ceil(count / jobsPerPage);

  // console.log(numberOfPages);

  /*  const pages = [];

  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i);
  }
  console.log(pages); */

  const pages = [...Array(numberOfPages).keys()];
  console.log(pages);

  useEffect(() => {
    /* fetch("http://localhost:5000/jobs", {
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setJobs(data);
      }); */

    axios
      .get("http://localhost:5000/jobs", {
        withCredentials: true,
      })
      .then((res) => setJobs(res.data));
  }, []);
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-medium">HotJobs</h1>
      <p className="text-base ">See the available jobs</p>
      <div className="w-10/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-5 pb-20">
        {/* Load all jobs  */}
        {jobs.map((job) => (
          <HotJobCards key={job._id} job={job} />
        ))}
      </div>

      {/* Pagination Applied  */}
      <div className="join ">
        <p>Current Page</p>
        {pages.map((page) => (
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label={page}
          />
        ))}
        <select
          onChange={handleJobsPerPage}
          defaultValue={jobsPerPage}
          className="select select-md ms-5"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default HotJobs;
