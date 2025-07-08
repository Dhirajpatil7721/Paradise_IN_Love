import { Router } from 'express'
import auth from '../middleware/auth.js'
// import { CashOnDeliveryOrderController, getOrderDetailsController, paymentController, webhookStripe } from '../controllers/order.controller.js'
import { CashOnDeliveryOrderController,  deleteOrderByOrderId,  getAllOrdersFromDB, getOrderDetailsController, updateOrderStatus} from '../controllers/order.controller.js'
import { admin } from '../middleware/Admin.js'

const orderRouter = Router()

orderRouter.post("/cash-on-delivery",auth,CashOnDeliveryOrderController)
// orderRouter.post('/checkout',auth,paymentController)
// orderRouter.post('/webhook',webhookStripe)
orderRouter.get("/order-list",auth,getOrderDetailsController)
orderRouter.get("/all-order-list",auth,admin,getAllOrdersFromDB)
orderRouter.delete("/cancel-order",auth,deleteOrderByOrderId)
orderRouter.put("/status-order",auth,admin,updateOrderStatus)

export default orderRouter