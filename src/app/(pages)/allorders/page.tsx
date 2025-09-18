"use client";
import { useEffect, useState } from "react";
import { IOrder } from "@/interfaces";
import { apiServices } from "@/services/api";
import Image from "next/image";
import { LoadingSpinner } from "@/components/shared";

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
      try {
        const userData = await apiServices.verifyToken();
        const userId = userData.id;

        const data = await apiServices.getUserOrders(userId)
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Unexpected response:", data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    fetchOrders();
  }, []);

  if ( loading) return  <LoadingSpinner />;
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="p-4 border rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-semibold">
              Order #{order._id.slice(-6)}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
              <p className="mt-2">
                <strong>Total:</strong> {order.totalOrderPrice} EGP
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {order.isDelivered ? "Delivered " : "Not Delivered "}
              </p>

            <div className="mt-3 space-y-2">
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-gray-500">
                        {item.count} × {item.price} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
