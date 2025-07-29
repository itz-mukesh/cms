// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Login from "./Login";
// import Adminlogin from "./Adminlogin";
// export const Navbar = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className=" fixed z-50 top-0 left-0 w-full flex justify-between  h-[79px] text-center items-center shadow-sm hover:shadow-xl duration-300">
//         <div className="flex text-center items-center">
//           <img src="/src/Images/logo.png" alt="" className="w-[80px]" />
//           <h2 className="text-2xl font-bold">MobileEase</h2>
//         </div>
//         <div className="space-x-4">
//           <button
//             onClick={() => navigate("/Adminlogin")}
//             className=" rounded-4xl p-2 px-8 cursor-pointer shadow-xl hover:border-[#1be7ff]   hover:scale-105 hover:text-white  duration-300 border-[1.5px] "
//           >
//             Officeal Login
//           </button>
//           <button
//             onClick={() => navigate("/Login")}
//             className=" rounded-4xl p-2 px-8 cursor-pointer shadow-xl hover:border-[#1be7ff]   hover:scale-105 hover:text-white  duration-300 border-[1.5px] mr-12"
//           >
//             Citizen Login
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  // 🧠 1. Check if user is logged in
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // 🔐 2. Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/"); // redirect to home
    window.location.reload(); // refresh to re-render navbar
  };

  return (
    <>
      <div className="fixed z-50 top-0 left-0 w-full flex justify-between h-[79px] text-center items-center shadow-sm hover:shadow-xl duration-300">
        <div className="flex text-center items-center">
          <img src="/src/Images/logo.png" alt="" className="w-[80px]" />
          <h2 className="text-2xl font-bold">MobileEase</h2>
        </div>

        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              {/* 👤 Show these if not logged in */}
              <button
                onClick={() => navigate("/Adminlogin")}
                className="rounded-4xl p-2 px-8 cursor-pointer shadow-xl hover:border-[#1be7ff] hover:scale-105 hover:text-white duration-300 border-[1.5px]"
              >
                Official Login
              </button>
              <button
                onClick={() => navigate("/Login")}
                className="rounded-4xl p-2 px-8 cursor-pointer shadow-xl hover:border-[#1be7ff] hover:scale-105 hover:text-white duration-300 border-[1.5px] mr-12"
              >
                Citizen Login
              </button>
            </>
          ) : (
            <>
              {/* ✅ Show these if logged in */}
              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-4xl p-2 px-8 cursor-pointer shadow-xl hover:border-green-400 hover:scale-105 hover:text-white duration-300 border-[1.5px]"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="rounded-4xl p-2 px-8 cursor-pointer shadow-xl hover:border-red-400 hover:scale-105 hover:text-white duration-300 border-[1.5px] mr-12"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
