import { ImageResponse } from "next/og";
import { getPlaceBySlug } from "@/lib/places-data";
import { isCategorySegment } from "@/lib/places-slug";

export const runtime = "edge";
export const size = { width: 1200, height: 631 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { category, slug } = await params;

  if (!isCategorySegment(category)) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#0f3d2e",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            fontWeight: 700,
          }}
        >
          Hano
        </div>
      ),
      size,
    );
  }

  const place = await getPlaceBySlug(category, slug);

  if (!place) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#0f3d2e",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          Discover on Hano
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px",
          background: "linear-gradient(135deg, #0f3d2e 0%, #1a5c44 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.85 }}>{place.category}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            {place.name}
          </div>
          <div style={{ fontSize: 32, opacity: 0.9 }}>
            {place.location}, Kigali · {place.rating}★ · {place.priceRange}
          </div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 600 }}>hano.now</div>
      </div>
    ),
    size,
  );
}
