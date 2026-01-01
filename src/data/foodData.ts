import salmonSushi from "@/assets/salmon-sushi.jpg";
import burger from "@/assets/burger.jpg";
import bbq from "@/assets/bbq.jpg";
import dessert from "@/assets/dessert.jpg";
import pizza from "@/assets/pizza.jpg";

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: string;
  prepTime?: string;
  calories?: number;
  sizes?: { name: string; priceModifier: number }[];
  addons?: { id: string; name: string; price: number }[];
}

export const categories = [
  { id: "burger", name: "Burger", icon: "🍔" },
  { id: "dessert", name: "Dessert", icon: "🍰" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "sushi", name: "Sushi", icon: "🍣" },
  { id: "bbq", name: "BBQ", icon: "🍖" },
];

export const popularFoodIds = ["1", "2", "4", "5"]; // IDs for popular foods

export const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Salmon Supreme",
    description: "Sushi salmon segar langsung dari laut jepang.",
    price: 60000,
    originalPrice: 80000,
    rating: 4.9,
    image: salmonSushi,
    category: "sushi",
    prepTime: "15 min",
    calories: 320,
    sizes: [
      { name: "Small", priceModifier: 0 },
      { name: "Regular", priceModifier: 10000 },
      { name: "Big", priceModifier: 18000 },
    ],
    addons: [
      { id: "wasabi", name: "Extra Wasabi", price: 5000 },
      { id: "ginger", name: "Extra Ginger", price: 5000 },
      { id: "soy", name: "Premium Soy Sauce", price: 8000 },
    ],
  },
  {
    id: "20",
    name: "Salmon Deluxe Platter",
    description: "Sushi salmon segar langsung dari laut jepang.",
    price: 60000,
    originalPrice: 80000,
    rating: 4.9,
    image: salmonSushi,
    category: "burger",
    prepTime: "15 min",
    calories: 320,
    sizes: [
      { name: "Small", priceModifier: 0 },
      { name: "Regular", priceModifier: 10000 },
      { name: "Big", priceModifier: 18000 },
    ],
    addons: [
      { id: "wasabi", name: "Extra Wasabi", price: 5000 },
      { id: "ginger", name: "Extra Ginger", price: 5000 },
      { id: "soy", name: "Premium Soy Sauce", price: 8000 },
    ],
  },
  {
    id: "21",
    name: "Salmon Golden Edition",
    description: "Sushi salmon segar langsung dari laut jepang.",
    price: 60000,
    originalPrice: 80000,
    rating: 4.9,
    image: salmonSushi,
    category: "burger",
    prepTime: "15 min",
    calories: 320,
    sizes: [
      { name: "Small", priceModifier: 0 },
      { name: "Regular", priceModifier: 10000 },
      { name: "Big", priceModifier: 18000 },
    ],
    addons: [
      { id: "wasabi", name: "Extra Wasabi", price: 5000 },
      { id: "ginger", name: "Extra Ginger", price: 5000 },
      { id: "soy", name: "Premium Soy Sauce", price: 8000 },
    ],
  },
  {
    id: "2",
    name: "Double Spicy Beef",
    description: "Gurih dan pedas dengan double patty beef premium.",
    price: 58000,
    rating: 4.8,
    image: burger,
    category: "burger",
    prepTime: "20 min",
    calories: 650,
    sizes: [
      { name: "Small", priceModifier: 0 },
      { name: "Regular", priceModifier: 12000 },
      { name: "Big", priceModifier: 20000 },
    ],
    addons: [
      { id: "cheese", name: "Extra Cheese", price: 8000 },
      { id: "bacon", name: "Crispy Bacon", price: 12000 },
      { id: "fries", name: "French Fries", price: 15000 },
    ],
  },
  {
    id: "3",
    name: "BBQ Ribs Platter",
    description: "Daging iga bakar dengan saus BBQ special kami.",
    price: 125000,
    rating: 4.7,
    image: bbq,
    category: "bbq",
    prepTime: "30 min",
    calories: 890,
    sizes: [
      { name: "Small", priceModifier: 0 },
      { name: "Regular", priceModifier: 25000 },
      { name: "Big", priceModifier: 50000 },
    ],
    addons: [
      { id: "corn", name: "Grilled Corn", price: 15000 },
      { id: "coleslaw", name: "Coleslaw", price: 10000 },
    ],
  },
  {
    id: "4",
    name: "Sweet Macarons Set",
    description: "Pilihan macaron dengan berbagai rasa premium.",
    price: 45000,
    rating: 4.9,
    image: dessert,
    category: "dessert",
    prepTime: "5 min",
    calories: 280,
    sizes: [
      { name: "Small", priceModifier: 0 },
      { name: "Regular", priceModifier: 15000 },
      { name: "Big", priceModifier: 30000 },
    ],
    addons: [
      { id: "coffee", name: "Espresso", price: 18000 },
      { id: "tea", name: "Earl Grey Tea", price: 15000 },
    ],
  },
  {
    id: "5",
    name: "Pepperoni Supreme",
    description: "Pizza dengan topping pepperoni dan keju mozzarella.",
    price: 89000,
    rating: 4.6,
    image: pizza,
    category: "pizza",
    prepTime: "25 min",
    calories: 720,
    sizes: [
      { name: "Small", priceModifier: 0 },
      { name: "Regular", priceModifier: 20000 },
      { name: "Big", priceModifier: 40000 },
    ],
    addons: [
      { id: "extra-cheese", name: "Extra Mozzarella", price: 15000 },
      { id: "jalapeno", name: "Jalapeño", price: 8000 },
    ],
  },
];

export interface CartItem extends FoodItem {
  quantity: number;
  selectedSize: string;
  selectedAddons: string[];
  totalPrice: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  status: "pending" | "preparing" | "delivered" | "cancelled";
  total: number;
  deliveryFee: number;
}

export const sampleOrders: Order[] = [
  {
    id: "#e480d8",
    date: "27 Des 2025, 15.45",
    items: [
      {
        ...foodItems[0],
        quantity: 2,
        selectedSize: "Big",
        selectedAddons: [],
        totalPrice: 156000,
      },
      {
        ...foodItems[1],
        quantity: 8,
        selectedSize: "Big",
        selectedAddons: [],
        totalPrice: 624000,
      },
    ],
    status: "pending",
    total: 634000,
    deliveryFee: 10000,
  },
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
