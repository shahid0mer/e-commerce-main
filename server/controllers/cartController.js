import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// View Cart :/api/cart/:user_id
export const cartView = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ user_id: userId }).populate(
      "items.product_id"
    );

    if (!cart) {
      return res.json({ success: true, cart: { items: [] } });
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add :/api/cart/add
export const addCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
      return res.json({
        success: false,
        message: "Missing product or quantity",
      });
    }

    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      cart = new Cart({
        user_id: userId,
        items: [{ product_id, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product_id.toString() === product_id
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product_id, quantity });
      }
    }

    await cart.save();
    res.json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Update cart :/api/cart/update
export const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { product_id, quantity } = req.body;

    let cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product_id.toString() === product_id
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      return res.json({ success: false, message: "Item not found in cart" });
    }

    await cart.save();
    res.json({ success: true, message: "Cart updated", cart });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove an Item : /api/cart/remove
export const removeCart = async (req, res) => {
  try {
    const { userId } = req;
    const { product_id } = req.body;

    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) return res.json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product_id.toString() !== product_id
    );
    await cart.save();

    res.json({ success: true, message: "Item removed", cart });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear Entire Cart : /api/cart/clear
export const clearCart = async (req, res) => {
  try {
    const { user_id } = req.body;
    await Cart.findOneAndUpdate({ user_id }, { $set: { items: [] } });
    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
