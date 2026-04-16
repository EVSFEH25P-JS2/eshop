import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Cart stored as { [productId]: { product, amount } }
const cart = {};

// GET /cart — return all cart items
app.get("/cart", (req, res) => {
  res.json(Object.values(cart));
});

// POST /cart — add product or increment amount if already in cart
app.post("/cart", (req, res) => {
  const { product } = req.body;
  if (!product?.id) {
    return res.status(400).json({ error: "product with id is required" });
  }
  if (cart[product.id]) {
    cart[product.id].amount += 1;
  } else {
    cart[product.id] = { product, amount: 1 };
  }
  res.status(201).json(cart[product.id]);
});

// PATCH /cart/:productId — set amount explicitly
app.patch("/cart/:productId", (req, res) => {
  const { productId } = req.params;
  const { amount } = req.body;
  if (!cart[productId]) {
    return res.status(404).json({ error: "item not found in cart" });
  }
  if (typeof amount !== "number" || amount < 1) {
    return res.status(400).json({ error: "amount must be a number >= 1" });
  }
  cart[productId].amount = amount;
  res.json(cart[productId]);
});

// DELETE /cart/:productId — remove a single item
app.delete("/cart/:productId", (req, res) => {
  const { productId } = req.params;
  if (!cart[productId]) {
    return res.status(404).json({ error: "item not found in cart" });
  }
  delete cart[productId];
  res.status(204).send();
});

// DELETE /cart — clear the entire cart
app.delete("/cart", (req, res) => {
  Object.keys(cart).forEach((key) => delete cart[key]);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Cart server running at http://localhost:${PORT}`);
});
