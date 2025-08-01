const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ msg: "Server Error", error: err.message });
};

export default errorHandler;



