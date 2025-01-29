'use client'
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { useState } from "react";

export default function Nav({ home }) {
  const [isNavShown, setIsNavShown] = useState(false);
  
  return (
    <>
    <div className="nav">
      <Link href="/a-to"><h1>{home.data.title}</h1></Link>
      <div className="menu" onClick={() => setIsNavShown(!isNavShown)}>
        ...
      </div>
      <div className={`menu-wrapper ${isNavShown ? 'show' : ''}`}>
        <div className="info">
                We hosted a fun, informative and inspiring evening about all things related to life after graduation. Put together especially - by and for - alumni and students from ArtEZ Arnhem. Alumni from various courses have shared experiences and there were also be super-useful sessions on practicalities; from freelancing to citizen application to legal protection and more. Which you can all find back here.
          <br/><br/>

          Fragments for Future…<br/><br/>

          7 Alumni Speakers - from departments incl. Product, Dance, Fashion, Creative writing, DAT + GDA - shared their insights on their journeys post-ArtEZ; their practice, struggles, and wins.
          <br/><br/>

          Future Facts…<br/><br/>

          Here you can find all the info and knowledge you will ever need on setting up, KvK, budgeting, finances and visas applications.
          </div>
      </div>
    </div>
    <div className="description">
      <PrismicRichText field={home.data.description} />
    </div>
    </>
  );
}
