import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Servicios`.
 */
export type ServiciosProps = SliceComponentProps<Content.ServiciosSlice>;

/**
 * Component for "Servicios" Slices.
 */
const Servicios: FC<ServiciosProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pt-16 pb-8 bg-[#dcd9d2]"
    >
      <div className="container mx-auto">
        <div className="w-full bg-gray-200 rounded-xl place-content-center h-[350px] p-6 relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full [&>img]:object-cover [&>img]:w-full [&>img]:h-full [&>img]:inset-0">
            <PrismicNextImage field={slice.primary.image} alt="" />
          </div>
          <div className="text-3xl font-serif relative text-white">
            <PrismicRichText field={slice.primary.title} />
          </div>
          <div className="relative md:w-1/2">
            {slice.primary.service_list.map((service, index) => (
              <div key={index} className="text-white mt-4 relative">
                <div className="flex gap-2">
                  {service.title}
                  <div className="border px-2 rounded-full flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24.1 8.83"
                      className="w-7"
                    >
                      <g id="Capa_1" data-name="Capa 1">
                        <path
                          fill="#ffffff"
                          fillRule="evenodd"
                          d="M19.78,8.79l4.29-4.29s.04-.14,0-.18L19.78.03s-.13-.05-.18,0l-.54.58,3.35,3.35H.45c-.27,0-.45.22-.45.49,0,.22.18.45.45.45h21.92s-3.31,3.31-3.31,3.31l.54.58s.13.04.18,0h0Z"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="h-px w-full bg-white/70 relative mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Servicios;
