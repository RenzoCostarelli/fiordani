import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ContactForm from "@/components/ContactForm";

/**
 * Props for `Contacto`.
 */
export type ContactoProps = SliceComponentProps<Content.ContactoSlice>;

/**
 * Component for "Contacto" Slices.
 */
const Contacto: FC<ContactoProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#a8b3ab] py-16"
    >
      <div className="md:px-0 px-4 md:grid grid-cols-1 md:grid-cols-12 mx-auto gap-6 overflow-hidden">
        <div className="col-start-2 2xl:col-start-4 col-span-2 text-[#49614e] flex-1 w-max mb-8 md:mb-0">
          <h2 className="text-5xl font-serif mb-8">Contacto</h2>
          <div className="uppercase">
            <ul>
              <li>Calle 11 Nº 598. (2639)</li>
              <li>Gödeken (Santa Fe) - Argentina</li>
              <li>Tel. Of. : (03465) 498120 / 159 / 346</li>
              <li>Tel. Acopio : (03465) 498121</li>
            </ul>
          </div>
        </div>
        <div className="flex gap-4 md:col-start-5 2xl:col-start-6 2xl:col-end-10 col-end-12">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contacto;
