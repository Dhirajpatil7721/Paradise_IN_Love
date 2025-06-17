import { Router } from 'express'
import auth from '../middleware/auth.js'
// import { CashOnDeliveryOrderController, getOrderDetailsController, paymentController, webhookStripe } from '../controllers/order.controller.js'
import { CashOnDeliveryOrderController,  deleteOrderByOrderId,  getAllOrdersFromDB, getOrderDetailsController} from '../controllers/order.controller.js'

const orderRouter = Router()

orderRouter.post("/cash-on-delivery",auth,CashOnDeliveryOrderController)
// orderRouter.post('/checkout',auth,paymentController)
// orderRouter.post('/webhook',webhookStripe)
orderRouter.get("/order-list",auth,getOrderDetailsController)
orderRouter.get("/all-order-list",auth,getAllOrdersFromDB)
orderRouter.delete("/cancel-order",auth,deleteOrderByOrderId)

export default orderRouter