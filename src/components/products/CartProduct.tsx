"use client"
import React, { useState } from 'react'
import { Button } from '../ui'
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/helpers/currency'
import { IcartProduct, Product } from '@/interfaces'

interface CartProductProps{
    item:IcartProduct<Product>,
    handledeleteSpecificProduct:(
        productId:string,
        setisremovingproduct:(value:boolean)=>void
    )=>void,
    handleUpdateCart:(
        productId:string,
        count:number,
    )=>Promise<void>
}
export default function CartProduct({item ,handledeleteSpecificProduct,handleUpdateCart}:CartProductProps) {
    const [isremovingproduct, setisremovingproduct] = useState(false)
    const [productCount, setproductCount] = useState(item.count)
    const [timeoutId, settimeoutId] = useState<NodeJS.Timeout>()
    
    async function handleUpdateCount(count:number){
        setproductCount(count)
        clearTimeout(timeoutId)
        const id =setTimeout(()=>{
        handleUpdateCart(item.product._id , count)}
        ,300)
        settimeoutId(id)
    }
    return (
    <>
        <div key={item._id} className="flex gap-4 p-4 border rounded-lg">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    fill
                    className="object-cover rounded-md"
                    sizes="80px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold line-clamp-2">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {item.product.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.product.brand?.name}
                  </p>
                  <p className="font-semibold text-primary mt-2">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <Button onClick={()=>{ handledeleteSpecificProduct(item.product._id,setisremovingproduct)}} variant="ghost" size="sm">
                    {isremovingproduct ? <Loader2 className=' animate-spin'/> : <Trash2 className="h-4 w-4" /> }
                    </Button>

                    <div className="flex items-center gap-2">
                        <Button disabled={item.count == 1}
                            onClick={()=>{handleUpdateCount(productCount - 1)}} 
                            variant="outline" 
                            size="sm"
                            >
                            <Minus className="h-4 w-4" /> 
                        </Button>
                            <span className="w-8 text-center">{productCount}</span>
                        <Button 
                            disabled={item.count == item.product.quantity} 
                            onClick={()=>{handleUpdateCount(productCount + 1)}} 
                            variant="outline" 
                            size="sm"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
        </div>
    </>
    )
}
