import React from 'react'
import { Button } from '../ui'
import { Loader2, ShoppingCart } from 'lucide-react'
import AddToWishList from './AddToWishList'

interface handleAddToCartProprs{
    productQuentity:number,
    addToCartLoading:boolean,
    handleAddToCart: ()=> void,
   
}
export default function AddToCartButton({productQuentity,addToCartLoading,handleAddToCart }:handleAddToCartProprs) {

  return (
    <>

        <Button
              onClick={handleAddToCart}
                size="lg"
                className="flex-1 w-full"
                disabled={productQuentity === 0 || addToCartLoading}
              >
                { addToCartLoading && <Loader2 className=" animate-spin"/>}
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
          </Button>

    </>
  )
}
