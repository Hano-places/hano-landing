import type { Metadata } from "next";
import { CityHubContent } from "@/components/seo/city-hub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/musanze",
  title: "Places to Visit in Musanze, Rwanda",
  description:
    "Discover restaurants, cafés, and hospitality in Musanze, Rwanda. Hano is expanding coverage beyond Kigali — explore and list your business.",
});

export default function MusanzePage() {
  return (
    <CityHubContent
      cityName="Musanze"
      cityPath="/musanze"
      description="Gateway to Volcanoes National Park, Musanze is growing as a hospitality hub for travelers and locals. Hano is expanding listings here — start with Rwanda-wide categories or list your business."
      places={[]}
    />
  );
}
