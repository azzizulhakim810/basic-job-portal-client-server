import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import registerAnimation from "../../assets/register.json";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    // Creating User
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        form.reset();

        // JWT Installation
        /*  axios
          .post("https://job-portal-server-ten-puce.vercel.app/jwt", user, { withCredentials: true })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err)); */
      })
      .catch((err) => {
        console.log(error.message);
        setError(err.message);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen w-10/12 mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <div className="text-center lg:text-left">
          <Lottie
            className="w-5/6 "
            animationData={registerAnimation}
            loop={true}
          />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Register!</h1>
            <SocialLogin />
            <form onSubmit={handleRegister} className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
              />
              <label className="fieldset-label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
              <div>
                <Link className="link link-hover">Forgot password?</Link>
                <p>{error}</p>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
