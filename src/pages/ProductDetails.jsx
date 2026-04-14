// TODO: implementera produktdetaljsidan.
// routeData.productId innehåller id:t på den valda produkten –
// använd apiFetchProductById(routeData.productId) för att hämta och visa den.
function ProductDetails({ routeData }) {
  return <>Product Details: {JSON.stringify(routeData)}</>;
}

export default ProductDetails;
