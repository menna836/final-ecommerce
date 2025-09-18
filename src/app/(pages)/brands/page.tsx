"use client";
import { Brand } from '@/interfaces';
import { apiServices } from '@/services/api';
import { BrandsResponse } from '@/types';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { LoadingSpinner } from '@/components/shared';
import { Button } from '@/components/ui';

export default function Brands() {


  const [brands, setbrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   async function  fetchBrands(){
    setLoading(true)
      const data:BrandsResponse = await apiServices.getAllBrands();
      setLoading(false)
      return setbrands(data.data)
  
    }
    useEffect(()=>{
      fetchBrands()
    },[])
     if (loading && brands.length === 0) {
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
    <>
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Brands</h1>
            <p className="text-muted-foreground">
              Discover amazing Brands 
            </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3  gap-4">
          {brands.map((brand) => (
            <div key={brand._id} className="border p-4 rounded shadow">
              <div className="relative w-20 h-20 mx-auto">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-center mt-2 font-semibold">{brand.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
    
  )
}
