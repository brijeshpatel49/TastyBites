import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { API } = useAuth();

  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-start justify-center bg-gray-100 p-4">
      <section className="flex flex-col-reverse md:flex-row w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg min-h-[450px] mt-20">
        {/* LEFT SIDE */}
        <div
          className="w-full md:w-1/2 bg-cover bg-center p-6 text-white flex items-center justify-center"
          style={{ backgroundImage: "url('/images/fire.jpg')" }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="mb-4">Please Login To Continue</p>
            <Link to="/login">
              <button className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 cursor-pointer">
                Login Here
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create Account
          </h2>

          <div className="flex justify-center gap-4 mb-6">
            <button className="border p-2 rounded-full">
              <i className="fab fa-instagram"></i>
            </button>
            <button className="border p-2 rounded-full">
              <i className="fab fa-facebook"></i>
            </button>
            <button className="border p-2 rounded-full">
              <i className="fab fa-discord"></i>
            </button>
            <button className="border p-2 rounded-full">
              <i className="fab fa-linkedin"></i>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mb-4">
            or use your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Name"
              required
              value={user.username}
              onChange={handleInput}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={user.email}
              onChange={handleInput}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={user.password}
              onChange={handleInput}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
