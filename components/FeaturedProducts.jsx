import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard from "./ProductCard";
import { catalogProducts } from "@/lib/catalog";
export default function FeaturedProducts() {
  const products = [1, 5, 3, 2].map((id) =>
    catalogProducts.find((p) => p.id === id),
  );
  return (
    <section className="cc-container cc-featured">
      <div className="cc-section-heading">
        <div>
          <p className="cc-eyebrow">لعب، تعلّم، واكتشاف</p>
          <h2>اختيارات تنمّي خيالهم</h2>
        </div>
        <Link className="cc-text-link" href="/products">
          كل الألعاب <ArrowLeft size={19} />
        </Link>
      </div>
      <div className="cc-products-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
