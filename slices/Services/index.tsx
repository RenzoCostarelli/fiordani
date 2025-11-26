import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

/**
 * Component for "Services" Slices.
 */
const Services: FC<ServicesProps> = ({ slice }) => {
  const services = slice.primary.services;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-svh"
    >
      <div className="max-w-[1200px] mx-auto relative py-16">
        {services?.map((service, index) => (
          <div
            key={index}
            className={`p-6 mb-4 h-[300px] text-white rounded-2xl absolute`}
            style={{
              backgroundColor: service.bg_color || undefined,
              top: `${index * 63}px`,
            }}
          >
            <h3 className="text-2xl font-bold font-serif" data-cart-title>
              {service.title}
            </h3>
            <div className="text-xl">
              <PrismicRichText field={service.text} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
