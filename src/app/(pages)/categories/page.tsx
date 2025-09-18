"use client";
import { Category } from '@/interfaces';
import { apiServices } from '@/services/api';
import { CategoriesResponse } from '@/types';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { LoadingSpinner } from '@/components/shared';
import { Button } from '@/components/ui';


export default function Categories() {


  const [categories, setcategories] = useState<Category[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   async function  fetchCategories(){
    setLoading(true)
      const data:CategoriesResponse = await apiServices.getAllCategories();
      setLoading(false)
      return setcategories(data.data)
  
    }
    useEffect(()=>{
      fetchCategories()
    },[])

     if (loading && categories.length === 0) {
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
            <h1 className="text-3xl font-bold mb-4">Categories</h1>
            <p className="text-muted-foreground">
              Discover amazing Categories 
            </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3  gap-4">
          {categories.map((category) => (
            <div key={category._id} className="border p-4 rounded shadow">
              <div className="relative w-20 h-20 mx-auto">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-center mt-2 font-semibold">{category.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
    
  )
}
