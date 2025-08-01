import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Getcomplent = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  // 🆕 To track which complaint is open

  // useEffect(() => {
  //   fetch("http://localhost:5050/api/complaint/get-all")
  //     .then((res) => res.json())
  //     .then((data) => setComplaints(data.data))
  //     .catch((err) => console.error("Failed to fetch complaints:", err));
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    fetch("http://localhost:5050/api/complaint/get-all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ yeh line add karo
      },
    })
      .then((res) => res.json())
      .then((data) => setComplaints(data.data))
      .catch((err) => console.error("Failed to fetch complaints:", err))
      .finally(() => setLoading(false));
  }, []);

  const token = localStorage.getItem("token");
  if (!token || loading) {
    return <div className="pt-[100px] text-center text-xl">Loading...</div>;
  }

  const toggleDetails = (id) => {
    if (selectedId === id) {
      setSelectedId(null); // hide if already open
    } else {
      setSelectedId(id);
    }
  };

  return (
    <div className="pt-[100px] min-h-screen px-4 sm:px-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-[1000px]">
          <h2 className="text-4xl font-bold mb-[40px]">Dashboard</h2>
          <div className="p-4 rounded-2xl border shadow-sm border-gray-600 hover:border-[#1be7ff] hover:border-[2px] hover:shadow-xl hover:scale-101 duration-300">
            <button
              onClick={() => navigate("/createcomplent")}
              className="w-full border border-gray-400 p-3 rounded h-[500px] cursor-pointer text-2xl hover:font-bold hover:text-orange-700 hover:rounded-4xl hover:border-black hover:border-[2px] hover:shadow-2xl hover:scale-101 duration-300"
            >
              New Complaint
            </button>
          </div>
        </div>

        <div className="w-full border rounded-2xl mt-[20px] space-y-6">
          <div className="p-4 rounded shadow overflow-x-auto">
            <h3 className="text-lg font-semibold mb-2 text-center">
              Complaint Reports by You
            </h3>

            {complaints.map((c) => (
              <div
                key={c._id}
                className="border rounded-2xl p-[18px] mb-4 border-gray-600 hover:border-[#1be7ff] hover:border-[2px] hover:shadow-xl hover:scale-101 duration-300"
              >
                <div className="flex justify-between">
                  <div>
                    Reported: {new Date(c.createdAt).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => toggleDetails(c._id)}
                    className="font-bold text-blue-600 hover:underline"
                  >
                    {selectedId === c._id ? "Hide Details" : "View Details"}
                  </button>
                </div>

                <div className="text-xl font-bold">
                  Description: {c.description}
                </div>

                <div className="text-sm">Reasons: {c.reasons.join(", ")}</div>

                <div className="flex justify-between mt-2">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} /> Location
                  </div>
                  <div className="font-bold flex">
                    Status:
                    <span className="text-green-800 ml-2">
                      {c.isTrue ? "Submitted" : "Pending"}
                    </span>
                  </div>
                </div>

                {/* 🔽 Show image only when clicked */}
                {selectedId === c._id && c.image && (
                  <div className="mt-4">
                    <img
                      src={`http://localhost:5050${c.image}`}
                      alt="Complaint"
                      className="w-64 h-64 object-cover rounded shadow"
                    />
                  </div>
                )}
              </div>
            ))}

            {complaints.length === 0 && (
              <p className="text-center mt-4">No complaints submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Getcomplent;
