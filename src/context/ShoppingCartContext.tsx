import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import axios from "axios";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number | undefined;
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
  addProductToCart: (id: any, quanitty: number) => void;
  handleSubmitOrder: () => void;
  fetchOrder: () => Promise<void>;
  handleChange: (e: any, id: number) => void;
  handleProdChange: (e: any, id: number) => void;
  totalPrice: () => number;
  cartQuantity: number;
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  orderItems: OrderItem[];
  removeItem: (id: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderItems, setOrderItems] = useState<any>([]);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchCart = async () => {
    const uid = localStorage.getItem("uid");
    await axios
      .get(`http://localhost:3000/carts/get-carts?uid=${uid}`)
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchOrder = async () => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");

    // Check if token exists in local storage
    if (!token || !uid) {
      throw new Error("Token or UID is missing.");
    }

    await axios
      .get(`http://localhost:3000/orders?uid=${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("fetch from order", res.data);
        setOrderItems(res.data);
      })
      .catch((err) => console.log(err));
  };

  // function getItemQuantity(id: number) {
  //   return cartItems.find((item) => item.id === id)?.quantity || 0;
  // }

  const totalPrice = (): number => {
    try {
      let total: number = 0;
      cartItems?.forEach((item: any) => {
        total += item.price * item.quantity;
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const handleSubmitOrder = () => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");

    //check if token and uid exist in local storage
    if (!token || !uid) {
      throw new Error("Token or UID is missing.");
    }

    axios
      .post(
        "http://localhost:3000/orders/submit",
        {
          uid: uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, //include token in req header
          },
        }
      )
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

  const handleChange = async (e: any, productId: any) => {
    const newQuantity = parseInt(e.value);

    getCartById(productId)
      .then((productData) => {
        const quantityDiff = newQuantity - productData.quantity;

        //invalid quanitty
        if (isNaN(quantityDiff)) {
          e.value = productData.quantity.toString();
          return;
        }
        addProductToCart(productData, quantityDiff)
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

  //// for store Item
  const handleProdChange = async (e: any, productId: any) => {
    const newQuantity = parseInt(e.value);
    getProductById(productId)
      .then((productData) => {
        const quantityDiff = newQuantity - productData.quantity;

        //invalid quanitty
        if (isNaN(quantityDiff)) {
          e.value = productData.quantity.toString();
          return;
        }
        addProductToCart(productData, quantityDiff)
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

  //

  const addProductToCart = async (product: any, quantity: number) => {
    try {
      const token = localStorage.getItem("token");
      const uid = localStorage.getItem("uid");

      //check if token and uid exist in local storage
      if (!token || !uid) {
        throw new Error("Token or UID is missing.");
      }

      const res = await axios.post(
        "http://localhost:3000/carts/add-carts",
        {
          ...product,
          quantity: quantity,
          uid: uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, //include token in req header
          },
        }
      );
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
    } catch (error: any) {
      console.log("Error: ", error.response.data);
      throw new Error("Failed to retrieve product.");
    }
  };

  const getCartById = async (productId: any) => {
    try {
      const res = await axios.get(`http://localhost:3000/carts/${productId}`);
      const productData = res.data;
      console.log("cart get by ID:", productData);
      return productData;
    } catch (error: any) {
      console.log("Error: ", error.response.data);
      throw new Error("Failed to retrieve product.");
    }
  };

  const removeItem = async (id: number) => {
    await axios
      .delete(`http://localhost:3000/carts/delete-carts/${id}`)
      .then(() => {
        // var items = cartItems;
        // // find index
        // const index = items.findIndex((obj) => obj.id === id);
        // items.splice(index, 1);
        // setCartItems(items);
        fetchCart();
        console.log(cartItems);
        console.log("Deleted item: ", id);
        alert(`Successfully deleted item ${id}`);
        //window.location.reload();
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
        fetchOrder,
        handleSubmitOrder,
        handleChange,
        handleProdChange,
        addProductToCart,
        totalPrice,
        orderItems,
        cartItems,
        setCartItems,

        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
