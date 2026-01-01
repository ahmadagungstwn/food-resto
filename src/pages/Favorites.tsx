import { Heart } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import FoodCard from "@/components/FoodCard";
import { foodItems } from "@/data/foodData";
import { useCart } from "@/context/CartContext";

const Favorites = () => {
  const { totalItems } = useCart();
  
  // For demo purposes, show first 2 items as favorites
  const favoriteItems = foodItems.slice(0, 2);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-foreground text-center">Favorit</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {favoriteItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Belum ada favorit</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {favoriteItems.map((item) => (
              <FoodCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                rating={item.rating}
                image={item.image}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav cartCount={totalItems} />
    </div>
  );
};

export default Favorites;
