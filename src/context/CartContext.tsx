import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, FoodItem } from "@/data/foodData";

interface CartContextType {
  items: CartItem[];
  addToCart: (item: FoodItem, quantity: number, selectedSize: string, selectedAddons: string[]) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const calculateItemTotal = (item: FoodItem, quantity: number, selectedSize: string) => {
    let basePrice = item.price;
    const size = item.sizes?.find((s) => s.name === selectedSize);
    if (size) {
      basePrice += size.priceModifier;
    }
    return basePrice * quantity;
  };

  const addToCart = (item: FoodItem, quantity: number, selectedSize: string, selectedAddons: string[]) => {
    const totalPrice = calculateItemTotal(item, quantity, selectedSize);
    const cartItem: CartItem = {
      ...item,
      quantity,
      selectedSize,
      selectedAddons,
      totalPrice,
    };
    
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id && i.selectedSize === selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        updated[existingIndex].totalPrice = calculateItemTotal(
          item,
          updated[existingIndex].quantity,
          selectedSize
        );
        return updated;
      }
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity,
            totalPrice: calculateItemTotal(item, quantity, item.selectedSize),
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
