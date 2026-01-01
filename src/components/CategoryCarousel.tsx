import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryCarouselProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryCarousel = ({ categories, activeCategory, onCategoryChange }: CategoryCarouselProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Kategori</h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {categories.map((category) => (
            <CarouselItem key={category.id} className="pl-3 basis-[45%]">
              <Button
                variant={activeCategory === category.id ? "category-active" : "category"}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "w-full h-20 flex flex-col items-center justify-center gap-2 rounded-2xl",
                  activeCategory === category.id && "shadow-lg shadow-primary/30"
                )}
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
