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
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  //   const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
  //     "shopping-cart",
  //     []
  //   );

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(0);

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

  //   function increaseCartQuantity(id: number) {
  //     setCartItems((currItems) => {
  //       if (currItems.find((item) => item.id === id) == null) {
  //         return [...currItems, { id, quantity: 1 }];
  //       } else {
  //         return currItems.map((item) => {
  //           if (item.id === id) {
  //             return { ...item, quantity: item.quantity + 1 };
  //           } else {
  //             return item;
  //           }
  //         });
  //       }
  //     });
  //   }

  function increaseCartQuantity(id: number) {
    const item = cartItems.find((item) => item.id == id);
    if (item) {
      //if item in cart, increase quantity 1
      const updatedItems = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      updateCartItems(updatedItems);
    } else {
      // If the item doesn't exist in the cart, add it with quantity 1
      const newItem = {
        id: id,
        quantity: 1,
      };
      const updatedItems = [...cartItems, newItem];
      updateCartItems(updatedItems);
    }
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  //   const cartQuantity = () => {
  //     const calcQuantity = cartItems.reduce(
  //       (quantity, item) => item.quantity + quantity,
  //       0
  //     );
  //     console.log(calcQuantity);
  //     setQuantity(calcQuantity);
  //   };

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

  function updateCartItems(updatedItems: CartItem[]) {
    axios
      .put(`http://localhost:3000/carts/update-cart`, updatedItems)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setCartItems(data);
        //cartQuantity(data);
      })
      .catch((error) => {
        console.error("Error updating cart items:", error);
      });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
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
