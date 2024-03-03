import axios from "axios";
import React, { useState } from "react";
import { loginRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Toast from "../components/Toast";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = values;
    // console.log(email, password);
    const { data } = await axios.post(loginRoute, {
      email,
      password,
    });
    // console.log(data);
    data.status === "err"
      ? toast.error(data.message)
      : typeof data.message == "object"
      ? toast.success("Login complete")
      : toast.error(data.message);
    if (data.status === "err") {
      // toast.error(data.message);
      localStorage.setItem("status", JSON.stringify(data.status));
      // console.log(JSON.stringify(data.status));
    } else if (typeof data.message === "object") {
      localStorage.setItem(
        "chat-app-current-user",
        JSON.stringify(data.message)
      );
      console.log(localStorage.getItem("chat-app-current-user"));
      JSON.parse(localStorage.getItem("chat-app-current-user")).userFind[0][0]
        .isAvatarImageSet === false
        ? setTimeout(navigate("/setAvatar"), 10000)
        : setTimeout(navigate("/chat"), 10000);
    }
  };
  const loginwithgoogle = () => {};
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div
        className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        style={{
          backgroundImage:
            "url(https://images.alphacoders.com/129/1291249.png)",
        }}
      >
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Smuppy
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(event) => handleSubmit(event)}
            >
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
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
              <div className="text-center items-center">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?
                  <a
                    href="/register"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Sign up
                  </a>
                </p>
                <button
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2"
                  onClick={loginwithgoogle}
                >
                  Sign in with Google 🚀{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Toast />
      </div>
    </section>
  );
}

export default Login;
