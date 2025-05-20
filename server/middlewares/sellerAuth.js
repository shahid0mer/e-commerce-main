import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  if (!sellerToken) {
    return res.json({ success: false, message: "Not authorized" });
  }

  try {
    const decodedToken = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (decodedToken.id) {
      if (!req.body) {
        req.body = {};
      }
      req.body.sellerId = decodedToken.id;
    } else {
      return res.json({ success: false, message: "Not authorized" });
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default authSeller;
