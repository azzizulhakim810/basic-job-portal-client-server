import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const JobApply = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const navigate = useNavigate();

  // console.log(id, user);

  const handleApply = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const linkedIn = form.linkedIn.value;
    const resume = form.resume.value;

    // console.log(name, linkedIn, resume);

    const jobApplication = {
      job_id: id,
      applicant_email: user?.email,
      name,
      linkedIn,
      resume,
    };

    fetch("http://localhost:5000/job-applications", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Great!",
            text: "You applied the job successfully!",
            icon: "success",
          });

          form.reset();
          navigate("/myApplications");
        }
      });

    console.log(jobApplication);
  };

  return (
    <div className="bg-base-200 min-h-screen ">
      <div className="card bg-base-100 m-auto w-3/6 shadow-2xl">
        <div className="card-body">
          <h1 className="text-4xl font-bold text-center mb-4">Apply Now!</h1>
          <form onSubmit={handleApply} className="fieldset">
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input w-full"
              placeholder="Linkedin Url"
            />
            <label className="label">Linkedin Url</label>
            <input
              name="linkedIn"
              type="url"
              className="input w-full"
              placeholder="linkedIn Url"
            />
            <label className="label">Resume Url</label>
            <input
              name="resume"
              type="url"
              className="input w-full"
              placeholder="Resume Url"
            />

            <button className="btn btn-neutral mt-4 w-full">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
