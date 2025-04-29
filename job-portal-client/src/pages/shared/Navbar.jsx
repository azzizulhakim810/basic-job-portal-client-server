import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const Navbar = () => {
  const { signOutUser, user } = useContext(AuthContext);

  // const { displayName, email, photoURL } = user;

  // console.log(user?.displayName);
  // console.log(user?.photoURL);

  const handleSignOut = () => {
    signOutUser().then(() => {
      console.log("Successfully Signing Out");
    });
  };

  const navItems = (
    <>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/services">Services</Link>
      </li>
      <li>
        <Link to="/myApplications">My Application</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl">daisyUI</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end gap-5">
        {/* Toggle SignIn & SignOut Button  */}
        {user?.uid ? (
          <>
            <Link onClick={handleSignOut} className="btn">
              Sign Out
            </Link>
            <h2>{user?.displayName}</h2>
            <div className="avatar avatar-online">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/signin" className="btn">
              Sign In
            </Link>

            <Link to="/register" className="">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
