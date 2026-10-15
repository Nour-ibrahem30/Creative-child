"use client";
import Link from "next/link";
import { Heart, Plus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductVisual from "./ProductVisual";
import toast from "react-hot-toast";
export default function ProductCard({ product }) {
  const add = useCartStore((s) => s.addItem),
    { items, toggle } = useWishlistStore();
  const [added, setAdded] = useState(false),
    [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const saved = ready && items.some((p) => p.id === product.id);
  function addItem() {
    add(product);
    setAdded(true);
    toast.success("تمت الإضافة إلى السلة");
    setTimeout(() => setAdded(false), 1500);
  }
  return (
    <article className="cc-product-card">
      <Link className="cc-product-image-link" href={"/products/" + product.id}>
        <ProductVisual product={product} />
      </Link>
      <button
        className={"cc-favorite " + (saved ? "is-saved" : "")}
        aria-label={
          (saved ? "حذف " : "حفظ ") +
          product.name +
          (saved ? " من المفضلة" : " في المفضلة")
        }
        aria-pressed={saved}
        onClick={() => toggle(product)}
      >
        <Heart size={20} fill={saved ? "currentColor" : "none"} />
      </button>
      {product.discount > 0 && (
        <span className="cc-discount">
          خصم {product.discount.toLocaleString("ar-EG")}٪
        </span>
      )}
      <div className="cc-product-info">
        <div>
          {product.ageRange && (
            <span className="cc-age-tag">{product.ageRange}</span>
          )}
          <Link href={"/products/" + product.id} className="cc-product-name">
            {product.name.replace(" - 100 قطعة", "").replace(" - ", " ")}
          </Link>
          <div className="cc-price">
            <strong>
              {product.price.toLocaleString("ar-EG")} <small>ج.م</small>
            </strong>
            {product.oldPrice > product.price && (
              <del>{product.oldPrice.toLocaleString("ar-EG")} ج.م</del>
            )}
          </div>
        </div>
        <button
          className="cc-add"
          onClick={addItem}
          aria-label={"إضافة " + product.name + " للسلة"}
        >
          {added ? <Check size={22} /> : <Plus size={24} />}
        </button>
      </div>
    </article>
  );
}
