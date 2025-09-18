"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { apiServices } from "@/services/api";
import toast from "react-hot-toast";

interface WishlistContextType {
  wishlist: string[];
  setWishlist: React.Dispatch<React.SetStateAction<string[]>>;
  toggleWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = async (productId: string) => {
    try {
      if (wishlist.includes(productId)) {
        await apiServices.removeProductFromWishlist(productId);
            toast.error("Product removed from wishlist",{
       position:"bottom-right"
    });
        setWishlist(prev => prev.filter(id => id !== productId));
     
      } else {
        await apiServices.addProductToWishlist(productId);
          toast.success("Product added from wishlist",{
       position:"bottom-right"
    });
        setWishlist(prev => [...prev, productId]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
};



