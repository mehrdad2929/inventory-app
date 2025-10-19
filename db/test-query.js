const pool = require('./pool');


async function mainPageQuery(search, categoryIds, minPrice, maxPrice, orderBy = 'name') {
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
    query += ` ORDER BY i.${orderBy}`;

    const result = await pool.query(query, params);
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

async function getAllCategories() {
    const result = await pool.query(`
        SELECT * FROM categories ORDER BY category
    `);
    return result.rows;
}
async function getAllItemIds() {
    const result = await pool.query(`
        SELECT i.category_id FROM inventory 
    `);
    return result.rows[0];
}
async function test() {
    console.log('\n--- Test o:item with id=12 ---');
    const item = await getItemById(12);
    const itemIds = await getAllItemIds();
    const categories = await getAllCategories();
    console.log(`Found ${item.name} items`);
    console.log('heres the item:', item);
    console.log('heres the itemIds:', itemIds);
    // console.log('heres the categories:', categories);
    //
    // console.log('\n--- Test 1: All items ---');
    // const all = await mainPageQuery(null, null, null, null);
    // console.log(`Found ${all.length} items`);
    //
    // console.log('\n--- Test 2: Search for "Bottle" ---');
    // const search = await mainPageQuery('bottle', null, null, null);
    // console.log(`Found ${search.length} items`);
    // console.log(search.map(i => i.name));
    //
    // console.log('\n--- Test 3: Categories 1 and 2 ---');
    // const cats = await mainPageQuery(null, [1, 2], null, null);
    // console.log(`Found ${cats.length} items`);
    //
    // console.log('\n--- Test 4: Price range 1000-3000 ---');
    // const price = await mainPageQuery(null, null, 1000, 3000);
    // console.log(`Found ${price.length} items`);
    //
    // console.log('\n--- Test 5: Combined filters ---');
    // const combined = await mainPageQuery('blink', [4], 1000, 3000);
    // console.log(`Found ${combined.length} items`);
    // console.log(combined);
    //
    await pool.end();
}

test().catch(console.error);
