import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ArrowButton({ href }: { href: string }) {
  return (
    <Link href={href} className="w-10 group cursor-pointer">
      <div className="p-0.5 rounded-xl border border-white pl-5 group-hover:pl-0.5 transition-all w-max ml-auto duration-300">
        <div className="w-4 h-4 bg-white group-hover:text-white rounded-full ml-auto">
          <ArrowRight className="text-green-700 w-full h-full" />
        </div>
      </div>
    </Link>
  );
}
