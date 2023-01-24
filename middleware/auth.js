import jwt from "jsonwebtoken";

// Middleware to check if user is authenticated
const authenticate = (req, res, next) => {
  try {
    // Splits the bearer and token from the authorization header
    const token = req.headers["authorization"].split(" ")[1];
    // Verifies the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "You are not authenticated!",
          success: false,
        });
      } else {
        req.UserId = decoded.id;
        next();
      }
    });
  } catch (error) {
    res
      .status(401)
      .send({ message: "You are not authenticated!", success: false });
  }
};

export default authenticate;
