const auth = (req, res, next) => {
    try {
      const secretKey = process.env.SECRET_KEY;
  
      if (!req.headers.authorization) {
        return res.status(401).json({
          data: [],
          status: "error",
          error: "Login required",
        });
      }
  
      const token = req.headers.authorization.split(' ')[1]; // Extract token
      const decoded = jwt.verify(token, secretKey); // Verify token
  
      if (!decoded) {
        return res.status(401).json({
          data: [],
          status: "error",
          error: "Login required",
        });
      }
  
      req.user = decoded; // Attach decoded token data to request
      next();
    } catch (error) {
      res.status(403).json({
        data: [],
        status: "error",
        error: "Invalid or expired token",
      });
    }
  };
  
  module.exports = auth;
  