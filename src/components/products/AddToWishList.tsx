import { Heart } from "lucide-react"; 
import { useWishlist } from "@/contexts/whislistContext";
import { Button } from "../ui";


export default function AddToWishList({ productId }: { productId: string }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const isInWishlist = wishlist.includes(productId);

  return (
    <Button variant="outline" size="lg" onClick={() => toggleWishlist(productId)}>
      <Heart
        className={`w-6 h-6 ${
          isInWishlist ? "text-red-500 fill-red-500" : "text-gray-500"
        }`}
      />
    </Button>
  );
}


// import { useState } from "react";
// import { Heart } from "lucide-react"; 
// import { toast } from "react-hot-toast";
// import { apiServices } from "@/services/api";
// import { useWishlist } from "@/contexts/whislistContext";
// import { Button } from "../ui";

// export default function AddToWishList({ productId, removeFromProducts }: { productId: string, removeFromProducts?: (id: string) => void }) {
//   const { wishlist, setWishlist } = useWishlist();
//   const [isInWishlist, setIsInWishlist] = useState(wishlist.includes(productId));
//   const [loading, setLoading] = useState(false);

//   const handleWishlist = async () => {
//     // setLoading(true);
//     try {
//       if (isInWishlist) {
//         await apiServices.removeProductFromWishlist(productId);
//         setWishlist(prev => prev.filter(id => id !== productId));
//         removeFromProducts?.(productId); // تحديث محلي للـ products
//         toast.error("Removed from wishlist ");
//         setIsInWishlist(false);
//       } else {
//         await apiServices.addProductToWishlist(productId);
//         setWishlist(prev => [...prev, productId]);
//         toast.success("Added to wishlist ");
//         setIsInWishlist(true);
//       }
//     } catch (error) {
//       toast.error("Something went wrong!");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button  variant="outline" size="lg" onClick={handleWishlist}  >
//       <Heart className={`w-6 h-6 ${isInWishlist ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
//     </Button>
//   );
// }
















