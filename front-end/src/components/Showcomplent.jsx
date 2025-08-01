// // import React, { useEffect, useState } from "react";

// // const Showcomplent = () => {
// //   const [complaints, setComplaints] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:5050/api/complaint/get-all")
// //       .then((res) => res.json())
// //       .then((data) => setComplaints(data.data))
// //       .catch((err) => console.error("Error fetching complaints:", err));
// //   }, []);

// //   return (
// //     <div className="pt-[100px] px-4">
// //       <h1 className="text-3xl font-bold mb-6">Official Dashboard</h1>

// //       {/* Table */}
// //       <div className="overflow-x-auto rounded-xl shadow">
// //         <table className="min-w-full divide-y divide-gray-300 bg-white text-black">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="text-left px-6 py-3 font-semibold">
// //                 Complaint Reason
// //               </th>
// //               <th className="text-left px-6 py-3 font-semibold">Reported By</th>
// //               <th className="text-left px-6 py-3 font-semibold">
// //                 Reported Location
// //               </th>
// //               <th className="text-left px-6 py-3 font-semibold">
// //                 Reported Date & Time
// //               </th>
// //               <th className="text-left px-6 py-3 font-semibold">Status</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {complaints.map((c, i) => (
// //               <tr
// //                 key={c._id}
// //                 className={i % 2 === 0 ? "bg-blue-50" : "bg-white"}
// //               >
// //                 <td className="px-6 py-4">{c.reasons.join(", ")}</td>
// //                 <td className="px-6 py-4">{c.name || "Anonymous"}</td>
// //                 <td className="px-6 py-4">{c.address || "N/A"}</td>
// //                 <td className="px-6 py-4">
// //                   {new Date(c.createdAt).toLocaleString()}
// //                 </td>
// //                 <td className="px-6 py-4">
// //                   <span
// //                     className={`px-4 py-1 rounded-full text-white font-semibold ${
// //                       c.isTrue ? "bg-green-600" : "bg-red-600"
// //                     }`}
// //                   >
// //                     {c.isTrue ? "SOLVED" : "REJECTED"}
// //                   </span>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>

// //         {complaints.length === 0 && (
// //           <p className="text-center mt-4">No complaints found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Showcomplent;

// import React, { useEffect, useState } from "react";

// const Showcomplent = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);

//   const fetchData = () => {
//     fetch("http://localhost:5050/api/complaint/get-all")
//       .then((res) => res.json())
//       .then((data) => setComplaints(data.data))
//       .catch((err) => console.error("Error fetching complaints:", err));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleStatusChange = async (id, isTrue) => {
//     try {
//       await fetch(`http://localhost:5050/api/complaint/update-status/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ isTrue }),
//       });

//       fetchData(); // Refresh complaints
//       setSelectedId(null); // Collapse after update
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const toggleImage = (id) => {
//     setSelectedId((prev) => (prev === id ? null : id));
//   };

//   return (
//     <div className="pt-[100px] px-4">
//       <h1 className="text-3xl font-bold mb-6">Official Dashboard</h1>

//       <div className="overflow-x-auto rounded-xl shadow">
//         <table className="min-w-full divide-y divide-gray-300 bg-white text-black">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="text-left px-6 py-3 font-semibold">
//                 Complaint Reason
//               </th>
//               <th className="text-left px-6 py-3 font-semibold">Reported By</th>
//               <th className="text-left px-6 py-3 font-semibold">Location</th>
//               <th className="text-left px-6 py-3 font-semibold">Date & Time</th>
//               <th className="text-left px-6 py-3 font-semibold">Status</th>
//               <th className="text-left px-6 py-3 font-semibold">Image</th>
//             </tr>
//           </thead>
//           <tbody>
//             {complaints.map((c, i) => (
//               <React.Fragment key={c._id}>
//                 <tr className={i % 2 === 0 ? "bg-blue-50" : "bg-white"}>
//                   <td className="px-6 py-4">{c.reasons.join(", ")}</td>
//                   <td className="px-6 py-4">{c.name || "Anonymous"}</td>
//                   <td className="px-6 py-4">{c.address || "N/A"}</td>
//                   <td className="px-6 py-4">
//                     {new Date(c.createdAt).toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-4 py-1 rounded-full text-white font-semibold ${
//                         c.isTrue === true
//                           ? "bg-green-600"
//                           : c.isTrue === false
//                           ? "bg-red-600"
//                           : "bg-yellow-500"
//                       }`}
//                     >
//                       {c.isTrue === true
//                         ? "ACCEPTED"
//                         : c.isTrue === false
//                         ? "REJECTED"
//                         : "PENDING"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     {c.image ? (
//                       <button
//                         className="text-blue-600 underline"
//                         onClick={() => toggleImage(c._id)}
//                       >
//                         {selectedId === c._id ? "Hide" : "View"}
//                       </button>
//                     ) : (
//                       "No Image"
//                     )}
//                   </td>
//                 </tr>

//                 {selectedId === c._id && c.image && (
//                   <tr className="bg-gray-100">
//                     <td colSpan="6" className="px-6 py-4">
//                       <div className="flex flex-col items-center">
//                         <img
//                           src={`http://localhost:5050${c.image}`}
//                           alt="Complaint"
//                           className="w-64 h-64 object-cover rounded shadow mb-4"
//                         />
//                         <div className="flex gap-4">
//                           <button
//                             onClick={() => handleStatusChange(c._id, true)}
//                             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
//                           >
//                             Accept
//                           </button>
//                           <button
//                             onClick={() => handleStatusChange(c._id, false)}
//                             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
//                           >
//                             Reject
//                           </button>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>

//         {complaints.length === 0 && (
//           <p className="text-center mt-4">No complaints found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Showcomplent;

import React, { useEffect, useState } from "react";

const Showcomplent = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:5050/api/complaint/get-all")
      .then((res) => res.json())
      .then((data) => setComplaints(data.data))
      .catch((err) => console.error("Error fetching complaints:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, isTrue) => {
    try {
      await fetch(`http://localhost:5050/api/complaint/update-status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isTrue }),
      });

      fetchData(); // Refresh complaints
      setSelectedId(null); // Collapse after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const toggleImage = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="pt-[100px] px-4">
      <h1 className="text-3xl font-bold mb-6">Official Dashboard</h1>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-300 bg-white text-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 font-semibold">
                Complaint Reason
              </th>
              <th className="text-left px-6 py-3 font-semibold">Reported By</th>
              <th className="text-left px-6 py-3 font-semibold">Location</th>
              <th className="text-left px-6 py-3 font-semibold">Date & Time</th>
              <th className="text-left px-6 py-3 font-semibold">Status</th>
              <th className="text-left px-6 py-3 font-semibold">Image</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c, i) => (
              <React.Fragment key={c._id}>
                <tr className={i % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <td className="px-6 py-4">{c.reasons.join(", ")}</td>
                  <td className="px-6 py-4">{c.name || "Anonymous"}</td>
                  <td className="px-6 py-4">{c.address || "N/A"}</td>
                  <td className="px-6 py-4">
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-1 rounded-full text-white font-semibold ${
                        c.isTrue === true
                          ? "bg-green-600"
                          : c.isTrue === false
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {c.isTrue === true
                        ? "ACCEPTED"
                        : c.isTrue === false
                        ? "REJECTED"
                        : "PENDING"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => toggleImage(c._id)}
                    >
                      {selectedId === c._id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {selectedId === c._id && (
                  <tr className="bg-gray-100">
                    <td colSpan="6" className="px-6 py-4">
                      <div className="flex flex-col items-center">
                        {c.image ? (
                          <img
                            src={`http://localhost:5050${c.image}`}
                            alt="Complaint"
                            className="w-64 h-64 object-cover rounded shadow mb-4"
                          />
                        ) : (
                          <p className="text-gray-500 italic mb-4">
                            No image provided for this complaint.
                          </p>
                        )}

                        <div className="flex gap-4">
                          <button
                            onClick={() => handleStatusChange(c._id, true)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusChange(c._id, false)}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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

export default Showcomplent;
