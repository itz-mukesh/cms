import React, { useRef, useState } from "react";
import axios from "axios";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const email = localStorage.getItem("pendingEmail");

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box if input is not empty
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    try {
      const res = await axios.post("http://localhost:5050/api/verifyotp", {
        email,
        otp: finalOtp,
      });
      console.log(res);
      alert("Email verified successfully");
      localStorage.removeItem("pendingEmail");
    } catch (err) {
      console.error(err);
      alert("OTP verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white shadow-xl p-10 rounded-xl w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Verify Your Email
        </h2>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 border border-gray-400 text-center text-xl rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-red-800 hover:bg-blue-700 cursor-pointer text-white py-3 rounded-md font-semibold text-lg transition duration-300"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
