import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type OrderItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  handleAddToCart: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  increaseCartQuantity: (id: number) => void;
  handleSubmitOrder: () => void;
  handleChange: (e: any, id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  orderItems: OrderItem[];
  removeItem: (id: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    fetchCart();
  }, []);
  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchCart = async () => {
    await axios
      .get("http://localhost:3000/carts/get-carts")
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchOrder = async () => {
    await axios
      .get("http://localhost:3000/orders/getAll")
      .then((res) => {
        console.log("fetch from order", res.data);
        setOrderItems(res.data);
      })
      .catch((err) => console.log(err));
  };

  // function getItemQuantity(id: number) {
  //   return cartItems.find((item) => item.id === id)?.quantity || 0;
  // }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const handleSubmitOrder = () => {
    axios
      .post("http://localhost:3000/orders/submit")
      .then((res) => {
        console.log(res.data);
        setOrderItems([...orderItems, ...cartItems]);
        setCartItems([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddToCart = async (productId: any) => {
    getProductById(productId)
      .then((productData) => {
        const quantity = 1;
        addProductToCart(productData, quantity)
          .then(() => {
            fetchCart();
            alert("added to cart");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleChange = async (e, productId: any) => {
    const newQuantity = parseInt(e.value);
    getCartById(productId)
      .then((productData) => {
        const quantityDiff = newQuantity - productData.quantity;

        if (isNaN(quantityDiff)) {
          addProductToCart(productData, -productData.quantity)
            .then(() => {
              fetchCart();
            })
            .catch((error) => {
              alert(error.message);
            });
        } else {
          addProductToCart(productData, quantityDiff)
            .then(() => {
              fetchCart();
            })
            .catch((error) => {
              alert(error.message);
            });
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const increaseCartQuantity = async (productId: any) => {
    getCartById(productId)
      .then((productData) => {
        const quantity = 1;
        addProductToCart(productData, quantity)
          .then(() => {
            fetchCart();
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const decreaseCartQuantity = async (productId: any) => {
    getCartById(productId)
      .then((productData) => {
        if (productData.quantity === 1) {
          if (window.confirm("Are you sure you want to remove this item?")) {
            removeItem(productId);
          } else {
            productData.quantity = 1;
            return;
          }
        }
        const quantity = -1;
        addProductToCart(productData, quantity)
          .then(() => {
            fetchCart();
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const addProductToCart = async (product: any, quantity: number) => {
    try {
      const res = await axios.post("http://localhost:3000/carts/add-carts", {
        ...product,
        quantity: quantity,
      });
      console.log("add product to cart", res.data);
      return res.data;
    } catch (error) {
      console.log("error adding product to cart: ", error);
      throw new Error("Failed to add to cart.");
    }
  };

  const getProductById = async (productId: any) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/products/${productId}`
      );
      const productData = res.data;
      console.log("product get by ID:", productData);
      return productData;
    } catch (error) {
      console.log("Error: ", error.response.data);
      throw new Error("Failed to retrieve product.");
    }
  };

  const getCartById = async (productId: any) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/carts/get-cart/${productId}`
      );
      const productData = res.data;
      console.log("cart get by ID:", productData);
      return productData;
    } catch (error) {
      console.log("Error: ", error.response.data);
      throw new Error("Failed to retrieve product.");
    }
  };

  const removeItem = async (id: number) => {
    await axios
      .delete(`http://localhost:3000/carts/delete-carts/${id}`)
      .then(() => {
        console.log("Deleted item: ", id);
        alert(`Successfully deleted item ${id}`);
        window.location.reload();
      })
      .catch((error) => console.log("error deleting item", error));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        handleAddToCart,
        removeItem,
        decreaseCartQuantity,
        increaseCartQuantity,
        handleSubmitOrder,
        handleChange,
        orderItems,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
