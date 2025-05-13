import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(form);

    const initialData = Object.fromEntries(formData.entries());
    // console.log(initialData);

    const { min, max, currency, ...newJobData } = initialData;
    // console.log(initialData);

    newJobData.salaryRange = { min, max, currency };

    newJobData.requirements = newJobData.requirements.split("\n");
    newJobData.responsibilities = newJobData.responsibilities.split("\n");
    // console.log(initialData);
    console.log(newJobData);

    // Add the data to database
    fetch("https://job-portal-server-ten-puce.vercel.app/addJob", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newJobData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Great!",
            text: "You applied the job successfully!",
            icon: "success",
          });

          e.target.reset();
          navigate("/myPostedJobs");
        }
      });
  };
  return (
    <div className="bg-base-200 min-h-screen ">
      <div className="card bg-base-100 m-auto w-3/6 shadow-2xl">
        <div className="card-body">
          <h1 className="text-4xl font-bold text-center mb-4">POST A JOB</h1>
          <form onSubmit={handleAddJob} className="fieldset">
            {/* Title  */}
            <label className="label">Title</label>
            <input
              name="title"
              type="text"
              className="input w-full"
              placeholder="title"
            />

            {/* Location  */}
            <label className="label">Location</label>
            <input
              name="location"
              type="text"
              className="input w-full"
              placeholder="location"
            />

            {/* Job Type  */}
            <label className="label">Job Type</label>
            <select
              name="jobType"
              defaultValue="Select"
              className="select select-neutral"
            >
              <option disabled={true}>Select</option>
              <option>Remote</option>
              <option>Onsite</option>
            </select>

            {/* Category */}
            <label className="label">Category</label>
            <select
              name="category"
              defaultValue="Select"
              className="select select-neutral"
            >
              <option disabled={true}>Select</option>
              <option>IT</option>
              <option>Bank</option>
              <option>Marketing</option>
            </select>

            {/* Salary Range */}
            <label className="label">Salary Range</label>
            <div className="flex justify-between items-center gap-2">
              <div>
                <label className="label">Min</label>
                {/* <input
                  type="range"
                  name="minRange"
                  min={0}
                  max="100"
                  value="30"
                  className="range range-xs"
                /> */}
                <input
                  name="min"
                  type="text"
                  className="input w-full"
                  placeholder="min"
                />
              </div>
              <div>
                <label className="label">Max</label>
                {/* <input
                  type="range"
                  name="maxRange"
                  min={0}
                  max="100"
                  value="30"
                  className="range range-xs"
                /> */}
                <input
                  name="max"
                  type="text"
                  className="input w-full"
                  placeholder="max"
                />
              </div>

              {/* Currency  */}
              <div>
                <label className="label">Currency</label>
                <select
                  name="currency"
                  defaultValue="Select"
                  className="select select-neutral"
                >
                  <option disabled={true}>Select</option>
                  <option>BDT</option>
                  <option>USD</option>
                  <option>GBP</option>
                </select>
              </div>
            </div>

            {/* Deadline */}
            <label className="input">
              <span className="label">Deadline</span>
              <input name="applicationDeadline" type="date" />
            </label>

            {/* Description */}
            <label className="label">Description</label>
            <textarea
              name="description"
              placeholder="Bio"
              className="textarea textarea-md w-full"
            ></textarea>

            {/* Company */}
            <label className="label">Company</label>
            <input
              name="company"
              type="text"
              className="input w-full"
              placeholder="company"
            />

            {/* Requirements */}
            <label className="label">Requirements</label>
            <textarea
              name="requirements"
              placeholder="Write required skills each line"
              className="textarea textarea-md w-full"
            ></textarea>

            {/* Responsibilities */}
            <label className="label">Responsibilities</label>
            <textarea
              name="responsibilities"
              placeholder="Write required responsibilities each line"
              className="textarea textarea-md w-full"
            ></textarea>

            {/* Status */}
            <label className="label">Status</label>
            <select
              name="status"
              defaultValue="Select"
              className="select select-neutral"
            >
              <option disabled={true}>Select</option>
              <option>Active</option>
              <option>Close</option>
            </select>

            {/* Hr Email */}
            <label className="label">HR Email</label>
            <input
              defaultValue={user?.email}
              name="hr_email"
              type="email"
              className="input w-full"
              placeholder="HR Email"
            />

            {/* Hr Name */}
            <label className="label">HR Name</label>
            <input
              defaultValue={user?.displayName}
              name="hr_name"
              type="text"
              className="input w-full"
              placeholder="HR Name"
            />

            {/* Company Logo */}
            <label className="label">Company Logo</label>
            <input
              name="company_logo"
              type="url"
              className="input w-full"
              placeholder="Company Logo"
            />

            <button className="btn btn-neutral mt-4 w-full">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
