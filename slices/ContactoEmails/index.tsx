import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ContactConsultas from "@/components/ContactConsultas";

/**
 * Props for `ContactoEmails`.
 */
export type ContactoEmailsProps =
  SliceComponentProps<Content.ContactoEmailsSlice>;

/**
 * Component for "ContactoEmails" Slices.
 */
const ContactoEmails: FC<ContactoEmailsProps> = ({ slice }) => {
  return <ContactConsultas emails={slice.primary.email} />;
};

export default ContactoEmails;
