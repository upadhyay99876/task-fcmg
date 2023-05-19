const jwt = require("jsonwebtoken");
//***HERE I AM SUPPOSE JWT__SECRET=12345 */

const verifyUser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(400).send("access denied");
  
    try {
      const verifiedUser = jwt.verify(token, "12345");
      req.user = verifiedUser;
      next();
    } catch (err) {
      res.status(400).send("invalid token");
    }
};


module.exports = { verifyUser }