const express = require("express");
const {
  getProducts,
  getProductById,
} = require("../services/productsService");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { page, limit, category, sortBy, order, search } = req.query;

    const items = await getProducts({
      page,
      limit,
      category,
      sortBy,
      order,
      search,
    });

    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Товар не найден" });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
