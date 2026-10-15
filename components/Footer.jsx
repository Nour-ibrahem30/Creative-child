import Link from "next/link";
import { ArrowUpLeft, Mail, Phone } from "lucide-react";
import Brand from "./Brand";
import { siteConfig } from "@/lib/seo";
export default function Footer() {
  return (
    <footer className="cc-footer">
      <div className="cc-container cc-footer-grid">
        <div>
          <Brand />
          <p>
            مساحة صغيرة للعب، وعالم كبير للاكتشاف.
            <br />
            ألعاب ووسائل تعليمية ترافق طفلك في كل مرحلة.
          </p>
        </div>
        <div>
          <h3>اكتشف المتجر</h3>
          <Link href="/products">كل الألعاب</Link>
          <Link href="/#ages">اختار حسب العمر</Link>
          <Link href="/offers">العروض</Link>
          <Link href="/wishlist">ألعابي المفضلة</Link>
        </div>
        <div>
          <h3>نحن هنا لمساعدتك</h3>
          <Link href="/about">عن الطفل المبدع</Link>
          <Link href="/contact">
            تواصل معنا <ArrowUpLeft size={15} />
          </Link>
          <a href={"mailto:" + siteConfig.contact.email}>
            <Mail size={16} /> البريد الإلكتروني
          </a>
          <a href={"tel:" + siteConfig.contact.phone2}>
            <Phone size={16} />
            <span dir="ltr">{siteConfig.contact.phone2}</span>
          </a>
        </div>
      </div>
      <div className="cc-container cc-footer-bottom">
        <span>
          © {new Date().getFullYear()} الطفل المبدع. كل الحقوق محفوظة.
        </span>
        <span>صُنع بحب، لخيال بلا حدود.</span>
      </div>
    </footer>
  );
}
