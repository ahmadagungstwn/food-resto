import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const FoodCard = ({
  id,
  name,
  description,
  price,
  rating,
  image,
  isFavorite = false,
  onFavoriteToggle,
}: FoodCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
    onFavoriteToggle?.(id);
  };

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="relative rounded-2xl overflow-hidden bg-card group animate-fade-in card-shadow">
        {/* Image Container */}
        <div className="relative aspect-16/7 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-secondary/90 backdrop-blur-sm flex items-center justify-center transition-transform active:scale-90"
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                favorite ? "fill-primary text-primary" : "text-foreground"
              )}
            />
          </button>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-secondary/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-semibold text-foreground">
              {rating}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-foreground mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Harga
            </p>
            <p className="text-lg font-bold text-primary">
              {formatPrice(price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;
