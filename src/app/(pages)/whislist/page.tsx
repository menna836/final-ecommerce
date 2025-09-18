"use client";
import { useWishlist } from "@/contexts/whislistContext";
import { Product } from "@/interfaces";
import { useEffect, useState } from "react";
import Image from "next/image";
import { LoadingSpinner } from "@/components/shared";
import { formatPrice } from "@/helpers/currency";
import AddToWishList from "@/components/products/AddToWishList";
import { Button } from "@/components/ui";
import Link from "next/link";


export default function Wishlist() {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      if (wishlist.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const res = await Promise.all(
        wishlist.map(async (id: string) => {
          const data = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(res => res.json());
          return data.data; 
        })
      );

      setProducts(res);
      setLoading(false);
    }

    fetchProducts();
  }, [wishlist]);

 


 if (loading && products.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Wishlist</h1>

      {products.length === 0 ? (
        <div className="text-center">
        <p className="text-gray-500 text-center">Your wishlist is empty</p>
         <Button variant="outline" className="w-fit mt-3" asChild>
          <Link href="/products">add products </Link>
        </Button>
        </div>
      ) : (
       <div className="flex flex-col gap-6">
  {products.map((product) => (
    <div key={product._id} className="flex gap-4 p-4 border rounded-lg relative items-center">
      
      
      <div className="relative w-32 h-32 flex-shrink-0 rounded-md overflow-hidden">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

    
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {product.brand?.name}
        </p>
        <p className="font-semibold text-primary mt-2">
          {formatPrice(product.price)}
        </p>
      </div>

    
      <div className="absolute top-4 right-4">
        <AddToWishList productId={product._id}
        />
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  );
}
