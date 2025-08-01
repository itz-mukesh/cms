import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/api/user/register", {
        name,
        phone,
        email,
        password,
        role: "citizen",
      });

      if (res.data.success) {

        localStorage.setItem("token", res.data.token);


        navigate("/login");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      alert("register failed");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center pt-[84px]">
        <div>
          <img src="/src/Images/i.png" alt="" className="w-[800px]" />
        </div>
        <div className="mr-[220px]">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center text-black">
              REPORT TRAFIC VATATION AND <br /> PROBLEM AND ON ROAD
            </h2>
          </div>
          <div className="flex items-center justify-center mr-[50px]">
            <div className="p-10 rounded-2xl  border shadow-xl w-full max-w-lg hover:scale-101 hover:shadow-2xl duration-300 ">
              <h2 className="text-3xl font-bold mb-8 text-center text-black">
                Register a account to be a hero
              </h2>

              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    className="mt-1 block w-full border border-gray-800 rounded-md p-3 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

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
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full border border-gray-800 rounded-md p-3 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
