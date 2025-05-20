// seller Registration : /api/seller/register

import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";
import bcrypt from "bcryptjs";

export const registerSeller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Details Missing" });
    }

    const existingSeller = await Seller.findOne({ email });

    if (existingSeller) {
      return res.json({ success: false, message: "Seller Exists" });
    }

    const hashedPasssword = await bcrypt.hash(password, 10);

    const seller = await Seller.create({
      name,
      email,
      password: hashedPasssword,
    });

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // csrf protection
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "seller Registered",
      seller: { email: seller.email, name: seller.name },
    });
  } catch (error) {
    console.log(error.message);

    return res.json({ success: false, message: error.message });
  }
};

// Seller Registration : /api/seller/login

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.json({ success: false, message: "Seller Does not Exist" });
    }

    const isPassMatch = await bcrypt.compare(password, seller.password);

    if (!isPassMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // csrf protection
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Seller LoggedIn",
      seller: { email: seller.email, name: seller.name },
    });
  } catch (error) {
    console.log(error.message);

    return res.json({ success: false, message: error.message });
  }
};

// Check SellerAuthorisation : /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
  try {
    const { sellerId } = req.body;

    const seller = await Seller.findById(sellerId).select("-password");

    return res.json({
      success: true,
      message: `${seller.name} authorized`,
      seller,
    });
  } catch (error) {
    console.log(error.message);

    return res.json({ success: false, message: error.message });
  }
};

export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Seller Logged Out" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const viewProfile = async (req, res) => {
  try {
    const { sellerId } = req.body;

    const seller = await Seller.findById(sellerId).select("-password");

    return res.json({
      success: true,
      message: `${seller.name} profile`,
      seller,
    });
  } catch (error) {
    console.log(error.message);

    return res.json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { sellerId, name, email } = req.body;

    if (!name || !email) {
      return res.json({ success: false, message: "Details Missing" });
    }

    const seller = await Seller.findByIdAndUpdate(
      sellerId,
      { name, email },
      { new: true }
    ).select("-password");

    return res.json({
      success: true,
      message: `${seller.name} profile updated`,
      seller,
    });
  } catch (error) {
    console.log(error.message);

    return res.json({ success: false, message: error.message });
  }
};
