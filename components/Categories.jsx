import Link from "next/link";
import { Baby, Blocks, CarFront, Rocket } from "lucide-react";
const ages = [
  { value: "0-2", label: "٠ – ٢ سنة", Icon: Baby },
  { value: "3-5", label: "٣ – ٥ سنوات", Icon: Blocks },
  { value: "6-8", label: "٦ – ٨ سنوات", Icon: CarFront },
  { value: "9", label: "٩+ سنوات", Icon: Rocket },
];
export default function Categories() {
  return (
    <section
      className="cc-container cc-ages"
      id="ages"
      aria-labelledby="age-heading"
    >
      <h2 id="age-heading">
        لكل مرحلة،{" "}
        <br />
        لعبة تحكي حكايتها
        <span className="cc-short-line" />
      </h2>
      <div className="cc-age-options">
        {ages.map(({ value, label, Icon }) => (
          <Link className="cc-age" key={value} href={"/products?age=" + value}>
            <Icon size={44} strokeWidth={1.4} />
            <span>{label}</span>
            <span className="cc-age-arrow" aria-hidden="true">
              ←
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
