const express = require("express");
const router = express.Router();
const { Product } = require("./models");
const { registerUser } = require("./src/controllers/userController");
const validateToken = require("./src/middleware/validateToken");

router.get("/user", validationRule, registerUser);
router.get("/login", validateToken, registerUser);

router.get("/products", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;
    const products = await Product.findAndCountAll({
      order: [[sort, order]],
      offset,
      limit: parseInt(limit),
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
