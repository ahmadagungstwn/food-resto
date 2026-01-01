import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryCarousel from "@/components/CategoryCarousel";
import FoodCard from "@/components/FoodCard";
import BottomNav from "@/components/BottomNav";
import PopularFoodCarousel from "@/components/PopularFoodCarousel";
import { categories, foodItems, popularFoodIds } from "@/data/foodData";
import { useCart } from "@/context/CartContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("burger");
  const { totalItems } = useCart();

  const popularItems = foodItems.filter((item) =>
    popularFoodIds.includes(item.id)
  );

  const filteredItems = foodItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (searchQuery === "" || matchesSearch);
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <Header />

        {/* Hero Text */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Mau makan apa</h1>
          <h1 className="text-3xl font-bold text-primary">hari ini?</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Category Chips (Small) */}
        <CategoryCarousel
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Food Carousel */}
        <div className="mt-6">
          <Carousel
            opts={{
              align: "start",
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {filteredItems.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="
            pl-3
            basis-[80%]
            sm:basis-[45%]
            md:basis-[30%]
            lg:basis-[22%]
          "
                >
                  <FoodCard
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    rating={item.rating}
                    image={item.image}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Popular Food Carousel (Large) */}
        <PopularFoodCarousel items={popularItems} />

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
