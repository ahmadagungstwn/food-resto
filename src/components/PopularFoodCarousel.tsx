import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { FoodItem, formatPrice } from "@/data/foodData";

interface PopularFoodCarouselProps {
  items: FoodItem[];
}

const PopularFoodCarousel = ({ items }: PopularFoodCarouselProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Paling Populer</h2>
        <Link to="/" className="text-sm text-primary hover:underline">
          Lihat Semua
        </Link>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-3 basis-[70%]">
              <Link to={`/product/${item.id}`}>
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
                  <div className="aspect-[16/10] relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span className="text-xs font-medium text-foreground">
                        {item.rating}
                      </span>
                    </div>
                    {/* Discount Badge */}
                    {item.originalPrice && (
                      <div className="absolute top-3 right-3 bg-destructive px-2 py-1 rounded-full">
                        <span className="text-xs font-bold text-destructive-foreground">
                          -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-foreground text-base mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold text-sm">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-muted-foreground text-xs line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PopularFoodCarousel;
