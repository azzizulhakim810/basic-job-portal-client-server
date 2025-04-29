import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import MyApplicationDetails from "../myApplicationDetails/myApplicationDetails";
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user } = useAuth();
  const [allApplication, setAllApplication] = useState([]);

  const handleDelete = (_id) => {
    fetch(`http://localhost:5000/myjobs/${_id}`, {
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
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/myjobs?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setAllApplication(data));
  }, [user?.email, handleDelete]);
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
