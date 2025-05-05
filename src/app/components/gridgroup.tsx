"use client";

import { JSX, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function ExpandingGrid() {
  // Sample content for each grid item
  type GridItemType = {
    title: JSX.Element;
    content: JSX.Element;
  };
  const gridItems: GridItemType[] = [
    {
      title: <div>Item 1</div>,
      content: (
        <div>
          This is the expanded content for item 1. Click anywhere to collapse.
        </div>
      ),
    },
    {
      title: <div>Item 2</div>,
      content: (
        <div>
          This is the expanded content for item 2. Click anywhere to collapse.
        </div>
      ),
    },
    {
      title: <div>Item 3</div>,
      content: (
        <div>
          This is the expanded content for item 3. Click anywhere to collapse.
        </div>
      ),
    },
    {
      title: <div>Item 4</div>,
      content: (
        <div>
          This is the expanded content for item 4. Click anywhere to collapse.
        </div>
      ),
    },
    {
      title: <div>Item 5</div>,
      content: (
        <div>
          This is the expanded content for item 5. Click anywhere to collapse.
        </div>
      ),
    },
    {
      title: <div>Item 6</div>,
      content: (
        <div>
          This is the expanded content for item 6. Click anywhere to collapse.
        </div>
      ),
    },
    {
      title: <div>Item 7</div>,
      content: (
        <div>
          This is the expanded content for item 7. Click anywhere to collapse.
        </div>
      ),
    },
    {
      title: <div>Item 8</div>,
      content: (
        <div>
          This is the expanded content for item 8. Click anywhere to collapse.
        </div>
      ),
    },
    {
      title: <div>Item 9</div>,
      content: (
        <div>
          This is the expanded content for item 9. Click anywhere to collapse.
        </div>
      ),
    },
  ];

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
            className="fixed top-0 left-0 z-40 h-full w-full bg-base-100/70"
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
                  isExpanded
                    ? `absolute bg-base-200 h-full w-full top-0 left-0 z-50 p-4 text-base-content`
                    : ` hover:bg-neutral-700/20 text-center grid_btn_custom` +
                      " h-full w-full place-content-center overflow-hidden bg-neutral-700/10 p-6 transition-colors rounded-4xl border-1 border-neutral-700/50"
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
                  className={`${isExpanded ? "mb-4 font-bold" : "text-lg"} text-2xl`}
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
