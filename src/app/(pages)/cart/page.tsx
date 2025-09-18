"use client"
import { apiServices } from '@/services/api'
import React, { useEffect, useState } from 'react'
import InnerCart from './InnerCart'
import { LoadingSpinner } from '@/components/shared'
import { Button } from '@/components/ui'
import { IGetUserCartResponce } from '@/interfaces'

export default function Cartpage() {
  const [cartData, setCartData] = useState<IGetUserCartResponce | null>(null)
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
      {cartData ? <InnerCart CartData={cartData} /> : null}

     {/* <InnerCart CartData={cartData}/> */}
    </div>
  )
}

