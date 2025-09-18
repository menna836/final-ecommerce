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



















