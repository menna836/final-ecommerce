"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { Eye, EyeOff } from "lucide-react";
import { apiServices } from "@/services/api"
import { toast } from "react-hot-toast"
import Link from "next/link"

const schema = z
  .object({
  name: z.string().nonempty("name is required").min(3, "Name cannot be less than 3 characters").max(20, "Name cannot be more than 20 characters"),
  email: z.string().nonempty("Gmail is required").regex(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,'email is invalid').email("Invalid email"),
  password: z.string().nonempty("password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"),
  rePassword: z.string().nonempty("repassword is required"),
  phone: z.string().min(10,"Phone number must be at least 10 digits")
  })
  .refine((data) => data.password === data.rePassword, {
    message: "password and repassword must matched",
    path: ["rePassword"]
  })

export default function Register() {
  const form = useForm({ resolver: zodResolver(schema),
     defaultValues:{
        name: "",
        email:"",
        password:"",
        rePassword:"",
        phone:""
      }
   })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  type RegisterFormValues = z.infer<typeof schema>;

  async function onSubmit(values:RegisterFormValues) {
    try {
      setIsLoading(true)

      const res = await apiServices.register(
        values.name,
        values.email,
        values.password,
        values.rePassword,
        values.phone
      )

      if (res.message === "success" && res.token) {
        localStorage.setItem("token", res.token);
        toast.success("Registration successful!")
        router.push("/auth/login")
        
        form.reset()

    
       
      } else {
        toast.error("Registration failed: " + (res.message || "Unknown error"))
      }

    }
    //  catch (error:any) {
    //   setTimeout(()=>{
    //     toast.error("Error: " + error.message)
    //   },5000)
    // } 
    catch (error: unknown) {
  setTimeout(() => {
    if (error instanceof Error) {
      toast.error("Error: " + error.message);
    } else {
      toast.error("An unknown error occurred");
    }
  }, 5000);
}

    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-10 pb-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Your name" />
                </FormControl>
                  <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.name?.message}
              </p>
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Your email" />
                </FormControl>
                  <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email?.message}
              </p>
              </FormItem>
            )} />

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

      {/* Confirm Password Field */}
      <FormField
        control={form.control}
        name="rePassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type={showRePassword ? "text" : "password"}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showRePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </FormControl>
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.rePassword?.message}
              </p>
          </FormItem>
        )}
        />

            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="01XXXXXXXXX" />
                </FormControl>
                  <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.phone?.message}
              </p>
              </FormItem>
            )} />

            <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              Register
            </Button>

          </form>
        </Form>

          <p className="p-3 capitalize  text-gray-500 ">already have an account ? <Link className="text-gray-900" href={"/auth/login"}>login</Link></p>
      </div>
    </div>
  )
}



