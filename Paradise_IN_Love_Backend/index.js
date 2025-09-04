import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet, { crossOriginResourcePolicy } from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'
import reviewproduct from './route/Review.route.js'
import wishlistrouter from './route/wishlist.route.js'
import createAdmin from './createAdmin.js'


const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({

    crossOriginResourcePolicy: false
}))

const PORT=8080 || process.env.PORT


app.get("/",(request , response)=>{
// server to client side
response.json({
    message:"Server is Running" + PORT
})
})

// connectDB().then(()=>{
    
//     app.listen(PORT,()=>{
//         console.log("Server is running " ,PORT);
        
//     })
// })


// Connect DB & Create Default Admin
connectDB().then(async () => {
  await createAdmin(); // <-- Call here

  app.listen(PORT, () => {
    console.log("🚀 Server is running on PORT", PORT);
  });
});

app.use('/api/user' ,userRouter)
app.use('/api/category' ,categoryRouter)
app.use('/api/file' ,uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use('/api/wishlist',wishlistrouter)
app.use("/api/review",reviewproduct)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)



// ✅ Global CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,  //  http://localhost:5173
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));