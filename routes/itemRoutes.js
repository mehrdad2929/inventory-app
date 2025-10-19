const { Router } = require("express")
const itemController = require('../controllers/itemController');
const itemRouter = Router();

itemRouter.get('/', itemController.getItems);
itemRouter.get('/add', itemController.addItemGet);
itemRouter.post('/add', itemController.addItemPost);
itemRouter.get('/:id', itemController.getItem);
itemRouter.get('/:id/update', itemController.updateItemGet);
itemRouter.post('/:id/update', itemController.updateItemPost);
// itemRouter.post('/:id/delete', itemController.deleteItem);

module.exports = itemRouter;
