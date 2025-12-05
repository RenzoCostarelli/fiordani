import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Productos`.
 */
export type ProductosProps = SliceComponentProps<Content.ProductosSlice>;

/**
 * Component for "Productos" Slices.
 */
const Productos: FC<ProductosProps> = ({ slice }) => {
  const bgImage = slice.primary.image;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative mb-12"
      id="productos"
    >
      <div className="absolute w-full h-full inset-0">
        {bgImage && (
          <PrismicNextImage
            field={bgImage}
            className="w-full h-full object-cover"
            alt=""
          />
        )}
      </div>
      <div className="absolute w-full h-full inset-0 bg-linear-to-r from-black via-transparent to-transparent to-90% opacity-50"></div>
      <div className="container mx-auto relative h-full place-content-center py-16 md:px-0 px-6">
        <div className="text-white">
          <div className="text-xl mb-4 text-balance">
            <PrismicRichText field={slice.primary.title} />
          </div>
          <PrismicRichText field={slice.primary.text} />
        </div>
      </div>
    </section>
  );
};

export default Productos;
