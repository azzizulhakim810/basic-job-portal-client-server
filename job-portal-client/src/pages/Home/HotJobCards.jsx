const HotJobCards = ({ job }) => {
  const {
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
  // console.log(job);
  return (
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-lg border-x-2 w-full rounded-sm bg-clip-border">
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

        <div className=" px-4 py-2 pb-6 flex justify-between gap-3 md:gap-5">
          Salary: {salaryRange.min}-{salaryRange.max}
        </div>
      </div>
    </div>
  );
};

export default HotJobCards;
