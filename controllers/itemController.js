const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 30 characters.";

const validateItem = [
    body("name").trim()
        .notEmpty()
        .withMessage("Name is required")
        .matches(/^[A-Za-z\s'\-]+$/)
        .withMessage("Name can only contain letters, spaces, apostrophes, and hyphens")
        .isLength({ min: 1, max: 30 })
        .withMessage(`Name ${lengthErr}`),
    body("src")
        .optional()
        .isURL()
        .withMessage("Must be a valid URL"),
    body("price").trim()
        .isInt({ min: 0, max: 10000 })
        .withMessage(`price must be a number between 0 and 10000`),
    body("description")
        .optional()
        .trim()
        .isLength({ min: 0, max: 500 })
        .withMessage(`description shoulld be no more than 500 characters`)
];

async function addItemGet(req, res) {
    //TODO:adding try and catch for some of these operations(specialy the ones that are more prone to crash and error)
    res.render("add", {
        title: "adding item",
        categories: await db.getAllCategories(),
    });
};
let addItemPost = [
    validateItem,
    async (req, res) => {
        console.log('=== ADD ITEM POST ===');
        console.log('req.body:', req.body);
        console.log('category_id:', req.body.category_id);
        console.log('typeof category_id:', typeof req.body.category_id);
        const errors = validationResult(req);
        const categories = await db.getAllCategories();
        if (!errors.isEmpty()) {
            return res.status(400).render("add", {
                title: "add item",
                categories: categories,
                errors: errors.array()
            });
        }

        const { name, category_id, price, src, description } = req.body;
        await db.addItem({
            name,
            category_id,
            price,
            //TODO:gonna add a mechanisem to add img (wheter via url or upload)
            src: src || '/images/bread.svg',
            description: description === '' ? 'no description sry!' : description
        });
        res.redirect(`/`);
    }
];
async function updateItemGet(req, res) {
    const item = await db.getItemById(req.params.id);
    res.render("update", {
        title: "Update item",
        item: item,
        categories: await db.getAllCategories(),
    });
};
let updateItemPost = [
    validateItem,
    async (req, res) => {
        const item = await db.getItemById(req.params.id);
        console.log('=== UPDATE POST ===');
        console.log('req.body:', req.body);
        console.log('req.params:', req.params);
        console.log('req.params.id:', req.params.id);
        const errors = validationResult(req);
        console.log('Validation errors:', errors.array());
        if (!errors.isEmpty()) {
            return res.status(400).render("update", {
                title: "Update item",
                item: item,
                categories: await db.getAllCategories(),
                errors: errors.array()
            });
        }
        const { name, category_id, price, src, description } = req.body;

        console.log(`item's url:`, src);
        await db.updateItem(req.params.id, {
            name,
            category_id,
            price,
            src,
            description: description === '' ? 'no description sry!' : description
        });
        res.redirect(`/${req.params.id}`);
    }
];
async function deleteItemPost(req, res) {
    try {
        await db.deleteItem(req.params.id);
        res.redirect("/?message=deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to delete item");
    }
};
async function resetInventoryPost(req, res) {
    try {
        await db.resetInventory();
        res.redirect("/?reset=success");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to reset inventory");
    }
};
async function getItem(req, res) {
    const item = await db.getItemById(req.params.id);

    res.render('item', {
        title: `${item.name}`,
        item,
    });
}
async function getItems(req, res) {
    const { categories, search, minPrice, maxPrice, orderBy, orderDirection } = req.query;
    const categoryIds = categories ? (Array.isArray(categories) ? categories.map(Number) : [Number(categories)]) : null;
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;
    const itemList = await db.mainPageQuery(search, categoryIds, min, max, orderBy || 'name', orderDirection || 'ASC');
    res.render('index', {
        title: 'dota items',
        itemList,
        categories: await db.getAllCategories(),
        selectedCategories: categories || [],
        searchTerm: search || '',
        orderBy: req.query.orderBy || 'name',
        orderDirection: req.query.orderDirection || 'ASC',
        minPrice: req.query.minPrice || '',
        maxPrice: req.query.maxPrice || ''
    });
}
module.exports = {
    getItems,
    updateItemPost,
    updateItemGet,
    addItemPost,
    addItemGet,
    deleteItemPost,
    resetInventoryPost,
    getItem
}
