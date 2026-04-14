class Product {
  constructor(id, title, description, category, price, rating, tags) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.rating = rating;
    this.tags = tags;
  }
}

async function apiFetchAllProducts() {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch all products");
  }

  const payload = await response.json();
  return payload.products.map(mapProduct);
}

async function apiFetchProductById(productId) {
  const response = await fetch("https://dummyjson.com/products/" + productId);

  if (!response.ok) {
    throw new Error(`Failed to fetch product with id '${productId}'`);
  }

  const product = await response.json();
  return mapProduct(product);
}

async function apiSearchProducts(query) {
  const response = await fetch("https://dummyjson.com/products?q=" + query);

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  const payload = await response.json();
  return payload.products.map(mapProduct);
}

function mapProduct(product) {
  return new Product(
    product.id,
    product.title,
    product.description,
    product.category,
    product.price,
    product.rating,
    product.tags,
  );
}

export { apiFetchAllProducts, apiSearchProducts, apiFetchProductById, Product };
