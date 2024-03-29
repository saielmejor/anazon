import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../model/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();
//use isAuth to allow to get the token from the utils js
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    //save the order function
    const order = await newOrder.save();
    res.status(201).send({ message: "New order Created", order });
  })
);


//get orders of current user 

orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req,res)=>{ 
  const orders=await Order.find({user:req.user._id})
  res.send(orders)
}))

// get the data from the backend

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
      
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

//use the put method to update the order after is paid 

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async(req,res)=>{ 
  const order=await Order.findById(req.params.id); 
  if(order){ 
    order.isPaid=true; 
    order.paidAt=Date.now(); 
    order.paymentResult={ 
      id:req.body.id, 
      status:req.body.status, 
      update_time:req.body.update_time, 
      email_address:req.body.email_address,

    }; 
    //update the order 
    const updatedOrder=await order.save(); 
    res.send({message:'Order Paid', order:updatedOrder}); 

  }else{ 
    res.status(404).send({message:'Order is not found'})
  }
}))

export default orderRouter;
