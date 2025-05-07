"use client";

import { gridItems } from "@/app/components/content";

export default function MobileAccordion() {
  return (
    <div>
      {gridItems.map((item) => (
        <div className="collapse-arrow collapse border border-base-300 bg-base-100">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">{item.title}</div>
          <div className="collapse-content text-sm">{item.content}</div>
        </div>
      ))}
    </div>
  );
}
