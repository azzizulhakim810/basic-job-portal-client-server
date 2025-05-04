import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SocialLogin = () => {
  const { signInUser, signInGoogle, signInFacebook, signInGithub } =
    useContext(AuthContext);

  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location);

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        // Redirect to the desired route
        navigate(location?.state ? location?.state : "/");
        // console.log(result.user);

        // JWT Installation
        axios
          .post("http://localhost:5000/jwt", result.user, {
            withCredentials: true,
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  const handleFacebookSignIn = () => {
    signInFacebook()
      .then((result) => {
        // Redirect to the desired route
        navigate(location?.state ? location?.state : "/");
        // console.log(result.user);
        // console.log(result);

        // JWT Installation
        axios
          .post("http://localhost:5000/jwt", user, { withCredentials: true })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        // console.log(error.message);
        setError(err.message);
      });
  };

  const handleGithubSignIn = () => {
    signInGithub()
      .then((result) => {
        // Redirect to the desired route
        navigate(location?.state ? location?.state : "/");
        // console.log(result.user);
        // console.log(result);

        // JWT Installation
        axios
          .post("http://localhost:5000/jwt", user, { withCredentials: true })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        // console.log(error.message);
        setError(err.message);
      });
  };

  return (
    <>
      <div className="flex gap-5 mt-5">
        {/* Google  */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-transparent border-white"
        >
          <i className="fa-brands fa-google text-2xl"></i>
        </button>

        {/* Facebook  */}
        <button
          onClick={handleFacebookSignIn}
          className="btn bg-transparent border-white"
        >
          <i className="fa-brands fa-facebook text-2xl"></i>
        </button>

        {/* Github  */}
        <button
          onClick={handleGithubSignIn}
          className="btn bg-transparent border-white"
        >
          <i className="fa-brands fa-github text-2xl"></i>
        </button>
      </div>
      <p>{error}</p>
      <hr className="mt-3" />
    </>
  );
};

export default SocialLogin;
