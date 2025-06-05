import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "../configs/cloudinary.js";
import streamifier from "streamifier";

await connectCloudinary();

// View Product : /api/product/id
export const productView = async (req, res) => {
  try {
    const { id } = req.params || req.body;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Add Product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    console.log("req.files:", req.files);
    if (!req.files || req.files.length === 0) {
      return res.json({ success: false, message: "No files uploaded" });
    }

    const productData = JSON.parse(req.body.productData);

    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const imagesUrl = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );

    await Product.create({ ...productData, images: imagesUrl });

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Update stock : /api/product/update/:id 
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.params || req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );
    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Update Product: /api/product/updateproduct/:id

export const updatefullProduct = async (req, res) => {
  try {
    const { id } = req.params;

    
    const updatedData = JSON.parse(req.body.productData);

    
    let updatedImages = [];

    if (req.files && req.files.length > 0) {
      const uploadToCloudinary = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      updatedImages = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );

      
      updatedData.images = updatedImages;
    }

    
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete Product : /api/product/delete/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params || req.body;
    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get All Products : /api/product/all
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get Products by Category : /api/product/category/:category
export const getProductsByCategory = async (req, res) => {
  res.send({ message: "product controller" });
};

// Search Products : /api/product/search/:query
export const searchProducts = async (req, res) => {
  res.send({ message: "product controller" });
};
