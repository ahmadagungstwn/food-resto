import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryChips from "@/components/CategoryChips";
import FoodCard from "@/components/FoodCard";
import BottomNav from "@/components/BottomNav";
import PopularFoodCarousel from "@/components/PopularFoodCarousel";
import { categories, foodItems, popularFoodIds } from "@/data/foodData";
import { useCart } from "@/context/CartContext";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("burger");
  const { totalItems } = useCart();

  const popularItems = foodItems.filter((item) => popularFoodIds.includes(item.id));

  const filteredItems = foodItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (searchQuery === "" || matchesSearch);
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <Header />

        {/* Hero Text */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            Mau makan apa
          </h1>
          <h1 className="text-3xl font-bold text-primary">
            hari ini?
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Popular Food Carousel (Large) */}
        <PopularFoodCarousel items={popularItems} />

        {/* Category Chips (Small) */}
        <CategoryChips
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Food Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {filteredItems.map((item) => (
            <FoodCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              rating={item.rating}
              image={item.image}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tidak ada makanan ditemukan</p>
          </div>
        )}
      </div>

      <BottomNav cartCount={totalItems} />
    </div>
  );
};

export default Index;
