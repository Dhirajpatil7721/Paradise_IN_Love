// import Stripe from "../config/stripe.js";
// import CartProductModel from "../models/cartproduct.model.js";
// import OrderModel from "../models/order.model.js";
// import UserModel from "../models/user.model.js";
// import mongoose from "mongoose";

//  export async function CashOnDeliveryOrderController(request,response){
//     try {
//         const userId = request.userId // auth middleware 
//         const { list_items, totalAmt, addressId,subTotalAmt } = request.body 

//         const payload = list_items.map(el => {
//             return({
//                 userId : userId,
//                 orderId : `ORD-${new mongoose.Types.ObjectId()}`,
//                 productId : el.productId._id, 
//                 product_details : {
//                     name : el.productId.name,
//                     image : el.productId.image
//                 } ,
//                 paymentId : "",
//                 payment_status : "CASH ON DELIVERY",
//                 delivery_address : addressId ,
//                 subTotalAmt  : subTotalAmt,
//                 totalAmt  :  totalAmt,
//             })
//         })

//         const generatedOrder = await OrderModel.insertMany(payload)

//         ///remove from the cart
//         const removeCartItems = await CartProductModel.deleteMany({ userId : userId })
//         const updateInUser = await UserModel.updateOne({ _id : userId }, { shopping_cart : []})

//         return response.json({
//             message : "Order successfully",
//             error : false,
//             success : true,
//             data : generatedOrder
//         })

//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error ,
//             error : true,
//             success : false
//         })
//     }
// }

// export const pricewithDiscount = (price,dis = 1)=>{
//     const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100)
//     const actualPrice = Number(price) - Number(discountAmout)
//     return actualPrice
// }

// export async function paymentController(request,response){
//     try {
//         const userId = request.userId // auth middleware 
//         const { list_items, totalAmt, addressId,subTotalAmt } = request.body 

//         const user = await UserModel.findById(userId)

//         const line_items  = list_items.map(item =>{
//             return{
//                price_data : {
//                     currency : 'inr',
//                     product_data : {
//                         name : item.productId.name,
//                         images : item.productId.image,
//                         metadata : {
//                             productId : item.productId._id
//                         }
//                     },
//                     unit_amount : pricewithDiscount(item.productId.price,item.productId.discount) * 100   
//                },
//                adjustable_quantity : {
//                     enabled : true,
//                     minimum : 1
//                },
//                quantity : item.quantity 
//             }
//         })

//         const params = {
//             submit_type : 'pay',
//             mode : 'payment',
//             payment_method_types : ['card'],
//             customer_email : user.email,
//             metadata : {
//                 userId : userId,
//                 addressId : addressId
//             },
//             line_items : line_items,
//             success_url : `${process.env.FRONTEND_URL}/success`,
//             cancel_url : `${process.env.FRONTEND_URL}/cancel`
//         }

//         const session = await Stripe.checkout.sessions.create(params)

//         return response.status(200).json(session)

//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }


// const getOrderProductItems = async({
//     lineItems,
//     userId,
//     addressId,
//     paymentId,
//     payment_status,
//  })=>{
//     const productList = []

//     if(lineItems?.data?.length){
//         for(const item of lineItems.data){
//             const product = await Stripe.products.retrieve(item.price.product)

//             const paylod = {
//                 userId : userId,
//                 orderId : `ORD-${new mongoose.Types.ObjectId()}`,
//                 productId : product.metadata.productId, 
//                 product_details : {
//                     name : product.name,
//                     image : product.images
//                 } ,
//                 paymentId : paymentId,
//                 payment_status : payment_status,
//                 delivery_address : addressId,
//                 subTotalAmt  : Number(item.amount_total / 100),
//                 totalAmt  :  Number(item.amount_total / 100),
//             }

//             productList.push(paylod)
//         }
//     }

//     return productList
// }

// //http://localhost:8080/api/order/webhook
// export async function webhookStripe(request,response){
//     const event = request.body;
//     const endPointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY

//     console.log("event",event)

//     // Handle the event
//   switch (event.type) {
//     case 'checkout.session.completed':
//       const session = event.data.object;
//       const lineItems = await Stripe.checkout.sessions.listLineItems(session.id)
//       const userId = session.metadata.userId
//       const orderProduct = await getOrderProductItems(
//         {
//             lineItems : lineItems,
//             userId : userId,
//             addressId : session.metadata.addressId,
//             paymentId  : session.payment_intent,
//             payment_status : session.payment_status,
//         })

//       const order = await OrderModel.insertMany(orderProduct)

//         console.log(order)
//         if(Boolean(order[0])){
//             const removeCartItems = await  UserModel.findByIdAndUpdate(userId,{
//                 shopping_cart : []
//             })
//             const removeCartProductDB = await CartProductModel.deleteMany({ userId : userId})
//         }
//       break;
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a response to acknowledge receipt of the event
//   response.json({received: true});
// }


// export async function getOrderDetailsController(request,response){
//     try {
//         const userId = request.userId // order id

//         const orderlist = await OrderModel.find({ userId : userId }).sort({ createdAt : -1 }).populate('delivery_address')

//         return response.json({
//             message : "order list",
//             data : orderlist,
//             error : false,
//             success : true
//         })
//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }


import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";
import ProductModel from "../models/product.model.js"; 

// Cash on Delivery Order Controller
// export async function CashOnDeliveryOrderController(request, response) {
//     try {
//         const userId = request.userId; // from auth middleware
//         const { list_items, totalAmt, addressId, subTotalAmt } = request.body;

//         const payload = list_items.map(el => ({
//             userId: userId,
//             orderId: `ORD-${new mongoose.Types.ObjectId()}`,
//             productId: el.productId._id,
//             product_details: {
//                 name: el.productId.name,
//                 image: el.productId.image,
//             },
//             paymentId: "",
//             payment_status: "CASH ON DELIVERY",
//             delivery_address: addressId,
//             subTotalAmt: subTotalAmt,
//             totalAmt: totalAmt,
//         }));

//         const generatedOrder = await OrderModel.insertMany(payload);

//         // Clear user's cart
//         await CartProductModel.deleteMany({ userId });
//         await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });

//         return response.json({
//             message: "Order placed successfully",
//             error: false,
//             success: true,
//             data: generatedOrder,
//         });

//     } catch (error) {
//         return response.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false,
//         });
//     }
// }

//Order Place 
// export async function CashOnDeliveryOrderController(request, response) {
//     try {
//         const userId = request.userId; // From auth middleware
//         const { list_items, totalAmt, addressId, subTotalAmt } = request.body;

//         const payload = list_items.map(el => ({
//             userId: userId,
//             orderId: `ORD-${new mongoose.Types.ObjectId()}`,
//             productId: el.productId._id,
//             product_details: {
//                 name: el.productId.name,
//                 image: el.productId.image,
//                 size: el.size, 
//             },
//             paymentId: "",
//             payment_status: "CASH ON DELIVERY",
//             delivery_address: addressId,
//             subTotalAmt: subTotalAmt,
//             totalAmt: totalAmt,
//         }));

//         const generatedOrder = await OrderModel.insertMany(payload);

//         // Clear user's cart
//         await CartProductModel.deleteMany({ userId });
//         await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });

//         return response.json({
//             message: "Order placed successfully",
//             error: false,
//             success: true,
//             data: generatedOrder,
//         });

//     } catch (error) {
//         return response.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false,
//         });
//     }
// }

//cash On Delivary
// export async function CashOnDeliveryOrderController(request, response) {
//     try {
//         const userId = request.userId; // From auth middleware
//         const { list_items, totalAmt, addressId, subTotalAmt } = request.body;

//         const payload = list_items.map(el => ({
//             userId: userId,
//             orderId: `ORD-${new mongoose.Types.ObjectId()}`,
//             productId: el.productId._id,
//             product_details: {
//                 name: el.productId.name,
//                 image: el.productId.image,
//                 size: el.size,
//                 color: el.color,
//             },
//             quantity: el.quantity, // ✅ Mapped at top-level
//             paymentId: "",
//             payment_status: "CASH ON DELIVERY",
//             delivery_address: addressId,
//             subTotalAmt: subTotalAmt,
//             totalAmt: totalAmt,
//         }));


//         const generatedOrder = await OrderModel.insertMany(payload);

//         // Clear user's cart
//         await CartProductModel.deleteMany({ userId });
//         await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });

//         return response.json({
//             message: "Order placed successfully",
//             error: false,
//             success: true,
//             data: generatedOrder,
//         });

//     } catch (error) {
//         return response.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false,
//         });
//     }
// }
export async function CashOnDeliveryOrderController(request, response) {
    try {
        const userId = request.userId; // From auth middleware
        const { list_items, totalAmt, addressId, subTotalAmt } = request.body;

        const payload = list_items.map(el => ({
            userId: userId,
            orderId: `ORD-${new mongoose.Types.ObjectId()}`,
            productId: el.productId._id,
            product_details: {
                name: el.productId.name,
                image: el.productId.image,
                size: el.size,
                color: el.color,
            },
            quantity: el.quantity,
            paymentId: "",
            payment_status: "CASH ON DELIVERY",
            delivery_address: addressId,
            subTotalAmt: subTotalAmt,
            totalAmt: totalAmt,
        }));

        // Update stock for each product
        for (const item of list_items) {
            const productId = item.productId._id;
            const quantityOrdered = item.quantity;

            const product = await ProductModel.findById(productId);

            if (!product) {
                return response.status(404).json({
                    message: `Product not found with ID: ${productId}`,
                    error: true,
                    success: false,
                });
            }

            if (product.stock < quantityOrdered) {
                return response.status(400).json({
                    message: `Insufficient stock for product: ${product.name}`,
                    error: true,
                    success: false,
                });
            }

            product.stock -= quantityOrdered;
            await product.save();
        }

        // Create orders
        const generatedOrder = await OrderModel.insertMany(payload);

        // Clear user's cart
        await CartProductModel.deleteMany({ userId });
        await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });

        return response.json({
            message: "Order placed successfully",
            error: false,
            success: true,
            data: generatedOrder,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

// Get User Order Details
export async function getOrderDetailsController(request, response) {
    try {
        const userId = request.userId;

        const orderlist = await OrderModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .populate('delivery_address');

        return response.json({
            message: "Order list retrieved",
            data: orderlist,
            error: false,
            success: true,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}


//Get all Orders Admin
export const getAllOrdersFromDB = async (req, res) => {
    try {
        const orders = await OrderModel.find()
            .populate("userId")
            .populate("productId")
            .populate("delivery_address");

        res.status(200).json({
            success: true,
            message: "All orders fetched successfully",
            data: orders,
        });
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        res.status(500).json({
            success: false,
            message: "Error while fetching orders",
            error: error.message,
        });
    }
};

// Delete order using orderId from req.body
export const deleteOrderByOrderId = async (req, res) => {
  try {
    const { orderId } = req.body; // <- from body

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId is required in request body",
      });
    }

    const deletedOrder = await OrderModel.findOneAndDelete({ orderId });

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "No order found with the given orderId",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order:", error.message);
    res.status(500).json({
      success: false,
      message: "Error while deleting order",
      error: error.message,
    });
  }
};

//Status Update 
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body; // both from body

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "orderId and status are required in request body",
      });
    }

    const validStatus = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updatedOrder = await OrderModel.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "No order found with the given orderId",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating order status",
      error: error.message,
    });
  }
};




