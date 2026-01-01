import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Star, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/QuantitySelector";
import { foodItems, formatPrice } from "@/data/foodData";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = foodItems.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[2]?.name || "Regular");
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Produk tidak ditemukan</p>
      </div>
    );
  }

  const sizeModifier = product.sizes?.find((s) => s.name === selectedSize)?.priceModifier || 0;
  const totalPrice = (product.price + sizeModifier) * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, []);
    toast.success(`${product.name} ditambahkan ke keranjang!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Top Navigation */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button
            variant="icon"
            size="icon"
            onClick={() => navigate(-1)}
            className="bg-secondary/80 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="icon"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-secondary/80 backdrop-blur-sm"
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-primary text-primary")} />
            </Button>
            <Button
              variant="icon"
              size="icon"
              onClick={() => navigate("/cart")}
              className="bg-secondary/80 backdrop-blur-sm"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-8 relative z-10">
        <div className="bg-card rounded-t-3xl p-6 min-h-[60vh]">
          {/* Title and Price */}
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
            <div className="text-right">
              <p className="text-xl font-bold text-primary">{formatPrice(product.price + sizeModifier)}</p>
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>
          </div>

          {/* Info Badges */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1.5">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="text-sm font-semibold">{product.rating}</span>
            </div>
            {product.prepTime && (
              <div className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold">{product.prepTime}</span>
              </div>
            )}
            {product.calories && (
              <div className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1.5">
                <Flame className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">{product.calories} Kcal</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              Fresh salmon sushi straight from the Japanese sea. Premium quality salmon on perfectly seasoned sushi rice with wasabi and pickled ginger.
            </p>
          </div>

          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Choose Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <Button
                    key={size.name}
                    variant={selectedSize === size.name ? "outline" : "secondary"}
                    onClick={() => setSelectedSize(size.name)}
                    className={cn(
                      "flex-1",
                      selectedSize === size.name && "border-primary text-primary"
                    )}
                  >
                    {size.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-3">Add-ons</h3>
            <p className="text-muted-foreground text-sm">Coming soon...</p>
          </div>

          {/* Bottom Actions */}
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
            <div className="max-w-md mx-auto flex items-center gap-4">
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
              />
              <Button
                className="flex-1 h-14"
                onClick={handleAddToCart}
              >
                Add to Cart · {formatPrice(totalPrice)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
