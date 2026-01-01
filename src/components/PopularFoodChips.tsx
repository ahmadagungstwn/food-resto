import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { FoodItem, formatPrice } from "@/data/foodData";

interface PopularFoodChipsProps {
  items: FoodItem[];
}

const PopularFoodChips = ({ items }: PopularFoodChipsProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Paling Populer</h2>
        <Link to="/" className="text-sm text-primary hover:underline">
          Lihat Semua
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item) => (
          <Link 
            key={item.id} 
            to={`/product/${item.id}`}
            className="shrink-0"
          >
            <div className="flex items-center gap-3 bg-card border border-border rounded-full px-3 py-2 hover:bg-card/80 transition-colors">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {item.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary font-semibold">
                    {formatPrice(item.price)}
                  </span>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-xs text-muted-foreground">{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularFoodChips;
