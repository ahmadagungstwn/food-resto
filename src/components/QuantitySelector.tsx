import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="secondary"
        size="icon-sm"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="rounded-lg"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="text-lg font-bold text-foreground w-8 text-center">{quantity}</span>
      <Button
        variant="default"
        size="icon-sm"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="rounded-lg"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
