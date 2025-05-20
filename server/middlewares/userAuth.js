import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not authorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.id) {
      if (!req.body) {
        req.body = {};
      }
      req.body.userId = decodedToken.id;
    } else {
      return res.json({ success: false, message: "Not authorized" });
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default authUser;
