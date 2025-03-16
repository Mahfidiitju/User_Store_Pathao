const validateMobileNumber = (req, res, next) => {
    const mobileNumber = req.body.phone;
  
    const mobileRegex = /^(?:\+88|88)?01[3-9][0-9]{8}$/;
  
    if (!mobileNumber || !mobileRegex.test(mobileNumber)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }
  
    next();
  };
  
  module.exports = validateMobileNumber;
  