import axios from "axios";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../../firebase/firebase.init";
import AuthContext from "./AuthContext";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // User Creation
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // User Sign in
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Facebook Sign in
  const signInFacebook = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  // Github Sign in
  const signInGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // User Sign Out
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Checking logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("State captured", currentUser?.email);

      if (currentUser?.email) {
        const user = { email: currentUser.email };

        // JWT Installation
        axios
          .post("http://localhost:5000/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("login", res.data);

            setLoading(false);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(
            "http://localhost:5000/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("log Out", res.data);
            setLoading(false);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser,
    signInGoogle,
    signInFacebook,
    signInGithub,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
