import type { Metadata } from "next";
import { CityHubContent } from "@/components/seo/city-hub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/rubavu",
  title: "Places to Visit in Rubavu, Rwanda",
  description:
    "Discover restaurants, cafés, and lakeside hospitality in Rubavu (Gisenyi), Rwanda. Explore with Hano as we expand beyond Kigali.",
});

export default function RubavuPage() {
  return (
    <CityHubContent
      cityName="Rubavu"
      cityPath="/rubavu"
      description="On the shores of Lake Kivu, Rubavu offers lakeside dining, cafés, and nightlife. Hano is building coverage for Rubavu hospitality — browse Rwanda categories or claim your listing."
      places={[]}
    />
  );
}
