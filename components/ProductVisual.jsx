import {
  Blocks,
  CarFront,
  Palette,
  Puzzle,
  Bike,
  Plane,
  Stethoscope,
  CircleDot,
  Bot,
  FlaskConical,
  TrainFront,
} from "lucide-react";
const illustrations = { 1: 0, 5: 1, 3: 2, 2: 3 };
const icons = {
  4: CarFront,
  6: CircleDot,
  7: Stethoscope,
  8: TrainFront,
  9: Blocks,
  10: Plane,
  11: Palette,
  12: Bike,
  101: Bot,
  102: FlaskConical,
};
export default function ProductVisual({ product, className = "" }) {
  if (product.image)
    return (
      <div className={"cc-product-visual " + className}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
    );
  const tile = illustrations[product.id];
  if (tile !== undefined)
    return (
      <div
        role="img"
        aria-label={product.name}
        className={
          "cc-product-visual cc-product-tile cc-tile-" + tile + " " + className
        }
      />
    );
  const Icon = icons[product.id] || Puzzle;
  return (
    <div
      className={"cc-product-visual cc-product-placeholder " + className}
      role="img"
      aria-label={product.name}
    >
      <Icon strokeWidth={1} />
      <span>{product.category}</span>
    </div>
  );
}
