import { useLoaderData, Link } from "react-router-dom";

const JobDetails = () => {
  const job = useLoaderData([]);
  const {
    _id,
    title,
    status,
    location,
    jobType,
    category,
    applicationDeadline,
    description,
    company,
    requirements,
    responsibilities,
    company_logo,
    salaryRange,
  } = job;
  console.log(job);
  return (
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-lg border-x-2 w-6/12 rounded-sm bg-clip-border">
        <div className="p-4 flex justify-center">
          <img src={company_logo} className="  h-10 " />
        </div>

        <div className="px-4">
          <p className="block font-sans text-lg antialiased font-medium leading-relaxed text-blue-gray-900 text-center">
            {title}
          </p>

          <p>{description}</p>
          <div className="flex items-center justify-between my-2">
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              Status: <span className="font-normal">{status}</span>
            </p>
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              Category: <span className="font-normal">{category}</span>
            </p>
          </div>
        </div>

        <div className=" bg-red-400 px-4 py-2 pb-6 flex justify-between items-center gap-3 md:gap-5">
          <p>
            Salary: {salaryRange.min}-{salaryRange.max}
          </p>
          <Link to={`/jobApply/${_id}`}>
            <button className="btn ">Apply</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
