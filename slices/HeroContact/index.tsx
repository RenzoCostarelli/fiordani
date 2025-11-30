import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ContactHero from "@/components/ContactHero";

/**
 * Props for `HeroContact`.
 */
export type HeroContactProps = SliceComponentProps<Content.HeroContactSlice>;

/**
 * Component for "HeroContact" Slices.
 */
const HeroContact: FC<HeroContactProps> = ({ slice }) => {
  return <ContactHero image={slice.primary.image} />;
};

export default HeroContact;
