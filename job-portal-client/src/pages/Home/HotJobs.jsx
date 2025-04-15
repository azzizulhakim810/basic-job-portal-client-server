import { useEffect, useState } from "react";
import HotJobCards from "./HotJobCards";

const HotJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setJobs(data);
      });
  }, []);
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-medium">HotJobs</h1>
      <p className="text-base ">See the jobs around you</p>
      <div className="w-10/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-5 pb-20">
        {jobs.map((job) => (
          <HotJobCards key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default HotJobs;
