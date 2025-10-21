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
	 ('Bottle', 1, 675,'https://images.steamusercontent.com/ugc/540703340116109485/EB3218A953675B24DC87389CED9B6F1B77249054/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false', 'An old bottle that survived the ages, the contents placed inside become enchanted.'),
	 ('Aghanim''s Shard', 1, 1400,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Aghanims-Shard-1024x826.webp', 'With origins known only to a single wizard, fragments of this impossible crystal are nearly as coveted as the renowned scepter itself.'),
	 ('Observer Ward', 1, 0,'https://gamershoo.ir/wp-content/uploads/2024/03/Observer-Ward--1024x576.webp', 'A form of half-sentient plant, often cultivated by apprentice wizards.'),
     ('Band of Elvenskin', 2, 450,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Band-of-Elvenskin-1024x769.webp', 'A tensile fabric often used for its light weight and ease of movement.'),
     ('Iron Branch', 2, 50,'https://preview.redd.it/tiny-tree-replaced-with-a-large-iron-branch-doesnt-have-any-v0-x22elvbez61d1.jpeg?auto=webp&s=a57401b20f942c093de6cfe5b71fbdd0038431ed', 'A seemingly ordinary branch, its ironlike qualities are bestowed upon the bearer. '),
     ('Gauntlets of Strength', 2, 140,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Gauntlets-of-Strength-1024x771.webp', 'Studded leather gloves that add brute strength.'),
     ('Infused Raindrops', 3, 225,'https://i.imgur.com/9X61BUF.jpeg', 'Elemental protection from magical assaults.'),
     ('Quelling Blade', 3, 100,'https://gamershoo.ir/wp-content/uploads/2024/03/Quelling-Blade-1024x576.webp', 'The axe of a fallen gnome, it allows you to effectively maneuver the forest.'),
     ('Claymore', 3, 1350,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Claymore-1024x768.webp', 'A sword that can cut through armor, it''s a commonly chosen first weapon for budding swordsmen.'),
     ('Magic Stick', 4, 200,'https://gamershoo.ir/wp-content/uploads/2024/03/Magic-Stick-1024x576.webp', 'A simple wand used to channel magic energies, it is favored by apprentice wizards and great warlocks alike.'),
     ('Ghost Scepter', 4, 1500,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Ghost-Scepter-1024x770.webp', 'Imbues the wielder with a ghostly presence, allowing them to evade physical damage.'),
     ('Blink Dagger', 4, 2250,'https://i.pinimg.com/736x/d3/2c/d7/d32cd776d14004f36b8e27d60156b29b.jpg', 'The fabled dagger used by the fastest assassin ever to walk the lands.'),
     ('Eaglesong', 5, 2800,'https://gamershoo.ir/wp-content/uploads/2024/01/Eaglesong-1024x576.webp', 'Capturing the majestic call of an eagle, this mystical horn brings limitless dexterity to those who hear it.'),
     ('Ultimate Orb', 5, 2800,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Ultimate-Orb-1024x772.webp', 'A mystical orb containing the essence of life.'),
     ('Demon Edge', 5, 2200,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Demon-Edge-1024x775.webp', 'One of the oldest weapons forged by the Demon-Smith Abzidian, it killed its maker when he tested its edge.'),
     ('Power Treads', 6, 1400,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Power-Treads-1024x772.webp', 'A pair of tough-skinned boots that change to meet the demands of the wearer.'),
     ('Magic Wand', 6, 450,'https://gamershoo.ir/wp-content/uploads/2024/03/Magic-Wand-1024x576.webp', 'A simple wand used to channel magic energies, it is favored by apprentice wizards and great warlocks alike.'),
     ('Moon Shard', 6, 4000,'https://gamershoo.ir/wp-content/uploads/2024/03/Moon-Shard-1024x576.webp', 'Said to be a tear from the lunar goddess Selemene.'),
     ('Spirit Vessel', 7, 2725,'https://gamershoo.ir/wp-content/uploads/2025/02/Spirit-Vessel_-1024x772.webp', 'Forged by a god to entrap the soul of another.'),
     ('Boots of Bearing', 7, 4225,'https://gamershoo.ir/wp-content/uploads/2024/03/Boots-of-Bearing.webp', 'Resplendent footwear fashioned for the ancient herald that first dared spread the glory of Stonehall beyond the original borders of its nascent claim.'),
     ('Vladmir''s Offering', 7, 2200,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Vladmirs-Offering-1024x768.webp', 'An eerie mask that is haunted with the malice of a fallen vampire.'),
     ('Refresher Orb', 8, 5000,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Refresher-Orb-1024x767.webp', 'A powerful artifact created for wizards.'),
     ('Aghanim''s Scepter', 8, 4200,'https://i.pinimg.com/736x/28/ed/12/28ed127e5639c65ccbe9579b40d61177.jpg', 'The scepter of a wizard with demigod-like powers.'),
     ('Scythe of Vyse', 8, 5200,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Scythe-of-Vyse-1024x774.webp', 'The most guarded relic among the cult of Vyse, it is the most coveted weapon among magi.'),
     ('Black King Bar', 9, 4050,'https://lh7-rt.googleusercontent.com/docsz/AD_4nXfrWUhWY1zts7_3nOkob6EMdWJGXnNdl6yQY6vjfrQ1_Yf5wSPtIEA7GxmSDxfxD_jMLnjz8KCWspIzX1Tn6BUS8D4bS0r9ccrnlYGed1-gCupW13eafLEj9Mx5brzPe-f0Lne5HA?key=MFWczKFnnTP5uXSSlRSIqoF2', 'A powerful staff imbued with the strength of giants.'),
     ('Shiva''s Guard', 9, 5175,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Shivas-Guard--1024x773.webp', 'Said to have belonged to a goddess, today it retains much of its former power.'),
     ('Linken''s Sphere', 9, 4800,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Linkens-Sphere--1024x784.webp', 'This magical sphere once protected one of the most famous heroes in history.'),
     ('Abyssal Blade', 10, 6250,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Abyssal-Blade-1024x769.webp', 'The lost blade of the Commander of the Abyss, this edge cuts into an enemy''s soul.'),
     ('Butterfly', 10, 5450,'https://i.pinimg.com/736x/79/1a/0f/791a0f7370d8ef3caa911934b6253b86.jpg', 'Only the mightiest and most experienced of warriors can wield the Butterfly, but it provides incredible dexterity in combat. '),
     ('Divine Rapier', 10, 5600,'https://i.pinimg.com/736x/7b/a1/9e/7ba19e5bd210c6b288b7dfcdcab916cf.jpg', 'So powerful, it cannot have a single owner.'),
     ('Manta Style', 11, 4650,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Manta-Style--1024x764.webp', 'An axe made of reflective materials that causes confusion amongst enemy ranks.'),
     ('Kaya', 11, 2100,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Kaya-1024x768.webp', 'The staff of a renowned sorceress, lost for countless millennia.'),
	 ('Heaven''s Halberd', 11, 2600,'https://gamershoo.ir/wp-content/uploads/2024/Dota2/Items/Heavens-Halberd-1024x770.webp', 'This halberd moves with the speed of a smaller weapon, allowing the bearer to win duels that a heavy edge would not.');
`;
const createCategoriesTable = `CREATE TABLE IF NOT EXISTS categories ( id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, category VARCHAR(50) UNIQUE, color TEXT UNIQUE)`;

const createCategories = `INSERT INTO categories (category, color) VALUES ('Consumables', '#fefefe'),('Attributes', '#ffc26c'), ('Equipment', '#634040'), ('Miscellaneous', '#fff952'), ('Secret Shop', '#fffeeb'), ('Accessories', '#b0e3ee'), ('Support', '#ff0062'), ('Magical', '#ffe3bc'), ('Armor', '#11ac7b'), ('Weapons', '#0037ff'), ('Armaments', '#56157f');`;

module.exports = {

    dropTables,
    createCategoriesTable,
    createSQLTable,
    createCategories,
    createSQLData
};
