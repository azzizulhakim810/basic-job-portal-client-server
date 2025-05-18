import { useState } from "react";
import useJobs from "../../hooks/useJobs";
import HotJobCards from "../Home/HotJobCards";

const AllJobs = () => {
  const [sort, setSort] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { loading, jobs } = useJobs(sort, searchText);

  console.log(searchText);

  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-medium">All Jobs</h1>
      <p className="text-base pb-4">See the available jobs</p>
      <div className="bg-gray-100 w-10/12 m-auto text-start p-4 rounded">
        <button
          onClick={() => setSort(!sort)}
          className={`btn bg-black me-3 ${sort && "bg-red-600"}`}
        >
          {sort == true ? "Sorted By Salary" : "Sort By Salary"}
        </button>

        {/* Search Options  */}
        <label className="input bg-black rounded text-white">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            required
            placeholder="Search Jobss"
          />
        </label>

        {/* <button
          onClick={() => setActive(!active)}
          className={`btn bg-black  me-3 ${active && "bg-red-600"}`}
        >
          {active == true ? "Closed" : "Active"}
        </button> */}
      </div>
      <div className="w-10/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-5 pb-20">
        {/* Load all jobs  */}
        {jobs.map((job) => (
          <HotJobCards key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
