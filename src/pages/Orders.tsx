import { ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { sampleOrders, formatPrice } from "@/data/foodData";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const Orders = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const statusConfig = {
    pending: { label: "Menunggu", className: "bg-warning/20 text-warning border border-warning/30" },
    preparing: { label: "Diproses", className: "bg-primary/20 text-primary border border-primary/30" },
    delivered: { label: "Selesai", className: "bg-success/20 text-success border border-success/30" },
    cancelled: { label: "Dibatalkan", className: "bg-destructive/20 text-destructive border border-destructive/30" },
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <Button
            variant="icon"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground flex-1 text-center mr-10">Pesanan Saya</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {sampleOrders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Belum ada pesanan</p>
            <Button onClick={() => navigate("/")}>Mulai Belanja</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {sampleOrders.map((order) => (
              <div
                key={order.id}
                className="bg-card rounded-2xl p-4 animate-fade-in"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-foreground">Order {order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                    statusConfig[order.status].className
                  )}>
                    <Clock className="h-3 w-3" />
                    {statusConfig[order.status].label}
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 border-t border-border pt-4 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">x{item.quantity} • {item.selectedSize.toLowerCase()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-bold text-primary">{formatPrice(order.total)}</p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav cartCount={totalItems} />
    </div>
  );
};

export default Orders;
