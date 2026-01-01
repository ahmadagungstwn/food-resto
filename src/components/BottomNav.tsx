import { Home, Heart, ShoppingBag, ClipboardList, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: number;
}

interface BottomNavProps {
  cartCount?: number;
}

const BottomNav = ({ cartCount = 0 }: BottomNavProps) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: <Home className="h-6 w-6" />, label: "Beranda", path: "/" },
    { icon: <Heart className="h-6 w-6" />, label: "Favorit", path: "/favorites" },
    { icon: <ShoppingBag className="h-6 w-6" />, label: "", path: "/cart", badge: cartCount },
    { icon: <ClipboardList className="h-6 w-6" />, label: "Pesanan", path: "/orders" },
    { icon: <User className="h-6 w-6" />, label: "Profil", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isCart = item.path === "/cart";

          if (isCart) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative -mt-6"
              >
                <div className="relative bg-primary rounded-full p-4 shadow-lg shadow-primary/40">
                  <ShoppingBag className="h-6 w-6 text-primary-foreground" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
