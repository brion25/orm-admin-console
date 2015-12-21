import {Router} from "express";
import {createModel, getModel, deleteModel, updateModel} from "./model/index.js";
import {createItem, getItem, updateItem, deleteItem} from "./item/index.js";

const router = Router();

router.route('/model/:name?')
  .get(getModel)
  .post(createModel)
  .put(updateModel)
  .delete(deleteModel);

router.route('/:modelName/:id?')
  .get(getItem)
  .post(createItem)
  .put(updateItem)
  .delete();

export default router;
