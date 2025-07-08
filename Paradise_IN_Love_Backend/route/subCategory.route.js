import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddSubCategoryController, deleteSubCategoryController, getSubcategoriesByCategory, getSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.controller.js";
import { admin } from "../middleware/Admin.js";


const subCategoryRouter = Router()

subCategoryRouter.post('/create-subcategory',auth,admin,AddSubCategoryController)
subCategoryRouter.post('/get-subcategory',getSubCategoryController)
subCategoryRouter.put('/update-subcategory',auth,admin,updateSubCategoryController)
subCategoryRouter.delete('/delete-subcategory',auth,admin, deleteSubCategoryController)
subCategoryRouter.post('/get-subcategory-by-Id',auth,getSubcategoriesByCategory)

export default subCategoryRouter