import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyApplicationDetails from "../myApplicationDetails/myApplicationDetails";

const MyApplications = () => {
  const { user } = useAuth();
  const [allApplication, setAllApplication] = useState([]);

  const axiosSecure = useAxiosSecure();

  const handleDelete = (_id) => {
    /* fetch(`http://localhost:5000/myjobs/${_id}`, {
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

    axios.delete(`http://localhost:5000/myjobs/${_id}`).then((res) => {
      console.log(res.data);

      if (res.data.deletedCount) {
        setAllApplication((prv) => prv.filter((app) => app._id !== _id));
        Swal.fire({
          title: "Done!",
          text: "Deleted successfully!",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    /*     fetch(`http://localhost:5000/myjobs?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setAllApplication(data)); */

    ///////////// Convert it to axios

    /* axios
      .get(`http://localhost:5000/myjobs?email=${user?.email}`, {
        withCredentials: true,
      })
      .then((res) => setAllApplication(res.data)); */

    /////////// Use Axios Instance

    axiosSecure
      .get(`/myjobs?email=${user?.email}`)
      .then((res) => setAllApplication(res.data));
  }, [user?.email]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center pb-5">MyApplications</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Serial</th>
            <th>Company</th>
            <th>Title</th>
            <th>Name</th>
            <th>LinkedIn Url</th>
            <th>Resume Url</th>
          </tr>
        </thead>
        <tbody>
          {allApplication?.map((singleApplication, i) => (
            <MyApplicationDetails
              key={singleApplication._id}
              serialKey={i}
              handleDelete={handleDelete}
              singleApplication={singleApplication}
            ></MyApplicationDetails>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplications;
