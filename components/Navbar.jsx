"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  UserRound,
  Search,
  Menu,
  X,
  Truck,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Brand from "./Brand";
export default function Navbar() {
  const [open, setOpen] = useState(false),
    [query, setQuery] = useState(""),
    [ready, setReady] = useState(false);
  const items = useCartStore((s) => s.items),
    path = usePathname(),
    router = useRouter();
  useEffect(() => {
    setReady(true);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  const count = ready ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const links = [
    { href: "/", label: "الرئيسية" },
    { href: "/products", label: "الألعاب" },
    { href: "/#ages", label: "حسب العمر" },
    { href: "/offers", label: "العروض" },
    { href: "/about", label: "عن المتجر" },
  ];
  function search(e) {
    e.preventDefault();
    if (query.trim()) {
      router.push("/products?search=" + encodeURIComponent(query.trim()));
      setOpen(false);
    }
  }
  return (
    <header className="cc-header">
      <div className="cc-announcement">
        <Truck size={17} />
        <span>توصيل مجاني للطلبات فوق ٥٠٠ جنيه</span>
      </div>
      <div className="cc-nav cc-container">
        <Brand />
        <nav className="cc-desktop-links" aria-label="القائمة الرئيسية">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={path === l.href ? "page" : undefined}
            >
              {l.label}
              {["الألعاب", "حسب العمر"].includes(l.label) && (
                <ChevronDown size={13} />
              )}
            </Link>
          ))}
        </nav>
        <div className="cc-nav-actions">
          <form onSubmit={search} className="cc-search">
            <input
              aria-label="ابحث عن لعبة"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن ألعاب أو مهارات ..."
            />
            <button aria-label="بحث">
              <Search size={19} />
            </button>
          </form>
          <Link className="cc-icon" href="/auth/login" aria-label="حسابي">
            <UserRound />
          </Link>
          <Link
            className="cc-icon cc-bag"
            href="/cart"
            aria-label={"سلة التسوق، " + count + " منتج"}
          >
            <ShoppingBag />
            {count > 0 && <span>{count}</span>}
          </Link>
          <button
            className="cc-icon cc-menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="cc-mobile-menu">
          <form onSubmit={search} className="cc-search">
            <input
              aria-label="البحث في الألعاب"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="بتدور على لعبة إيه؟"
            />
            <button aria-label="بحث">
              <Search size={19} />
            </button>
          </form>
          <nav>
            {links.map((l) => (
              <Link href={l.href} key={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
