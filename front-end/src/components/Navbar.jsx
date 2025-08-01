import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="fixed z-50 top-0 left-0 w-full backdrop-blur-[4px] flex justify-between h-[79px] text-center items-center shadow-sm hover:shadow-xl  duration-300">
        <div className="flex text-center items-center">
          <img src="/src/Images/logo.png" alt="" className="w-[80px]" />
          <h2 className="text-2xl font-bold">MobileEase</h2>
        </div>

        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              {/* 🔓 Not logged in */}
              <button
                onClick={() => navigate("/login")}
                className="rounded-4xl p-2 px-8 cursor-pointer shadow-xl hover:border-green-400  hover:scale-105 hover:text-white duration-300 border-[1.5px]"
              >
                Citizen
              </button>
              <button
                onClick={() => navigate("/Adminlogin")}
                className="rounded-4xl p-2 px-8 cursor-pointer shadow-xl hover:border-purple-900 hover:scale-105 hover:text-white duration-300 border-[1.5px] mr-12"
              >
                Admin login
              </button>
            </>
          ) : (
            <>
              {/* ✅ Logged in */}
              <button
                onClick={handleLogout}
                className="rounded-4xl p-2 px-8 cursor-pointer shadow-xl hover:border-red-400 hover:scale-105 hover:text-white duration-300 border-[1.5px]"
              >
                Log out
              </button>

              {/* ✅ Show dashboard only for citizen */}
              {role === "citizen" && (
                <button
                  onClick={() => navigate("/getcomplent")}
                  className="rounded-4xl p-2 px-8 cursor-pointer shadow-xl hover:border-yellow-400 hover:scale-105 hover:text-white duration-300 border-[1.5px] mr-12"
                >
                  Dashboard
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
