import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="bg-[var(--color-accent)] text-white text-xs font-medium py-2 px-4 text-center tracking-wide">
      <Link href="/shop" className="hover:underline underline-offset-2 transition-all">
        Free Worldwide Shipping on Orders Over $50
      </Link>
    </div>
  );
}
