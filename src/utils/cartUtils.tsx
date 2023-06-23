import axios from "axios";

export const addProductToCart = (product: any) => {
  return axios
    .post("http://localhost:3000/carts/add-carts", product)
    .then((res) => {
      console.log("add product to cart", res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("error adding product to cart: ", error);
      throw new Error("Failed to add to cart.");
    });
};

export const getProductById = (productId: any) => {
  return axios
    .get(`http://localhost:3000/products/${productId}`)
    .then((res) => {
      const productData = res.data;
      console.log("product get by ID:", productData);
      return productData;
    })
    .catch((error) => {
      console.log("Error: ", error.response.data);
      throw new Error("Failed to retrieve product.");
    });
};

export const calculateCartQuantity = (cartItems) => {
  return cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
};
