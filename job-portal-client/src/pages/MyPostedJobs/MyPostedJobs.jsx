import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const MyPostedJobs = () => {
  const { user } = useAuth();

  const [myPostedJobs, setMyPostedJobs] = useState([]);
  // console.log(myPostedJobs);

  const handleDelete = (_id) => {
    /* fetch(`https://job-portal-server-ten-puce.vercel.app/myPostedJobs/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          Swal.fire({
            title: "Done!",
            text: "Deleted successfully!",
            icon: "success",
          });
        }
      }); */

    axios
      .delete(
        `https://job-portal-server-ten-puce.vercel.app/myPostedJobs/${_id}`
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.deletedCount) {
          setMyPostedJobs((prev) => prev.filter((job) => job._id !== _id));
          Swal.fire({
            title: "Done!",
            text: "Deleted successfully!",
            icon: "success",
          });
        }
      });
  };

  useEffect(() => {
    /* fetch(`https://job-portal-server-ten-puce.vercel.app/jobs?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setMyPostedJobs(data)); */

    // Convert it to axios
    axios
      .get(
        `https://job-portal-server-ten-puce.vercel.app/jobs?email=${user?.email}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => setMyPostedJobs(res.data));
  }, [user?.email]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center pb-5">My Posted Jobs</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Serial</th>
            <th>Company</th>
            <th>Title</th>
            <th>HR Name</th>
            <th>Deadline</th>
            <th>Number Of Applicant</th>
          </tr>
        </thead>
        <tbody>
          {myPostedJobs?.map((jobs, serialKey) => (
            <tr key={jobs._id}>
              <th>{serialKey + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={jobs?.company_logo}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{jobs?.company}</div>
                    <div className="text-sm opacity-50">{jobs?.location}</div>
                  </div>
                </div>
              </td>
              <td>{jobs.title}</td>
              <td>{jobs.hr_name}</td>
              <td>{jobs.applicationDeadline}</td>
              <td>{jobs.applicationCount}</td>
              <td>
                <Link to={`/viewApplicationsAdmin/${jobs?._id}`}>
                  <button className="btn">View Applicants</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(jobs?._id)} className="btn">
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPostedJobs;
