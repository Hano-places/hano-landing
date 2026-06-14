import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { GuidePageContent } from "@/components/seo/guide-page";
import { guides, getGuideBySlug } from "@/content/guides";
import { site } from "@/content/landing";
import { buildArticleSchema, buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return {};
  }

  return buildPageMetadata({
    path: `/guides/${guide.slug}`,
    title: guide.title,
    description: guide.description,
    ogType: "article",
  });
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    notFound();
  }

  return (
    <SeoPageShell backHref="/kigali" backLabel="← Explore Kigali">
      <JsonLd
        data={buildArticleSchema({
          title: guide.title,
          description: guide.description,
          path: `/guides/${guide.slug}`,
          datePublished: guide.datePublished,
          author: site.name,
        })}
      />
      <GuidePageContent guide={guide} />
    </SeoPageShell>
  );
}
