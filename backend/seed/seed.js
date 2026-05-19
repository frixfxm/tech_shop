require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { pool } = require("../src/db");

async function seed() {
  const schemaPath = path.join(__dirname, "..", "sql", "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  await pool.query(schema);

  const productsPath = path.join(__dirname, "products.json");
  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));

  await pool.query("TRUNCATE TABLE products");

  for (const product of products) {
    await pool.query(
      `INSERT INTO products (id, title, price, image_url, category, rating)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        Number(product.id),
        product.title,
        product.price,
        product.imageUrl,
        product.category,
        product.rating,
      ]
    );
  }

  console.log(`Загружено товаров: ${products.length}`);
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
