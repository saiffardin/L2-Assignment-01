interface Product {
  name: string;
  price: number;
}

function getMostExpensiveProduct(products: Product[]): Product | null {
  if (products.length === 0) return null;

  const result = products.reduce((prev, curr) => {
    if (curr.price > prev.price) return curr;

    return prev;
  }, products[0]);

  return result;
}
