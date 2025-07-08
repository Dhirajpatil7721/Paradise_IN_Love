import { Router } from 'express'
import auth from '../middleware/auth.js'
import { AddCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from '../controllers/category.controller.js'
import { admin } from '../middleware/Admin.js'

const categoryRouter = Router()

categoryRouter.post("/add-category",auth,admin,AddCategoryController)
categoryRouter.get("/get-category",auth,getCategoryController)
categoryRouter.put("/update-category",auth,admin,updateCategoryController)
categoryRouter.delete("/delete-category",auth,admin,deleteCategoryController)

export default categoryRouter;