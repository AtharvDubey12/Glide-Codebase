import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import facebook from "../assets/facebook_logo.png";
import google from "../assets/google_logo.png";

function Auth() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [er, setEr] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (status === "Signup") {
        const res = await axios.post(
          `${API_URL}/signup`,
          { email, username, password },
          { withCredentials: true }
        );
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/user/dashboard");
      } else {
        const res = await axios.post(
          `${API_URL}/login`,
          { username, password },
          { withCredentials: true }
        );
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/user/dashboard");
      }
    } catch (err) {
      setEr(err.response?.data?.message || "An unknown error occured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ height: "calc(100vh)" }}
      className="flex-col flex justify-center items-center mt-[60px] text-white"
    >
      {er ? (
        <p className="mb-3 p-5 bg-red-500 bg-opacity-10 rounded-lg h-[5vh] flex justify-center items-center text-red-700 text-sm">
          {er}
        </p>
      ) : null}

      <p
        className={`font-thin text-3xl cursor-default ${
          status == "Signup" ? "lg:-mb-4 md:-mb-4" : ""
        }`}
      >
        {status}
      </p>

      <div
        className="
        text-white font-extralight 
        m-5 sm:m-8 md:m-10 
        w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[30vw] 
        h-auto rounded-2xl 
        bg-violet-800 bg-opacity-30 
        backdrop-blur-lg 
        p-4 sm:p-6 md:p-8"
      >
        <p className="cursor-default text-gray-400 mt-2 text-center font-inter text-xs">
          Authenticate with Google or Facebook
        </p>
        <div className="w-full p-5 flex flex-col items-center">
          <div className="cursor-pointer w-[90%] h-10 rounded-md mb-3 border-[1px] border-white flex justify-center items-center text-sm hover:border-violet-600 transition-colors duration-200">
            <img src={google} className="invert w-[25px] mr-5" /> Google
          </div>
          <div className="cursor-pointer w-[90%] h-10 rounded-md border-[1px] border-white flex justify-center items-center text-sm  hover:border-violet-600 transition-colors duration-200 mb-5">
            <img src={facebook} className="w-[25px] invert mr-3" /> Facebook
          </div>
        </div>

        <div className="w-full h-[1.5px] flex justify-between rounded-2xl mb-5">
          <div className="w-[40%] h-full bg-gray-500 rounded-2xl"></div>
          <span className="text-xs font-inter -translate-y-[6px] text-gray-400">
            OR
          </span>
          <div className="rounded-2xl w-[40%] h-full bg-gray-500"></div>
        </div>

        <div className="w-full p-5 flex flex-col items-center">
          {status === "Login" ? (
            <form
              className="w-full flex justify-center items-center flex-col"
              onSubmit={handleSubmit}
            >
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="w-[90%] h-10 rounded-md bg-violet-800 bg-opacity-20 p-4 text-sm mb-3"
                placeholder="Username"
                name="username"
                type="text"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-[90%] h-10 rounded-md bg-violet-800 bg-opacity-20 p-4 text-sm mb-5"
                placeholder="Password"
                name="password"
                type="password"
              />
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-[110px] h-9 rounded-xl text-sm font-inter ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[rgba(76,29,149,0.7)] hover:bg-[rgba(76,29,149,0.9)]"
                  } text-[rgb(255,255,255,0.8)] transition-colors`}
                >
                  {loading ? "Logging in" : "Log In"}
                </button>
                {loading && (
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                )}
              </div>
            </form>
          ) : (
            <form
              className="w-full flex justify-center items-center flex-col"
              onSubmit={handleSubmit}
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-[90%] h-10 rounded-md bg-violet-800 bg-opacity-20 p-4 text-sm mb-3"
                placeholder="Email ID"
                name="email"
                type="email"
              />
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="w-[90%] h-10 rounded-md bg-violet-800 bg-opacity-20 p-4 text-sm mb-3"
                placeholder="Username"
                name="username"
                type="text"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-[90%] h-10 rounded-md bg-violet-800 bg-opacity-20 p-4 text-sm mb-5"
                placeholder="Password"
                name="password"
                type="password"
              />
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-[110px] h-9 rounded-xl text-sm font-inter ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[rgba(76,29,149,0.7)] hover:bg-[rgba(76,29,149,0.9)]"
                  } text-[rgb(255,255,255,0.8)] transition-colors`}
                >
                  {loading ? "Signing up" : "Sign Up"}
                </button>
                {loading && (
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                )}
              </div>
            </form>
          )}
        </div>

        {status == "Login" ? (
          <p className="text-center cursor-default text-sm">
            Dont have an account?{" "}
            <span
              onClick={() => {
                setStatus("Signup");
                setEr(null);
              }}
              className="text-purple-400 cursor-pointer"
            >
              Create one!
            </span>
          </p>
        ) : (
          <p className="text-center cursor-default text-sm">
            Already have an account?{" "}
            <span
              onClick={() => {
                setStatus("Login");
                setEr(null);
              }}
              className="text-purple-400 cursor-pointer"
            >
              Log In!
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Auth;
