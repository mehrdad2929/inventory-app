const { Client } = require("pg");
// const {dropTables,createSQLData,createSQLTable,createCategories,createCategoriesTable} = require('./seed')
// require("dotenv").config();
const pool = require('./pool')
const dropTables = `DROP TABLE IF EXISTS inventory, categories;`;

const createSQLTable = `CREATE TABLE IF NOT EXISTS inventory ( 
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    name VARCHAR(50) UNIQUE, 
    category_id INTEGER,  
    price INTEGER,
    src TEXT DEFAULT '/images/mantle-of-intelligence.svg', 
    description VARCHAR(200)
);`;
const createSQLData = `
INSERT INTO inventory (name,category_id,price,src,description) VALUES
	 ('Bottle', 1, 675,'/images/bread.svg', 'An old bottle that survived the ages, the contents placed inside become enchanted.'),
	 ('Aghanim''s Shard', 1, 1400,'/images/bread.svg', 'With origins known only to a single wizard, fragments of this impossible crystal are nearly as coveted as the renowned scepter itself.'),
	 ('Observer Ward', 1, 0,'/images/bread.svg', 'A form of half-sentient plant, often cultivated by apprentice wizards.'),
     ('Band of Elvenskin', 2, 450,'/images/bread.svg', 'A tensile fabric often used for its light weight and ease of movement.'),
     ('Iron Branch', 2, 50,'/images/bread.svg', 'A seemingly ordinary branch, its ironlike qualities are bestowed upon the bearer. '),
     ('Gauntlets of Strength', 2, 140,'/images/bread.svg', 'Studded leather gloves that add brute strength.'),
     ('Infused Raindrops', 3, 225,'/images/bread.svg', 'Elemental protection from magical assaults.'),
     ('Quelling Blade', 3, 100,'/images/bread.svg', 'The axe of a fallen gnome, it allows you to effectively maneuver the forest.'),
     ('Claymore', 3, 1350,'/images/bread.svg', 'A sword that can cut through armor, it''s a commonly chosen first weapon for budding swordsmen.'),
     ('Magic Stick', 4, 200,'/images/bread.svg', 'A simple wand used to channel magic energies, it is favored by apprentice wizards and great warlocks alike.'),
     ('Ghost Scepter', 4, 1500,'/images/bread.svg', 'Imbues the wielder with a ghostly presence, allowing them to evade physical damage.'),
     ('Blink Dagger', 4, 2250,'/images/bread.svg', 'The fabled dagger used by the fastest assassin ever to walk the lands.'),
     ('Eaglesong', 5, 2800,'/images/bread.svg', 'Capturing the majestic call of an eagle, this mystical horn brings limitless dexterity to those who hear it.'),
     ('Ultimate Orb', 5, 2800,'/images/bread.svg', 'A mystical orb containing the essence of life.'),
     ('Demon Edge', 5, 2200,'/images/bread.svg', 'One of the oldest weapons forged by the Demon-Smith Abzidian, it killed its maker when he tested its edge.'),
     ('Power Treads', 6, 1400,'/images/bread.svg', 'A pair of tough-skinned boots that change to meet the demands of the wearer.'),
     ('Magic Wand', 6, 450,'/images/bread.svg', 'A simple wand used to channel magic energies, it is favored by apprentice wizards and great warlocks alike.'),
     ('Moon Shard', 6, 4000,'/images/bread.svg', 'Said to be a tear from the lunar goddess Selemene.'),
     ('Spirit Vessel', 7, 2725,'/images/bread.svg', 'Forged by a god to entrap the soul of another.'),
     ('Boots of Bearing', 7, 4225,'/images/bread.svg', 'Resplendent footwear fashioned for the ancient herald that first dared spread the glory of Stonehall beyond the original borders of its nascent claim.'),
     ('Vladmir''s Offering', 7, 2200,'/images/bread.svg', 'An eerie mask that is haunted with the malice of a fallen vampire.'),
     ('Refresher Orb', 8, 5000,'/images/bread.svg', 'A powerful artifact created for wizards.'),
     ('Aghanim''s Scepter', 8, 4200,'/images/bread.svg', 'The scepter of a wizard with demigod-like powers.'),
     ('Scythe of Vyse', 8, 5200,'/images/bread.svg', 'The most guarded relic among the cult of Vyse, it is the most coveted weapon among magi.'),
     ('Black King Bar', 9, 4050,'/images/bread.svg', 'A powerful staff imbued with the strength of giants.'),
     ('Shiva''s Guard', 9, 5175,'/images/bread.svg', 'Said to have belonged to a goddess, today it retains much of its former power.'),
     ('Linken''s Sphere', 9, 4800,'/images/bread.svg', 'This magical sphere once protected one of the most famous heroes in history.'),
     ('Abyssal Blade', 10, 6250,'/images/bread.svg', 'The lost blade of the Commander of the Abyss, this edge cuts into an enemy''s soul.'),
     ('Butterfly', 10, 5450,'/images/bread.svg', 'Only the mightiest and most experienced of warriors can wield the Butterfly, but it provides incredible dexterity in combat. '),
     ('Divine Rapier', 10, 5600,'/images/bread.svg', 'So powerful, it cannot have a single owner.'),
     ('Manta Style', 11, 4650,'/images/bread.svg', 'An axe made of reflective materials that causes confusion amongst enemy ranks.'),
     ('Kaya', 11, 2100,'/images/bread.svg', 'The staff of a renowned sorceress, lost for countless millennia.'),
	 ('Heaven''s Halberd', 11, 2600,'/images/bread.svg', 'This halberd moves with the speed of a smaller weapon, allowing the bearer to win duels that a heavy edge would not.');
`;
const createCategoriesTable = `CREATE TABLE IF NOT EXISTS categories ( id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, category VARCHAR(50) UNIQUE, color TEXT UNIQUE)`;

const createCategories = `INSERT INTO categories (category, color) VALUES ('Consumables', '#fefefe'),('Attributes', '#ffc26c'), ('Equipment', '#634040'), ('Miscellaneous', '#fff952'), ('Secret Shop', '#fffeeb'), ('Accessories', '#b0e3ee'), ('Support', '#ff0062'), ('Magical', '#ffe3bc'), ('Armor', '#11ac7b'), ('Weapons', '#0037ff'), ('Armaments', '#56157f');`;

async function populateDB() {
    console.log("Seeding...");
    /* const client = new Client({
        connectionString: process.env.RENDER_URL || process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    }); */
    const client = await pool.connect()
    try {
        // await client.connect();
        console.log("Connected to database.");
        await client.query(dropTables);
        await client.query(createCategoriesTable);
        await client.query(createSQLTable);
        console.log("Tables created.");
        await client.query(createCategories);
        await client.query(createSQLData);
        console.log("Data created.");
    } catch (error) {
        console.error("Error occured:", error);
    } finally {
        client.release();
        await pool.end();
        console.log("Done.");
    }
}

populateDB();
