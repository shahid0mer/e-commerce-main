import express from 'express';


const orderRouter = express.Router();
import {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
} from '../controllers/orderController.js';   

orderRouter.post('/create', createOrder);
orderRouter.get('/view/:id', getOrder);
orderRouter.put('/update/:id', updateOrder);
orderRouter.delete('/delete/:id', deleteOrder);
orderRouter.get('/viewall', getAllOrders);

export default orderRouter;