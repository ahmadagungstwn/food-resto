import { ChevronDown, Bell } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  userName?: string;
  location?: string;
  avatarUrl?: string;
}

const Header = ({
  userName = "Franzz",
  location = "Jakarta Selatan",
  avatarUrl,
}: HeaderProps) => {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden border-2 border-primary/30">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-primary/40 to-primary/20 flex items-center justify-center text-foreground font-bold text-lg">
              {userName.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Lokasi Anda</p>
          <button className="flex items-center gap-1 text-foreground font-semibold">
            {location}
            <ChevronDown className="h-4 w-4 text-primary" />
          </button>
        </div>
      </div>
      <Button variant="icon" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full" />
      </Button>
    </header>
  );
};

export default Header;
