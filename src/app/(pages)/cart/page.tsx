
// import { apiServices } from '@/services/api'
// import React from 'react'
// import InnerCart from './InnerCart';

// export default async function Cartpage() {
  

//   async function fetchCart(){
//     const response = await apiServices.getUserCart();
  
//     return response
//   }
//   const response = await fetchCart();
// //   response.data.products[0].product.category
// // console.log(response)

//   return (
//     <>
//       <div className="container mx-auto px-4 py-8">
//         <InnerCart CartData={response}/>
//       </div>
//     </>
      
//   )
// }

"use client"

import { apiServices } from '@/services/api'
import React, { useEffect, useState } from 'react'
import InnerCart from './InnerCart'
import { LoadingSpinner } from '@/components/shared'
import { Button } from '@/components/ui'

export default function Cartpage() {
  const [cartData, setCartData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);

   async function fetchCart() {
      const response = await apiServices.getUserCart()
      setCartData(response)
      setLoading(false)
      }
  useEffect(() => {
    fetchCart()
  }, [])

  if (loading) {
    return <LoadingSpinner />; 
  }
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <InnerCart CartData={cartData}/>
    </div>
  )
}

