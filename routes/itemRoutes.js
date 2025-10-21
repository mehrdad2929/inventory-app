const { Router } = require("express")
const itemController = require('../controllers/itemController');
const itemRouter = Router();

itemRouter.get('/', itemController.getItems);
itemRouter.get('/add', itemController.addItemGet);
itemRouter.post('/add', itemController.addItemPost);
itemRouter.post('/reset', itemController.resetInventoryPost);
itemRouter.get('/:id', itemController.getItem);
itemRouter.get('/:id/update', itemController.updateItemGet);
itemRouter.post('/:id/update', itemController.updateItemPost);
itemRouter.post('/:id/delete', itemController.deleteItemPost);

module.exports = itemRouter;
