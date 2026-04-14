// Den här filen hanterar all kommunikation med produkternas API.
// Vi håller all fetch-logik samlad här så att resten av appen inte behöver bry sig om detaljerna.

// Product är en klass som representerar en produkt i vår app.
// Vi mappar API-svaret till den här klassen så att vi alltid vet exakt vilka fält vi har tillgång till.
class Product {
  constructor(
    id,
    title,
    description,
    category,
    price,
    rating,
    tags,
    thumbnail,
    images,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.rating = rating;
    this.tags = tags;
    this.thumbnail = thumbnail;
    this.images = images;
  }
}

/**
 * Hämtar en lista med produkter från API:et.
 * @param {number} limit - Hur många produkter vi vill ha.
 * @param {number} offset - Hur många vi hoppar över (används för paginering).
 */
async function apiFetchAllProducts(limit = 30, offset = 0) {
  // TEST: avkommentera en rad för att simulera ett tillstånd
  // throw new Error("Something went wrong");
  // await new Promise((resolve) => setTimeout(resolve, 99999999));

  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${offset}`,
  );

  // Om servern svarar med ett felkod kastar vi ett eget fel så att anroparen kan hantera det.
  if (!response.ok) {
    throw new Error("Failed to fetch all products");
  }

  const payload = await response.json();
  // API:et returnerar ett objekt med en "products"-array – vi mappar varje produkt till vår klass.
  return payload.products.map(mapProduct);
}

/**
 * Hämtar en enskild produkt med hjälp av dess id.
 * @param {number} productId - Id:t på produkten vi vill hämta.
 */
async function apiFetchProductById(productId) {
  const response = await fetch("https://dummyjson.com/products/" + productId);

  if (!response.ok) {
    throw new Error(`Failed to fetch product with id '${productId}'`);
  }

  const product = await response.json();
  return mapProduct(product);
}

/**
 * Söker efter produkter som matchar en söksträng.
 * @param {string} query - Sökordet användaren skrivit in.
 */
async function apiSearchProducts(query) {
  const response = await fetch(
    "https://dummyjson.com/products/search?q=" + query,
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  const payload = await response.json();
  return payload.products.map(mapProduct);
}

// mapProduct konverterar ett råa API-objekt till vår Product-klass.
// Vi gör det här på ett ställe så att vi bara behöver uppdatera det om API:et ändras.
function mapProduct(product) {
  return new Product(
    product.id,
    product.title,
    product.description,
    product.category,
    product.price,
    product.rating,
    product.tags,
    product.thumbnail,
    product.images,
  );
}

export { apiFetchAllProducts, apiSearchProducts, apiFetchProductById, Product };
