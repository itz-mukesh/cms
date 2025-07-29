

import React, { useEffect, useState } from "react";

const Dashboard3 = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/complaints")
      .then((res) => res.json())
      .then((data) => setComplaints(data.data))
      .catch((err) => console.error("Error fetching complaints:", err));
  }, []);

  return (
    <div className="pt-[100px] px-4">
      <h1 className="text-3xl font-bold mb-6">Official Dashboard</h1>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-300 bg-white text-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 font-semibold">
                Complaint Reason
              </th>
              <th className="text-left px-6 py-3 font-semibold">Reported By</th>
              <th className="text-left px-6 py-3 font-semibold">
                Reported Location
              </th>
              <th className="text-left px-6 py-3 font-semibold">
                Reported Date & Time
              </th>
              <th className="text-left px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c, i) => (
              <tr
                key={c._id}
                className={i % 2 === 0 ? "bg-blue-50" : "bg-white"}
              >
                <td className="px-6 py-4">{c.reasons.join(", ")}</td>
                <td className="px-6 py-4">{c.name || "Anonymous"}</td>
                <td className="px-6 py-4">{c.address || "N/A"}</td>
                <td className="px-6 py-4">
                  {new Date(c.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-4 py-1 rounded-full text-white font-semibold ${
                      c.isTrue ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {c.isTrue ? "SOLVED" : "REJECTED"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {complaints.length === 0 && (
          <p className="text-center mt-4">No complaints found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard3;
