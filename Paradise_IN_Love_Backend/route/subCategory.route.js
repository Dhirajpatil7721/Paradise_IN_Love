import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddSubCategoryController, deleteSubCategoryController, getSubcategoriesByCategory, getSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.controller.js";


const subCategoryRouter = Router()

subCategoryRouter.post('/create-subcategory',auth,AddSubCategoryController)
subCategoryRouter.post('/get-subcategory',getSubCategoryController)
subCategoryRouter.put('/update-subcategory',auth,updateSubCategoryController)
subCategoryRouter.delete('/delete-subcategory',auth,deleteSubCategoryController)
subCategoryRouter.post('/get-subcategory-by-Id',auth,getSubcategoriesByCategory)

export default subCategoryRouter