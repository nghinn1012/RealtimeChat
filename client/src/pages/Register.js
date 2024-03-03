import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRoute } from "../utils/APIRoutes";
import axios from "axios";
import toast from "react-hot-toast";
import Toast from "../components/Toast";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, username, password, confirmPassword } = values;
    // console.log(email, username, password, confirmPassword);
    const { data } = await axios.post(registerRoute, {
      username,
      email,
      password,
      confirmPassword,
    });
    // console.log(data);

    if (data.status === "err") {
      // toast.error(data.message);
      localStorage.setItem("status", JSON.stringify(data.status));

      // console.log(JSON.stringify(data.status));
    } else if (typeof data.message === "object") {
      localStorage.setItem("chat-app-current-user", JSON.stringify(data.user));
      navigate("/chat");
    }

    data.status === "err"
      ? toast.error(data.message)
      : typeof data.message === "object"
      ? toast.success("Signup complete")
      : toast.error(data.message);
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-current-user")) {
      navigate("/chat");
    }
  }, []);
  const handleChange = (event) => {
    // console.log(event);
    // dung object detructing de copy value theo name dat trong the html
    setValues({ ...values, [event.target.name]: event.target.value });
    // console.log(values);
  };
  return (
    <section
      className="bg-gray-50 dark:bg-gray-900"
      style={{
        backgroundImage:
          "url(https://assets-global.website-files.com/5f9072399b2640f14d6a2bf4/634dde89272560563ac10898_2022_Q3_AppDirectory_Admin_HeroBanner_1800x720.png)",
      }}
    >
      <div className="flex flex-col items-center justify-center px-4 py-6 mx-auto md:h-screen lg:py-0 font-sans">
        <a
          href="/"
          className="font-sans flex items-center text-center mb-2 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Smuppy
        </a>
        <div className="font-sans w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2 space-y-2 md:space-y-4 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-1 md:space-y-2"
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <div>
                <label
                  form="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nghinn"
                  required=""
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </div>
              <div>
                <label
                  form="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </div>
              <div>
                <label
                  form="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </div>
              <div>
                <label
                  form="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                  onClick={handleSubmit}
                >
                  Create account
                </button>
              </div>
              <div className="items-center text-center">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <a
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </form>
          </div>
          <Toast />
        </div>
      </div>
    </section>
  );
}
export default Register;
