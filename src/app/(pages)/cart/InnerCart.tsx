// "use client"
// import CartProduct from '@/components/products/CartProduct'
// import { Separator } from '@/components/ui'
// import { formatPrice } from '@/helpers/currency'
// import { IGetUserCartResponce } from '@/interfaces'
// import { apiServices } from '@/services/api'
// import { Loader2, Trash2 } from 'lucide-react'
// import React, { useContext, useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { CartContext } from '@/contexts/cartContext'

// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"


// interface InnerCartProps{
//     CartData:IGetUserCartResponce
// }
// export default function InnerCart({CartData}:InnerCartProps) {

//     const [innerCartData, setinnerCartData] = useState<IGetUserCartResponce>(CartData)
//     const [isclaeringcart, setisclaeringcart] = useState(false)
//     const [checkOutLoading, setcheckOutLoading] = useState(false)
//     const {setCartCount} =useContext(CartContext)



//       // state لفتح/غلق الفورم
//     const [openCheckoutForm, setOpenCheckoutForm] = useState(false)

//     // state للـ input values
//     const [address, setAddress] = useState({
//       details: "",
//       phone: "",
//       city: ""
//     })



//     useEffect(()=>{
//     setCartCount(innerCartData.numOfCartItems);
//     },[innerCartData])


//     async function handledeleteSpecificProduct(productId:string, setisremovingproduct:(value:boolean)=>void) {
//         setisremovingproduct(true)
//             const response = await apiServices.deleteSpacificItem(productId)
           
//             setisremovingproduct(false)
//                 const newCart = await apiServices.getUserCart()
//                 setinnerCartData(newCart)
//                  toast.success("product removed successfully",{
//                 position:"bottom-right"
//             })
//     }

//     async function handleClearCart(){
//         setisclaeringcart(true)
//             const response = await apiServices.clearCart()
//           setisclaeringcart(false)
          
//               toast.success("cart cleared successfully",{
//                 position:"bottom-right"
//             })
//             const newCart = await apiServices.getUserCart()
//             setinnerCartData(newCart)
//     }

//     async function handleUpdateCart(productId:string,count:number){
//         const response = await apiServices.updateCart(productId,count)
//         console.log(response)
//         const newCart = await apiServices.getUserCart()
//         setinnerCartData(newCart)

//     }

//     async function handleCheckOut(){
//       // setcheckOutLoading(true)
//       // const response = await apiServices.checkout(CartData.cartId)
//       //   console.log(response.session.url)
//       //   setcheckOutLoading(false)
//       //   location.href = response.session.url;


//         setcheckOutLoading(true)
//       try {
//         const response = await apiServices.checkout(CartData.cartId, address) // ابعتي الـ address
//         location.href = response.session.url;
//       } catch (error) {
//         toast.error("Checkout failed")
//       }
//       setcheckOutLoading(false)
//     }

//     }
//   return (
//     <>
//        {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
//         { innerCartData.numOfCartItems > 0 && <p className="text-muted-foreground">
//           {innerCartData.numOfCartItems} item
//           {innerCartData.numOfCartItems !== 1 ? "s" : ""} in your cart
//         </p>}
//       </div>

//       {innerCartData.numOfCartItems > 0 ? 
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Cart Items */}
//         <div className="lg:col-span-2">
//           <div className="space-y-4">
//             {innerCartData.data.products.map((item) => (
//               <CartProduct
//                handledeleteSpecificProduct={handledeleteSpecificProduct}
//                 key={item._id}
//                  item={item}
//                  handleUpdateCart={handleUpdateCart}
//                  />
//             ))}
//           </div>

//           {/* Clear Cart */}
//           <div className="mt-6">
//             <Button disabled={isclaeringcart} onClick={handleClearCart} variant="outline">
//              {isclaeringcart ? <Loader2 className='animate-spin'/> : <Trash2 className="h-4 w-4 mr-2" />}
//               Clear Cart </Button>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="lg:col-span-1">
//           <div className="border rounded-lg p-6 sticky top-18">
//             <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

//             <div className="space-y-2 mb-4">
//               <div className="flex justify-between">
//                 <span>Subtotal ({innerCartData.numOfCartItems} items)</span>
//                 <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span className="text-green-600">Free</span>
//               </div>
//             </div>

           
//             <Separator className="my-4" />

//             <div className="flex justify-between font-semibold text-lg mb-6">
//               <span>Total</span>
//               <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
//             </div>

            
//               <Button 
//               disabled={checkOutLoading }
//               //  onClick={handleCheckOut}
//                onClick={() => setOpenCheckoutForm(true)} 
//                 className="w-full" size="lg"
//                 >
//               {checkOutLoading && <Loader2 className=' animate-spin'/>}
//               Proceed to Checkout
//             </Button>
//             <Button variant="outline" className="w-full mt-2" asChild>
//               <Link href="/products">Continue Shopping</Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//       :
//       <div className='text-center capitalize'>
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">No Products In Your  Cart</h2>
//         <Button variant="outline" className="w-fit mt-2" asChild>
//         <Link href="/products">add products to your cart</Link>
//         </Button>
//       </div>
//       }
//  {/* Checkout Form Dialog */}
//         <Dialog open={openCheckoutForm} onOpenChange={setOpenCheckoutForm}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Shipping Address</DialogTitle>
//             </DialogHeader>

//             <div className="space-y-4">
//               <div>
//                 <Label>Details</Label>
//                 <Input 
//                   value={} 
//                   onChange={(e) => setAddress({...address, details: e.target.value})} 
//                 />
//               </div>
//               <div>
//                 <Label>Phone</Label>
//                 <Input 
//                   value={address.phone} 
//                   onChange={(e) => setAddress({...address, phone: e.target.value})} 
//                 />
//               </div>
//               <div>
//                 <Label>City</Label>
//                 <Input 
//                   value={address.city} 
//                   onChange={(e) => setAddress({...address, city: e.target.value})} 
//                 />
//               </div>
//             </div>

//             <DialogFooter>
//               <Button 
//                 disabled={checkOutLoading} 
//                 onClick={handleCheckOut}>
//                 {checkOutLoading && <Loader2 className='animate-spin mr-2'/>}
//                 Confirm & Checkout
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//     </>
//   )











"use client"
import CartProduct from '@/components/products/CartProduct'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/helpers/currency'
import { IGetUserCartResponce } from '@/interfaces'
import { apiServices } from '@/services/api'
import { Loader2, Trash2 } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CartContext } from '@/contexts/cartContext'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface InnerCartProps{
  CartData:IGetUserCartResponce
}
export default function InnerCart({CartData}:InnerCartProps) {

  const [innerCartData, setinnerCartData] = useState<IGetUserCartResponce>(CartData)
  const [isclaeringcart, setisclaeringcart] = useState(false)
  // const [checkOutLoading, setcheckOutLoading] = useState(false)
  const {setCartCount} =useContext(CartContext)
  const [confirmLoading, setConfirmLoading] = useState(false) 
  const [openCheckoutForm, setOpenCheckoutForm] = useState(false)


  


  const [address, setAddress] = useState({
    details: "",
    phone: "",
    city: ""
  })

  useEffect(()=>{
    setCartCount(innerCartData.numOfCartItems);
  },[innerCartData, setCartCount])

  async function handledeleteSpecificProduct(productId:string, setisremovingproduct:(value:boolean)=>void) {
    setisremovingproduct(true)
    const response = await apiServices.deleteSpacificItem(productId)
    setisremovingproduct(false)
    const newCart = await apiServices.getUserCart()
    setinnerCartData(newCart)
    toast.success("product removed successfully",{
      position:"bottom-right"
    })
  }

  async function handleClearCart(){
    setisclaeringcart(true)
    await apiServices.clearCart()
    setisclaeringcart(false)
    toast.success("cart cleared successfully",{
      position:"bottom-right"
    })
    const newCart = await apiServices.getUserCart()
    setinnerCartData(newCart)
  }

  async function handleUpdateCart(productId:string,count:number){
    await apiServices.updateCart(productId,count)
    const newCart = await apiServices.getUserCart()
    setinnerCartData(newCart)
  }

  async function handleCheckOut(){
    setConfirmLoading(true)
    try {
      const response = await apiServices.checkout(CartData.cartId, address) 
      location.href = response.session.url;
    } catch (error) {
      toast.error("Checkout failed")
    }
    setConfirmLoading(false)
  }

  return (
    <>
       {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        { innerCartData.numOfCartItems > 0 && <p className="text-muted-foreground">
          {innerCartData.numOfCartItems} item
          {innerCartData.numOfCartItems !== 1 ? "s" : ""} in your cart
        </p>}
      </div>

      {innerCartData.numOfCartItems > 0 ? 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {innerCartData.data.products.map((item) => (
              <CartProduct
                handledeleteSpecificProduct={handledeleteSpecificProduct}
                key={item._id}
                item={item}
                handleUpdateCart={handleUpdateCart}
              />
            ))}
          </div>

          {/* Clear Cart */}
          <div className="mt-6">
            <Button disabled={isclaeringcart} onClick={handleClearCart} variant="outline">
             {isclaeringcart ? <Loader2 className='animate-spin'/> : <Trash2 className="h-4 w-4 mr-2" />}
              Clear Cart 
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-18">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({innerCartData.numOfCartItems} items)</span>
                <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
            </div>

            <Button 
              // disabled={checkOutLoading }
              onClick={() => setOpenCheckoutForm(true)} 
              className="w-full" size="lg"
            >
              {/* {checkOutLoading && <Loader2 className=' animate-spin'/>} */}
              Proceed to Checkout
            </Button>
            <Button variant="outline" className="w-full mt-2" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
      :
      <div className='text-center capitalize'>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">No Products In Your  Cart</h2>
        <Button variant="outline" className="w-fit mt-2" asChild>
          <Link href="/products">add products to your cart</Link>
        </Button>
      </div>
      }

      {/* Checkout Form Dialog */}
      <Dialog open={openCheckoutForm} onOpenChange={setOpenCheckoutForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Shipping Address</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Details</Label>
              <Input 
                value={address.details} 
                onChange={(e) => setAddress({...address, details: e.target.value})} 
                 className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input 
                value={address.phone} 
                onChange={(e) => setAddress({...address, phone: e.target.value})} 
                 className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none "
              />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input 
                value={address.city} 
                onChange={(e) => setAddress({...address, city: e.target.value})} 
                 className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              disabled={confirmLoading} 
              onClick={handleCheckOut}>
              {confirmLoading && <Loader2 className="animate-spin " />}
              Confirm & Checkout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
