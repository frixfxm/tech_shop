const { query } = require("../db");

const SORT_COLUMNS = {
  price: "price",
  rating: "rating",
  title: "title",
};

function mapProduct(row) {
  return {
    id: String(row.id),
    title: row.title,
    price: row.price,
    imageUrl: row.image_url,
    category: row.category,
    rating: row.rating,
  };
}

async function getProducts({ page, limit, category, sortBy, order, search }) {
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(50, Math.max(1, Number(limit) || 4));
  const offset = (pageNum - 1) * limitNum;

  const conditions = [];
  const params = [];
  let paramIndex = 1;

  const categoryId = Number(category);
  if (!Number.isNaN(categoryId) && categoryId > 0) {
    conditions.push(`category = $${paramIndex++}`);
    params.push(categoryId);
  }

  if (search && String(search).trim()) {
    conditions.push(`title ILIKE $${paramIndex++}`);
    params.push(`%${String(search).trim()}%`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const sortColumn = SORT_COLUMNS[sortBy] || "rating";
  const sortOrder = order === "asc" ? "ASC" : "DESC";

  const dataSql = `
    SELECT id, title, price, image_url, category, rating
    FROM products
    ${whereClause}
    ORDER BY ${sortColumn} ${sortOrder}
    LIMIT $${paramIndex++} OFFSET $${paramIndex++}
  `;

  params.push(limitNum, offset);

  const { rows } = await query(dataSql, params);
  return rows.map(mapProduct);
}

async function getProductById(id) {
  const { rows } = await query(
    `SELECT id, title, price, image_url, category, rating
     FROM products
     WHERE id = $1`,
    [id]
  );

  if (rows.length === 0) {
    return null;
  }

  return mapProduct(rows[0]);
}

module.exports = { getProducts, getProductById };
