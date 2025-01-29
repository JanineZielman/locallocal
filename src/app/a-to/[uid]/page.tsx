import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import Nav from "@/components/Nav";

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
  const page = await client.getByUID("a_to_page", uid).catch(() => notFound());

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
  const page = await client.getByUID("a_to_page", uid).catch(() => notFound());
  const home = await client.getByUID("a_to_page", 'a-to').catch(() => notFound());


  return (
    <div className="a-to">
      <Nav home={home}/>
      <div className="image-text">
        <PrismicNextImage field={page.data.image} />
        <div className="text">
          <PrismicRichText field={page.data.description} />
          <div className="button"><a href={prismic.asLink(page.data.link) || "#"}>Download</a></div>
        </div>
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
  const pages = await client.getAllByType("a_to_page", {
    predicates: [prismic.filter.not("my.a_to_page.uid", "a-to")],
  });

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
