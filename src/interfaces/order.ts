export interface IOrder {
  _id: string;
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: {
    _id: string;
    count: number;
    price: number;
    product: {
      _id: string;
      title: string;
      imageCover: string;
      ratingsAverage: number;
      ratingsQuantity: number;
      brand: {
        _id: string;
        name: string;
        slug: string;
        image: string;
      };
      category: {
        _id: string;
        name: string;
        slug: string;
        image: string;
      };
      subcategory: {
        _id: string;
        name: string;
        slug: string;
        category: string;
      }[];
    };
  }[];
  createdAt: string;
  updatedAt: string;
}

