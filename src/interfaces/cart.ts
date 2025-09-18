
import { Product } from "./product"

export interface IAddToCartResponce{
    status: string,
    message: string,
    numOfCartItems: number,
    cartId: string,
    data: IcartData<string>
}
export interface IGetUserCartResponce{
    status: string,
    message: string,
    numOfCartItems: number,
    cartId: string,
    data: IcartData<Product>
}

interface IcartData<T>{
    _id: string,
    cartOwner: string,
    products: IcartProduct<T>[],
    createdAt: string,
    updatedAt:string,
    __v:number ,
    totalCartPrice:number
}

export interface IcartProduct<T>{
    count: number,
    _id: string,
    product: T,
    price: number
}





