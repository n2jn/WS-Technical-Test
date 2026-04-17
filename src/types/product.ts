interface Product {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
  }

  interface ProductResponse {
    product: Product[];
    total: number;
    offset: number;
  }


  export {ProductResponse, Product}