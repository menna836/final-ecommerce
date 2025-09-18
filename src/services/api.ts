import { IAddToCartResponce, IGetUserCartResponce, IOrder, RegisterData, RegisterResponse, WishlistResponse} from "@/interfaces";
import { BrandsResponse, CategoriesResponse, ProductsResponse, SingleProductResponse } from "@/types";
import { getSession } from "next-auth/react";





const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL 

class ApiServices{

    #baseUrl :string = "";
    // #getHeaders(){
    //     return {
    //     "Content-Type" : "application/json",
    //     token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU2NjUzNjgyLCJleHAiOjE3NjQ0Mjk2ODJ9.63ksmE7wJ55MfjZky2769ViKuzskwnw3JLCqmaVqW-M"
    //     }
    // }
  
async getHeaders() {
  const session = await getSession();
  return {
    "Content-Type": "application/json",
     ...(session?.token && { token: session.token }),
   
  };
}


    

    constructor(){
        this.#baseUrl = baseUrl ?? ""
    }
    async  getAllProducts():Promise<ProductsResponse> 
    {
        return await fetch(
            this.#baseUrl+ "api/v1/products",{
                next:{
                    revalidate : 60
                },
                cache:"no-cache"
            }
        ).then(res => res.json());
    }

    async getProductDetails(productId:string ):Promise<SingleProductResponse>{
        return await fetch(
            this.#baseUrl +"api/v1/products/" + productId)
    .then(res => res .json())
    }

  
    async addProductToCart(productId:string):Promise<IAddToCartResponce>  { 
        return await fetch(
            this.#baseUrl + "api/v1/cart" ,{
                method:"post",
                body: JSON.stringify({
                    productId
                }),
                headers : await this.getHeaders()
            } ).then(res=>res.json())
    }

    async getUserCart():Promise<IGetUserCartResponce>{
      
            return await fetch(
            this.#baseUrl + "api/v1/cart" ,{
                method:"get",
                headers : await this.getHeaders()
            } ).then(res=>res.json())

    }




    async deleteSpacificItem(productId:string):Promise<unknown>{
        return await fetch(
        this.#baseUrl +"api/v1/cart/" + productId,{
            method:"delete",
            headers : await this.getHeaders()
        })
        .then(res => res.json())
    }
    
    async clearCart():Promise<unknown>{
        return await fetch(
        this.#baseUrl +"api/v1/cart/",{
            method:"delete",
            headers : await this.getHeaders()
        })
        .then(res => res.json())
    }

    async updateCart(productId:string,count:number):Promise<unknown>  { 
        return await fetch(
            this.#baseUrl + "api/v1/cart/"+productId ,{
                method:"put",
                body: JSON.stringify({
                   count
                }),
                headers : await this.getHeaders()
            } ).then(res=>res.json())
    }
    
    async getAllBrands():Promise<BrandsResponse>{
        return await fetch(
            this.#baseUrl +"api/v1/brands")
            .then(res => res .json())
        }
    async getAllCategories():Promise<CategoriesResponse>{
        return await fetch(
            this.#baseUrl +"api/v1/categories")
            .then(res => res .json())
        }

    async  checkout(cartId:string, shippingAddress: { details: string; phone: string; city: string }){
        return await fetch(this.#baseUrl+"api/v1/orders/checkout-session/"+cartId+"?url=http://localhost:3000",{
            body:JSON.stringify(
                {
                    shippingAddress: {
                    details: shippingAddress.details,
                    phone: shippingAddress.phone,
                    city: shippingAddress.city,
                    },
                }
                
            ),headers: await this.getHeaders(),
            method:"post"
        })
    .then(res => res .json())
    }

    async getUserOrders(userId: string): Promise<IOrder[]> {
    return await fetch(
        this.#baseUrl + "api/v1/orders/user/" + userId,
        {
        method: "get",
      
        }
    ).then((res) => res.json());
    }


    async verifyToken(): Promise<{ id: string }> {
    return await fetch(this.#baseUrl + "api/v1/auth/verifyToken", {
        method: "GET",
        headers: await this.getHeaders(), 
    }).then((res) => res.json())
    .then((data) => data.decoded); 
    }


    async addProductToWishlist(productId: string): Promise<unknown> {
    return await fetch(
        this.#baseUrl + "api/v1/wishlist",
        {
        method: "post",
        body: JSON.stringify({ productId }),
        headers: await this.getHeaders(),
        }
    ).then((res) => res.json());
    }

    async getProductWishlist(): Promise<WishlistResponse> {
    return await fetch(
        this.#baseUrl + "api/v1/wishlist",
        {
        method: "get",
        headers:await this.getHeaders(),
        }
    ).then((res) => res.json());
    }

    async removeProductFromWishlist(productId: string): Promise<unknown> {
    return await fetch(
        this.#baseUrl + "api/v1/wishlist/"+productId,
        {
        method: "delete",
        headers:await this.getHeaders(),
        }
    ).then((res) => res.json());
    }

    async login(email:string,password:string):Promise<unknown>{
        return await fetch(
        this.#baseUrl + "api/v1/auth/signin",
        {
            method: "post",
            body: JSON.stringify({ 
                email,
                password
            }),
            headers:await this.getHeaders(),

        }
    ).then((res) => res.json());
    }
    
    async register(name:string,email:string,password:string,rePassword:string,phone:string):Promise<RegisterResponse>{
        return await fetch(
        this.#baseUrl + "api/v1/auth/signup",
        {
            method: "post",
            body: JSON.stringify({ 
                name,
                email,
                password,
                rePassword,
                phone
            }),
            headers:await this.getHeaders(),

        }
    ).then((res) => res.json());
    }

  


}

export const apiServices = new ApiServices()









