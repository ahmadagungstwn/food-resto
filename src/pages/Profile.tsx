import { ArrowLeft, User, MapPin, CreditCard, Bell, HelpCircle, Info, ChevronRight, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { useCart } from "@/context/CartContext";

const Profile = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const menuItems = [
    { icon: <User className="h-5 w-5" />, label: "Edit Profil", path: "/profile/edit" },
    { icon: <MapPin className="h-5 w-5" />, label: "Alamat Saya", path: "/profile/addresses" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Metode Pembayaran", path: "/profile/payment" },
    { icon: <Bell className="h-5 w-5" />, label: "Notifikasi", path: "/profile/notifications" },
    { icon: <HelpCircle className="h-5 w-5" />, label: "Bantuan", path: "/profile/help" },
    { icon: <Info className="h-5 w-5" />, label: "Tentang Aplikasi", path: "/profile/about" },
  ];

  const stats = [
    { value: 12, label: "Pesanan" },
    { value: 5, label: "Favorit" },
    { value: 3, label: "Voucher" },
  ];

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
          <h1 className="text-xl font-bold text-foreground flex-1 text-center mr-10">Profil</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center text-foreground font-bold text-xl">
              F
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">Franzz</h2>
            <p className="text-muted-foreground">franzz@gmail.com</p>
          </div>
          <Button variant="default" size="icon-sm" className="rounded-lg">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="bg-card rounded-2xl p-4 grid grid-cols-3 divide-x divide-border">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-2xl overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0"
              onClick={() => {}}
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
                {item.icon}
              </div>
              <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      <BottomNav cartCount={totalItems} />
    </div>
  );
};

export default Profile;
