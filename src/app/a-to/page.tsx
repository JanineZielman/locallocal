import { Metadata } from "next";

import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Nav from "@/components/Nav";


// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("a_to_page", "a-to");

  return {
    title: home.data.title,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("a_to_page", "a-to");
  const filters = await client.getAllByType('a_to_filter');


  return (
    <div className="a-to">
      <Nav home={home} filters={filters}/>
      <SliceZone slices={home.data.slices} components={components} />
    </div>
  )
}
