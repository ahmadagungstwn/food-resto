import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/foodData";
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();

  const deliveryFee = items.length > 0 ? 10000 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    toast.success("Pesanan berhasil dibuat!");
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="icon"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Keranjang</h1>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-primary hover:text-primary"
            >
              Hapus Semua
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Keranjang Anda kosong</p>
            <Button onClick={() => navigate("/")}>Mulai Belanja</Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="bg-card rounded-2xl p-4 flex gap-4 animate-fade-in"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="font-bold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Size: {item.selectedSize}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeFromCart(item.id)}
                        className="shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-primary font-bold">{formatPrice(item.totalPrice)}</p>
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-foreground">Ringkasan Pesanan</h3>
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Ongkos Kirim</span>
                <span className="text-foreground">{formatPrice(deliveryFee)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-bold text-primary text-lg">{formatPrice(total)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Checkout */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
          <div className="max-w-md mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Pembayaran</p>
              <p className="text-xl font-bold text-foreground">{formatPrice(total)}</p>
            </div>
            <Button className="h-14 px-8" onClick={handleCheckout}>
              Bayar Sekarang
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
