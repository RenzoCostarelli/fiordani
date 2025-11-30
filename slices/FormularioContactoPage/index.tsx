import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ContactInfo from "@/components/ContactInfo";

/**
 * Props for `FormularioContactoPage`.
 */
export type FormularioContactoPageProps =
  SliceComponentProps<Content.FormularioContactoPageSlice>;

/**
 * Component for "FormularioContactoPage" Slices.
 */
const FormularioContactoPage: FC<FormularioContactoPageProps> = ({ slice }) => {
  return <ContactInfo />;
};

export default FormularioContactoPage;
