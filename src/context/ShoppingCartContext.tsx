import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import ShoppingCart from "../components/ShoppingCart";
import axios from "axios";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  handleAddToCart: (id: number) => void;
  getItemQuantity: (id: number) => number;
  decreaseCartQuantity: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  removeItem: (id: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    await axios
      .get("http://localhost:3000/carts/get-carts")
      .then((res) => {
        setCartItems(res.data);
        //calculateTotal(res.data);
      })
      .catch((err) => console.log(err));
  };

  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  const handleAddToCart = async (productId: any) => {
    getProductById(productId)
      .then((productData) => {
        addProductToCart(productData)
          .then(() => {
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

  const addProductToCart = async (product: any) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/carts/add-carts",
        product
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
        getItemQuantity,
        removeItem,
        decreaseCartQuantity,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}></ShoppingCart>
    </ShoppingCartContext.Provider>
  );
}
