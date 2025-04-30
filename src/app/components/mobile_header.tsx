"use client";

import MenuMobile from "@/app/components/menu_mobile";

export default function MobileHeader() {
  return (
    <>
      <article className="fixed top-0 left-0 z-20 prose prose-sm bg-base-100 p-6 lg:prose-lg">
        <h1 className="text-ctp-mauve-600">Rabeez Riaz</h1>
        <MenuMobile />
      </article>
    </>
  );
}
