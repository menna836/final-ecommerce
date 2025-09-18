"use client"

import { apiServices } from "@/services/api";
import { createContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from "react";
import { useSession } from "next-auth/react";
export const CartContext = createContext<{
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
  isLoading:boolean;
}>({
  cartCount:0,
  setCartCount: () => {},
  isLoading:true
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setisLoading] = useState(true)

  const { data: session } = useSession();


  async function getCart() {
    setisLoading(true)
    const response = await apiServices.getUserCart();
    setCartCount(response.numOfCartItems)
    setisLoading(false)
    
  }
  
  useEffect(() => {
    if (session) {
      getCart();
    } else {
      setCartCount(0);
    }
  }, [session]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount,isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

