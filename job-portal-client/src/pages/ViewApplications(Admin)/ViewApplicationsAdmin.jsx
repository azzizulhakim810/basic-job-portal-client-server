import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const ViewApplicationsAdmin = () => {
  // const { job_id } = useParams();
  // console.log(job_id);

  const allApplications = useLoaderData([]);
  // console.log(allApplications);

  // const fetcher = useFetcher();

  const { _id, applicant_email, linkedIn, name, resume, job_id } =
    allApplications || {};

  const handleDelete = async (application_id) => {
    // console.log(application_id);

    fetch(`http://localhost:5000/deleteApplication/${application_id}`, {
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

  const handleStatusUpdate = (e, id) => {
    // console.log(e.target.value, id);

    const data = {
      status: e.target.value,
    };

    console.log(data);

    fetch(`http://localhost:5000/job-application/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Great!",
            text: "Status Updated!",
            icon: "success",
          });
        }
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center pb-5">All Applications</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Serial</th>
            <th>Name</th>
            <th>Email</th>
            <th>LinkedIn</th>
            <th>Resume</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allApplications?.map((application, serialKey) => (
            <tr key={application._id}>
              <th>{serialKey + 1}</th>
              <td>{application.name}</td>
              <td>{application.applicant_email}</td>
              <td>{application.linkedIn}</td>
              <td>{application.resume}</td>
              <td>
                <select
                  onChange={(e) => handleStatusUpdate(e, application._id)}
                  defaultValue={application.status || ""}
                  className="select select-md cursor-pointer"
                >
                  <option disabled={true}>Change Status</option>
                  <option>Under Review</option>
                  <option>Set Interview</option>
                  <option>Hired</option>
                  <option>Rejected</option>
                </select>
              </td>

              <td>
                <button
                  onClick={() => handleDelete(application?._id)}
                  className="btn"
                >
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

export default ViewApplicationsAdmin;
