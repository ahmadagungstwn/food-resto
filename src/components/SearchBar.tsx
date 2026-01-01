import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onFilterClick?: () => void;
}

const SearchBar = ({ value = "", onChange, onFilterClick }: SearchBarProps) => {
  return (
    <div className="relative flex items-center gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cari burger, sushi, kopi..."
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="pl-12 pr-4"
        />
      </div>
      <Button
        variant="default"
        size="icon-lg"
        onClick={onFilterClick}
        className="shrink-0"
      >
        <SlidersHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SearchBar;
