"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/shared";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function Profile() {
  const { data, status } = useSession();
  const [loading, setLoading] = useState(false);

  // form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  // show/hide password states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRe, setShowRe] = useState(false);

  const token = data?.token;

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();

    if (password !== rePassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
             token: token || "", 
          },
          body: JSON.stringify({
            currentPassword,
            password,
            rePassword,
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Password changed successfully ✅");
        setCurrentPassword("");
        setPassword("");
        setRePassword("");
        signOut({ callbackUrl: "/auth/login" });
      } else {
        toast.error(result.message || "Failed to change password");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (!data) {
    return <p className="text-center m-10 text-4xl font-semibold">No user data found.</p>;
  }

  const user = data.user;

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-md shadow-xl rounded-2xl p-6">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-20 h-20 text-xl">
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold text-center capitalize">
            {user?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-center">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium">{user?.role || "User"}</p>
          </div>
          <div>
            <Link href={"/allorders"}>
            <Button variant="outline" className="w-full">
                Show your Orders
              </Button>
            </Link>
          </div>

          <div className="pt-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleChangePassword}
                  className="space-y-4 pt-4"
                >
                  {/* Current Password */}
                  <div className="relative">
                    <Input
                      type={showCurrent ? "text" : "password"}
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* New Password */}
                  <div className="relative">
                    <Input
                      type={showNew ? "text" : "password"}
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <Input
                      type={showRe ? "text" : "password"}
                      placeholder="Confirm New Password"
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowRe(!showRe)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showRe ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Changing..." : "Confirm Change"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

