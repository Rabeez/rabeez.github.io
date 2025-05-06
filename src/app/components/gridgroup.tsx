"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gridItems } from "@/app/components/content";

export default function ExpandingGrid() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const handleClick = (index: number) => {
    // Disable click on "expanded" button
    if (expandedIndex !== index) {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="relative h-full w-full">
      {/* Overlay for expanded item */}
      <AnimatePresence>
        {expandedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid_backdrop_custom fixed top-0 left-0 z-40 h-full w-full bg-base-100/70"
            onClick={() => setExpandedIndex(null)}
          />
        )}
      </AnimatePresence>

      {/* Grid of buttons, each button will 'expand/shrink' on interaction, button text becomes header */}
      <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-4">
        {gridItems.map((item, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <div key={index} className="static">
              <motion.div
                layout
                onClick={() => handleClick(index)}
                className={
                  (isExpanded
                    ? `absolute bg-base-200 h-full w-full top-0 left-0 z-50 p-4 pt-15 pl-10 text-base-content prose-lg place-content-start`
                    : `grid_btn_custom hover:bg-neutral-700/20 bg-neutral-700/10 text-center font-bold place-content-center`) +
                  " h-full w-full overflow-hidden p-6 transition-colors rounded-4xl border-1 border-neutral-700/50"
                }
                animate={{
                  borderRadius: isExpanded ? 32 : 32,
                }}
                transition={{
                  layout: { type: "spring", bounce: 0.2, duration: 0.6 },
                }}
              >
                <motion.h2
                  layout="position"
                  className={
                    (isExpanded ? `mb-4 font-bold prose-headings` : `text-lg`) +
                    " text-2xl"
                  }
                >
                  {item.title}
                </motion.h2>

                {isExpanded && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-2"
                    >
                      {item.content}
                    </motion.div>

                    {/* <motion.button */}
                    {/*   initial={{ opacity: 0 }} */}
                    {/*   animate={{ opacity: 1 }} */}
                    {/*   transition={{ delay: 0.4 }} */}
                    {/*   className="absolute right-6 bottom-6 rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600" */}
                    {/*   onClick={(e) => { */}
                    {/*     e.stopPropagation(); */}
                    {/*     setExpandedIndex(null); */}
                    {/*   }} */}
                    {/* > */}
                    {/*   Close */}
                    {/* </motion.button> */}
                  </>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
