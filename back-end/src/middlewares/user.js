
 const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // agar response bhej diya gaya to next pe bhej do
  }

  console.error("Handled Error:", err.message);
  res.status(500).json({ success: false, msg: err.message });
};

export default errorHandler