import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryChipsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryChips = ({ categories, activeCategory, onCategoryChange }: CategoryChipsProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "category-active" : "category"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 shrink-0",
            activeCategory === category.id && "shadow-lg shadow-primary/30"
          )}
        >
          <span className="text-lg">{category.icon}</span>
          <span>{category.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryChips;
