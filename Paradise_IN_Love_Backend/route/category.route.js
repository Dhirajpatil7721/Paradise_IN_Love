import { Router } from 'express'
import auth from '../middleware/auth.js'
import { AddCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from '../controllers/category.controller.js'
import { admin } from '../middleware/Admin.js'

const categoryRouter = Router()

categoryRouter.post("/add-category",admin,AddCategoryController)
categoryRouter.get("/get-category",getCategoryController)
categoryRouter.put("/update-category",admin,updateCategoryController)
categoryRouter.delete("/delete-category",admin,deleteCategoryController)

export default categoryRouter;
