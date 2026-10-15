'use client'
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { catalogProducts } from "@/lib/catalog";

export default function FeaturedProducts() {
  const products = [1, 5, 3, 2].map((id) =>
    catalogProducts.find((p) => p.id === id),
  );
  return (
    <section className="cc-container cc-featured">
      <motion.div 
        className="cc-section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p className="cc-eyebrow">لعب، تعلّم، واكتشاف</p>
          <h2>اختيارات تنمّي خيالهم</h2>
        </div>
        <Link className="cc-text-link" href="/products">
          كل الألعاب <ArrowLeft size={19} />
        </Link>
      </motion.div>
      <div className="cc-products-grid">
        {products.map((p, index) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
