import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Adminlogin = () => {
  const navigate = useNavigate(); // navigate

  // email & password state

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // submit form function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/api/user/login", {
        email,
        password,
        role: "admin",
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token); 
        navigate("/dashboard2");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center pt-[84px]">
        <div>
          <img src="/src/Images/i.png" alt="" className="w-[800px]" />
        </div>
        <div>
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center text-black"></h2>
          </div>
          <div className="flex items-center justify-center mr-[50px]">
            <div className="p-10 rounded-2xl border shadow-xl w-[1900px] max-w-lg  mr-[220px] hover:scale-101 hover:shadow-2xl duration-300 ">
              <h2 className="text-3xl w-full font-bold mb-8 text-center text-black">
                Admin Login
              </h2>

              <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full border border-gray-800 rounded-md p-3 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full border border-gray-800 rounded-md p-3 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className=" w-full  text-lg rounded-md py-3 px-5 cursor-pointer shadow-xl hover:border-[#1be7ff]   hover:scale-105 hover:text-white  duration-300 border-[1.5px] mr-12"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminlogin;
