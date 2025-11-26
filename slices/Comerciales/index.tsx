import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Comerciales`.
 */
export type ComercialesProps = SliceComponentProps<Content.ComercialesSlice>;

/**
 * Component for "Comerciales" Slices.
 */
const Comerciales: FC<ComercialesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#a8b3ab] py-16"
    >
      <div className="grid grid-cols-12 mx-auto gap-6 overflow-hidden">
        <div className="col-start-2 2xl:col-start-4 col-span-2  text-[#49614e] flex-1 w-max">
          <h2 className="text-5xl font-serif mb-8">Zona Comercial</h2>
          <p className="uppercase text-2xl">
            Cerca tuyo, <br />
            Estés donde estés
          </p>
        </div>
        <div className="flex gap-4 col-start-5 2xl:col-start-6">
          <div className="h-[400px] aspect-square bg-[#49614e] rounded-2xl"></div>
          <div className="h-[400px] aspect-square bg-[#49614e] rounded-2xl"></div>
          <div className="h-[400px] aspect-square bg-[#49614e] rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Comerciales;
