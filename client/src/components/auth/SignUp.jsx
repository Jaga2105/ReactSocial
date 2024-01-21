import React, { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../api/authAPI";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
};
const initialErrors = {
  name: {
    error: false,
    errorMsg: "",
  },
  email: {
    error: false,
    errorMsg: "",
  },
  password: {
    error: false,
    errorMsg: "",
  },
};
const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialErrors);
  const navigate = useNavigate();

  const validateName = (name, value) => {
    let errorMsg = "";
    let error = false;
    if (value === "") {
      errorMsg = `${name} can't be empty`;
      error = true;
    } else if (value.length < 5) {
      errorMsg = `${name} should be of atleast 5 characters`;
      error = true;
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: {
        error,
        errorMsg,
      },
    });
  };

  const validateEmail = (name, value) => {
    const regEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    let errorMsg = "";
    let error = false;
    if (value === "") {
      errorMsg = `${name} should n't be empty`;
      error = true;
    } else if (!regEx.test(value)) {
      errorMsg = `Invalid ${name} `;
      error = true;
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: {
        error,
        errorMsg,
      },
    });
  };

  const validatePassword = (name, value) => {
    const regEx =
      /(?=^.{6,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    let errorMsg = "";
    let error = false;
    if (value === "") {
      errorMsg = `${name} can't be empty`;
      error = true;
    } else if (!regEx.test(value)) {
      errorMsg = `Password length atleast 6 letters and must conatin one upper case, lower case and special char each`;
      error = true;
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: {
        error,
        errorMsg,
      },
    });
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      validateName(name, value);
    } else if (name === "email") {
      validateEmail(name, value);
    } else if (name === "password") {
      validatePassword(name, value);
    }
  };
  const handleOnBlur = (e) => {
    handleOnchange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let key in errors) {
      if (errors[key].error) {
        console.log("empty data");
        toast.error("Enter valid credentials");
        return;
      }
    }
    const newUser = {
      username: formValues.name,
      email: formValues.email,
      password: formValues.password,
    };
    try {
      const response= await registerUser(newUser)
      if(response.error){
        console.log(response)
        return toast.error(response.error)
      }
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast(error.response.data.error);
    }
    console.log(formValues);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-ceneter py-12 sm:px-6 lg:px-8">
      {/* {user && <Navigate to={"/login"} replace={true}></Navigate>} */}
      {/* <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a New Account
        </h2>
      </div> */}
      <div className="mt-8 sm:mx-auto  sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-600">
            Sign Up
          </h2>
          <form noValidate className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  ${
                    errors.name.error
                      ? "border-red-500"
                      : "focus:border-blue-500"
                  } sm:text-sm`}
                  onChange={handleOnchange}
                  onBlur={handleOnBlur}
                />
                {errors.name.error && (
                  <p className="text-red-500">{errors.name.errorMsg}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  type={"email"}
                  name="email"
                  autoComplete="off"
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  ${
                    errors.email.error
                      ? "border-red-500"
                      : "focus:border-blue-500"
                  } sm:text-sm`}
                  onChange={handleOnchange}
                  onBlur={handleOnBlur}
                />
                <MdOutlineEmail className="absolute right-2 top-2 cursor-pointer h-6 w-6" />
                {errors.email.error && (
                  <p className="text-red-500">{errors.email.errorMsg}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="off"
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  ${
                    errors.password.error
                      ? "border-red-500"
                      : "focus:border-blue-500"
                  } sm:text-sm`}
                  onChange={handleOnchange}
                  onBlur={handleOnBlur}
                />
                {visible ? (
                  <BsEye
                    className="absolute right-2 top-2 cursor-pointer h-6 w-6"
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <BsEyeSlash
                    className="absolute right-2 top-2 cursor-pointer h-6 w-6"
                    onClick={() => setVisible(true)}
                  />
                )}
                {errors.password.error && (
                  <p className="text-red-500">{errors.password.errorMsg}</p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign Up
              </button>
            </div>
            <div className={`flex justify-center w-full`}>
              <h4>Existing User?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
