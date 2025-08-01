import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import "leaflet/dist/leaflet.css";

const Createcomplent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isTrue, setIsTrue] = useState(false);
  const [reasons, setReasons] = useState([]);

  // 📌 Handle reason checkbox change
  const handleReasonChange = (e) => {
    const value = e.target.id;
    if (e.target.checked) {
      setReasons([...reasons, value]);
    } else {
      setReasons(reasons.filter((reason) => reason !== value));
    }
  };

  // 📌 Submit Handler with validation & reset
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!file || !description.trim() || reasons.length === 0 || !isTrue) {
      alert("Please fill all required fields before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("isTrue", isTrue);
    formData.append("reasons", JSON.stringify(reasons));

    try {
      const res = await axios.post(
        "http://localhost:5050/api/complaint/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint Submitted Successfully");
      console.log(res.data);

      // ✅ Reset Form
      setFile(null);
      setDescription("");
      setIsTrue(false);
      setReasons([]);
      navigate("/getcomplent");
    } catch (error) {
      alert("Error submitting complaint");
      console.log(error);
    }
  };

  return (
    <div className="pt-[100px] p-6 space-y-4 ml-[120px]">
      <h2 className="text-2xl font-bold">Report a Complaint</h2>

      {/* 📸 File Upload with preview */}
      <div className="flex flex-col justify-center items-center p-4 gap-2 w-[1500px] h-auto text-center rounded-2xl border shadow-sm border-gray-600 hover:border-[#1be7ff] hover:border-[2px] hover:shadow-xl hover:scale-101 duration-300">
        <FontAwesomeIcon icon={faCameraRetro} />
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-xl font-bold cursor-pointer"
        />
        {/* ✅ Image Preview */}
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-[200px] h-[200px] rounded-xl border mt-4 shadow-md object-cover"
          />
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold">Reason :</h2>

        {[
          "Speeding/Recing",
          "Overloding of Passanger",
          "Without driving seatbeat/helmet",
          "Illegale ovrtacking",
          "Pothels in road",
          "Others",
        ].map((label) => (
          <div key={label}>
            <input
              type="checkbox"
              id={label}
              checked={reasons.includes(label)} // 👈 controlled checkbox
              onChange={handleReasonChange}
              className="scale-120 hover:scale-150 duration-300"
            />
            <label
              htmlFor={label}
              className="text-lg ml-2 hover:scale-110 duration-300 cursor-pointer"
            >
              {label}
            </label>
          </div>
        ))}

        <h2 className="font-bold mt-4">More Information</h2>
        <textarea
          placeholder="Describe"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-xl m-2 font-bold cursor-pointer w-[1500px] h-[180px] rounded-2xl border shadow-sm border-gray-400 hover:border-[#1be7ff] hover:border-[2px] hover:shadow-xl hover:scale-101 duration-300"
        ></textarea>

        <div className="mt-4">
          <input
            type="checkbox"
            checked={isTrue} // 👈 controlled checkbox
            onChange={(e) => setIsTrue(e.target.checked)}
            className="scale-120 hover:scale-150 duration-300"
          />
          <label className="text-lg ml-2 hover:scale-110 duration-300 cursor-pointer">
            By clicking the checkbox, I understand that reporting fake complaint
            against anyone will lead to legal action against me.
          </label>
        </div>

        <input
          type="submit"
          value="Submit"
          className="rounded-xl w-[1490px] p-2 px-8 cursor-pointer border-gray-400 shadow-xl hover:border-[#1be7ff] hover:scale-101 m-2 duration-300 border-[1.5px] mr-12 mt-6"
        />
      </form>
    </div>
  );
};

export default Createcomplent;
