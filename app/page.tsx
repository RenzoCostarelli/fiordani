import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";

export default async function Home() {
  const client = createClient();
  const page = await client.getByType("home");

  return (
    <div>
      <main className="overflow-hidden">
        <SliceZone
          slices={page.results[0].data.slices}
          components={components}
        />
      </main>
    </div>
  );
}
