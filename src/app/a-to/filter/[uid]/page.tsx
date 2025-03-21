import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isFilled } from "@prismicio/client";

import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import Nav from "@/components/Nav";
import Link from "next/link";

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("a_to_filter", uid).catch(() => notFound());

  return {
    title: page.data.title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("a_to_filter", uid).catch(() => notFound());
  const home = await client.getByUID("a_to_page", 'a-to').catch(() => notFound());
  const filters = await client.getAllByType('a_to_filter');
  const items = await client.getAllByType("a_to_page", {
    predicates: [
      prismic.filter.not("my.a_to_page.uid", "a-to")],
  });

  return (
    <div className="a-to">
      <Nav home={page} filters={filters}/>
      <div className="filter-items">
        {items.filter((item) => isFilled.contentRelationship(item.data.filter) && item.data.filter.uid == page.uid).map((item, i) => {
          return(
            <Link key={`filter-item${i}`} className="filter-item" href={`/a-to/${item.uid}`}>
              <PrismicNextImage field={item.data.image} alt=""/>
            </Link>
          )
        })}
      </div>
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  )
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("a_to_filter");

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
