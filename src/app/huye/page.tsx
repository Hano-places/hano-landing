import type { Metadata } from "next";
import { CityHubContent } from "@/components/seo/city-hub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/huye",
  title: "Places to Visit in Huye, Rwanda",
  description:
    "Discover restaurants, cafés, and places to visit in Huye, Rwanda. Hano is expanding hospitality discovery beyond Kigali.",
});

export default function HuyePage() {
  return (
    <CityHubContent
      cityName="Huye"
      cityPath="/huye"
      description="Home to a vibrant university town and southern Rwanda culture, Huye has a growing food scene. Hano is expanding listings here — explore Rwanda-wide discovery or list your business."
      places={[]}
    />
  );
}
