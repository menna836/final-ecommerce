"use client"
import CartContextProvider from '@/contexts/cartContext'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'

export default function ProviderContainer({
    children,
}:{
    children :ReactNode
}){
  return (
    <SessionProvider>
       <Provider store={store}>
          <CartContextProvider>
            {children}
          </CartContextProvider>
        </Provider>

    </SessionProvider>
  
  )
}

