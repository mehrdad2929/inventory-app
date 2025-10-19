const pool = require('./pool')
//TODO:gonna write specific queries for each route or tasks,there's this 
//2.one for getting all the categories and then 
//3.one for the :id route (which is getItemById) 
//4.and update and delete

async function mainPageQuery(search, categoryIds, minPrice, maxPrice, orderBy = 'name', orderDirection = 'ASC') {
    // Start with base query
    let query = `
        SELECT i.*, c.category, c.color 
        FROM inventory i
        LEFT JOIN categories c ON i.category_id = c.id
        WHERE 1=1
    `;

    // Array to hold parameter values
    const params = [];
    if (categoryIds && categoryIds.length > 0) {
        params.push(categoryIds);
        query += ` AND i.category_id = ANY($${params.length})`;
    }

    // 2. Search filter (name OR description)
    if (search) {
        params.push(`%${search}%`)
        query += ` AND(i.name ILIKE $${params.length} OR i.description ILIKE $${params.length})`
    }

    // 3. Min price filter
    if (minPrice) {
        params.push(minPrice)
        query += ` AND price>=$${params.length}`
    }

    // 4. Max price filter
    if (maxPrice) {
        params.push(maxPrice)
        query += ` AND price<=$${params.length}`
    }

    // Add ORDER BY
    query += ` ORDER BY i.${orderBy} ${orderDirection}`;
    const result = await pool.query(query, params);
    return result.rows;
}
async function getAllCategories() {
    const result = await pool.query(`
        SELECT * FROM categories ORDER BY category
    `);
    return result.rows;
}
async function getItemById(id) {
    const result = await pool.query(`
        SELECT i.*, c.category, c.color 
        FROM inventory i
        LEFT JOIN categories c ON i.category_id = c.id
        WHERE i.id = $1
    `, [id]);
    return result.rows[0];
}
async function addItem({ name, category_id, price, src, description }) {
    const result = await pool.query(`
        INSERT INTO inventory (name, category_id, price, src, description)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `, [name, category_id, price, src, description]);
    return result.rows[0];
}
async function updateItem(id, itemData) {
    const { name, category_id, price, src, description } = itemData;
    const result = await pool.query(`
        UPDATE inventory 
        SET name = $1, category_id = $2, price = $3, src = $4, description = $5
        WHERE id = $6
        RETURNING *
    `, [name, category_id, price, src, description, id]);
    return result.rows[0];
}
async function deleteItem(id) {
    await pool.query(`DELETE FROM inventory WHERE id = $1`, [id]);
}

module.exports = {
    updateItem,
    addItem,
    mainPageQuery,
    getItemById,
    getAllCategories,
    deleteItem
};
