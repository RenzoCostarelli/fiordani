import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";

export default async function ContactPage() {
  const client = createClient();
  const page = await client.getByType("contacto");
  return (
    <div>
      <SliceZone slices={page.results[0].data.slices} components={components} />
    </div>
  );
}
