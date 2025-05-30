"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { mainContent } from "@/app/components/content";

export default function SmoothTabs() {
  const contentKeys = Object.keys(mainContent) as (keyof typeof mainContent)[];
  const [activeTab, setActiveTab] = useState<keyof typeof mainContent>("Bio");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => {
    const currentTab = tabRefs.current[activeTab];
    if (currentTab) {
      const { offsetLeft, offsetWidth } = currentTab;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="h-full w-full place-content-start">
      <div className="relative flex w-full space-x-4 py-2">
        {contentKeys.map((tab_name) => {
          return (
            <button
              key={tab_name}
              ref={(el) => {
                tabRefs.current[tab_name] = el;
              }}
              onClick={() => setActiveTab(tab_name)}
              className={
                (activeTab ? `font-semibold` : ``) +
                " relative z-10 px-4 py-2 rounded-md transition-colors text-primary"
              }
            >
              {tab_name}
              {activeTab === tab_name && (
                <motion.div
                  layoutId="underline"
                  className="absolute inset-0 z-[-1] rounded-md"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
        <motion.div
          className="absolute bottom-2 h-1 rounded bg-primary"
          layout
          initial={false}
          animate={indicatorStyle}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      <div className="w-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "Bio" ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === "Bio" ? -30 : 30 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 20,
            }}
            className="relative top-0 left-0 h-fit min-h-fit w-full p-2"
          >
            {mainContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
