import { Router } from "express";
import { forgotPasswordController, getAllUsers, getAllUsersfromdb, loginController, logoutController, refreshToken,  registerUserController, resetpassword, updateUserDetails, uploadAvatar, verifyEmailController, verifyForgotPasswordOtp } from "../controllers/user.cntroller.js";
import auth from "../middleware/auth.js"; 
import upload from "../middleware/multer.js";

const userRouter = Router()


userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginController)
userRouter.post('/getall',auth ,getAllUsers)
userRouter.post('/getallusers',auth ,getAllUsersfromdb)
userRouter.post('/logout',auth ,logoutController)
userRouter.put('/upload-avatar',auth ,upload.single('avatar'), uploadAvatar)
userRouter.put('/update-user',auth ,updateUserDetails)
userRouter.put('/forgot-password' ,forgotPasswordController)
userRouter.put('/verify-forgot-password-otp' ,verifyForgotPasswordOtp)
userRouter.put('/reset-password' ,resetpassword)
userRouter.post('/refresh-token' ,refreshToken)

export default userRouter;