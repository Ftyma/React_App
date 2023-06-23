import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";

type CartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type CartContext = {
  // increaseCartQuantity: (id: number) => void;
  // decreaseCartQuantity: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

export const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

//Cart Provider component
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch cart items from the backend
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

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cartItems, cartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
