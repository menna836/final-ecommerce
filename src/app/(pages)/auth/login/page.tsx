"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z } from "zod"
import {signIn} from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast"

const formSchema = z.object({
  email: z.string().nonempty("Gmail is required").regex(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,'email is invalid').email("Invalid email"),
  password: z.string().nonempty("password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"),
})
export default function Login() {
    const form = useForm({resolver: zodResolver(formSchema),
        defaultValues:{
        email:"",
        password:""
      }
    })
    const [isloading, setisloading] = useState(false)
    const searchParams= useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [showPassword, setShowPassword] = useState(false);
    const router =useRouter()

      async function onSubmit(values:any){
        try{
            setisloading(true)
            const response= await signIn("credentials",{
            email:values.email,
            password:values.password,
            redirect: false
        })
          setisloading(false)
          form.reset()
          if(response?.ok ){
          router.push(callbackUrl)
        }else if (response?.error) {
        
      toast.error(response.error); 

      }
        }
        
        catch(error){
          toast.error(JSON.stringify(error))
        }
    }
return (
<div className="  pt-10 pb-10 ">
  <div className=" max-w-2xl mx-auto rounded-2xl  shadow-xl p-5  ">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Login Page</h1>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your-email@example.com"
                  type="text"
                  {...field}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </FormControl>
               <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.email?.message}
              </p>
            </FormItem>
          )}
        />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </FormControl>
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password?.message}
              </p>
          </FormItem>
        )}
      />

        <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2"
            disabled={isloading}
            >
            {isloading && <Loader2 className="animate-spin h-5 w-5" />}
            Login
          </Button>


        
      </form>
    </Form>
    <p className="p-3 capitalize  text-gray-500 ">donot have an account ? <Link className="text-gray-900" href={"/auth/register"}> register now</Link></p>
  </div>
</div>

  )
}
