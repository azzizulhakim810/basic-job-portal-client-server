import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import HotJobCards from "./HotJobCards";

const HotJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { count } = useLoaderData();
  const [jobsPerPage, setJobsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  // const jobsPerPage = 3;

  const selectedPageBtnColor = {
    color: "white",
    backgroundColor: "red",
    marginLeft: "5px",
    marginRight: "5px",
  };

  const otherPageBtnColor = {
    color: "white",
    backgroundColor: "black",
    marginLeft: "5px",
    marginRight: "5px",
  };

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
      .get(
        `http://localhost:5000/jobs?page=${currentPage}&size=${jobsPerPage}}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => setJobs(res.data));
  }, [currentPage, jobsPerPage]);

  const handleJobsPerPage = (e) => {
    const value = parseInt(e.target.value);
    // console.log(value);
    setJobsPerPage(value);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

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
      <div>
        <p className="pb-5">Current Page: {currentPage}</p>
      </div>
      <div>
        <button onClick={handlePrevPage} className="btn">
          Prev
        </button>
        {pages.map((page) => (
          <button
            className="btn gap-5"
            style={
              currentPage === page ? selectedPageBtnColor : otherPageBtnColor
            }
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} className="btn">
          Next
        </button>
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
