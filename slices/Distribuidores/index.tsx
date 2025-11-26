import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Distribuidores`.
 */
export type DistribuidoresProps =
  SliceComponentProps<Content.DistribuidoresSlice>;

/**
 * Component for "Distribuidores" Slices.
 */
const Distribuidores: FC<DistribuidoresProps> = ({ slice }) => {
  const title = slice.primary.title;
  const subtitle = slice.primary.text;
  const logos = slice.primary.logos;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pb-16 bg-[#dcd9d2]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="w-full text-4xl text-center font-serif">
          <PrismicRichText field={title} />
        </div>
        <div className="w-full text-xl text-center">
          <PrismicRichText field={subtitle} />
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
          {logos.map((logo, index) => (
            <div key={index} className="w-36">
              <PrismicNextImage field={logo.logo} alt="" />
              {/* <img
              src={logo.url}
              alt={logo.alt || `Logo ${index + 1}`}
              className="w-full h-full object-contain"
            /> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Distribuidores;
