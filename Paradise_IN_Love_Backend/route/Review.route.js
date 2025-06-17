import { Router } from 'express'
import auth from '../middleware/auth.js'
import { addReview, getProductDetails, getProductReviews } from '../controllers/Review.controller.js'


const reviewproduct = Router()

reviewproduct.post('/create',auth,addReview)
reviewproduct.get("/get",auth,getProductReviews)
reviewproduct.post('/product-details',auth,getProductDetails)

export default reviewproduct