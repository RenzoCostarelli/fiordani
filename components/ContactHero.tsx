import { ImageFieldImage } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

export default function ContactHero({ image }: { image: ImageFieldImage }) {
  return (
    <div className="w-full h-[400px] bg-[#49614e] relative">
      <PrismicNextImage
        field={image}
        className="absolute w-full h-full inset-0 object-cover object-center"
        alt=""
      />
    </div>
  );
}
