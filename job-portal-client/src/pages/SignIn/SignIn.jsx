import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signInAnimation from "../../assets/signin.json";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // const from = location.state?.from || "/"; // default fallback

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = {
          email: result.user.email,
        };
        // console.log(user);
        form.reset();

        // Redirect to the desired route
        navigate(location?.state ? location?.state : "/");
        // navigate(from, { replace: true });

        /* fetch("https://job-portal-server-ten-puce.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => console.log(data)); */

        // Convert the above fetch into a easier version with axios

        /*  axios
          .post("https://job-portal-server-ten-puce.vercel.app/jwt", user, { withCredentials: true })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err)); */
      })
      .catch((err) => {
        // console.log(error.message);
        setError(err.message);
      });
  };

  return (
    <div className="hero bg-blue-900 min-h-screen w-10/12 mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <div className="text-center lg:text-left">
          <Lottie
            className="w-5/6 "
            animationData={signInAnimation}
            loop={true}
          />
        </div>
        <div className="card bg-blue-900 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Sign In now!</h1>

            {/* Social Login  */}
            <SocialLogin />

            {/* Sign In Form  */}
            <form onSubmit={handleSignIn} className="fieldset">
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
              <button className="btn btn-neutral mt-4">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
