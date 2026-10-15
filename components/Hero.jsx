import Link from "next/link";
import { ArrowLeft, Sparkle } from "lucide-react";
export default function Hero() {
  return (
    <section className="cc-hero">
      <div className="cc-hero-photo">
        <img
          src="/images/design/hero.png"
          alt="مكعبات بناء ملونة وقوس قزح وسيارة من الخشب"
          fetchPriority="high"
        />
      </div>
      <div className="cc-container cc-hero-inner">
        <div className="cc-hero-copy">
          <p className="cc-eyebrow">اللعب بداية كل اكتشاف</p>
          <h1>
            ألعاب صغيرة،
            <br />
            <span>اكتشافات كبيرة.</span>
          </h1>
          <p className="cc-hero-description">
            اختار لطفلك لعبة تنمّي خياله، وتخلّي كل يوم حكاية جديدة.
          </p>
          <div className="cc-hero-buttons">
            <Link className="cc-button" href="/products">
              اكتشف الألعاب <ArrowLeft size={20} />
            </Link>
            <Link className="cc-text-link" href="#ages">
              اختار حسب العمر
            </Link>
          </div>
          <p className="cc-hero-note">
            ألعاب تعليمية <span>•</span> اختيار يناسب عمر طفلك
          </p>
        </div>
      </div>
      <Sparkle className="cc-hero-star" size={40} strokeWidth={1.5} />
    </section>
  );
}
