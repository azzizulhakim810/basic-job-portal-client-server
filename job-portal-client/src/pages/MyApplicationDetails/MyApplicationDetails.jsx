import { useEffect } from "react";
import Swal from "sweetalert2";

const MyApplicationDetails = ({
  singleApplication,
  serialKey,
  handleDelete,
}) => {
  // console.log(singleApplication);
  const {
    _id,
    job_id,
    applicant_email,
    name,
    linkedIn,
    resume,
    title,
    company,
    company_logo,
    location,
  } = singleApplication;

  return (
    <tr>
      <th>{serialKey + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={company_logo} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{company}</div>
            <div className="text-sm opacity-50">{location}</div>
          </div>
        </div>
      </td>
      <td>{title}</td>
      <td>{name}</td>
      <td>{linkedIn}</td>
      <td>{resume}</td>
      <td>
        <button onClick={() => handleDelete(_id)} className="btn">
          X
        </button>
      </td>
    </tr>
  );
};

export default MyApplicationDetails;
