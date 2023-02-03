// Middleware to check if user is admin

export const adminAuth = async (req, res, next) => {
  try {
    const adminCheck = req.body.isAdmin;
    if (adminCheck) {
      next();
    } else {
      res.status(403).send({
        message: "You are not authorized to perform this action",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error checking if user is admin",
      success: false,
      error,
    });
  }
};

export default adminAuth;
