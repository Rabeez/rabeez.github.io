"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function SmoothTabs() {
  const tabs = ["Bio", "Tools"];
  const [activeTab, setActiveTab] = useState("Bio");
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
        {tabs.map((tab) => {
          let tabClass =
            "relative z-10 px-4 rounded-md transition-colors text-primary";
          if (activeTab === tab) {
            tabClass += " font-semibold";
          } else {
            tabClass += " ";
          }

          return (
            <button
              key={tab}
              ref={(el) => {
                tabRefs.current[tab] = el;
              }}
              onClick={() => setActiveTab(tab)}
              className={tabClass}
            >
              {tab}
              {activeTab === tab && (
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
      <div className="">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.1 }}
            className="absolute h-fit min-h-fit w-full p-2"
          >
            {activeTab === "Bio" ? (
              <>
                <p className="not-prose mt-[0px]">
                  I am a Data Scientist with {new Date().getFullYear() - 2018}{" "}
                  years of experience and multiple projects under my belt
                  covering industry domains from telecom and banking to public
                  sector administration.
                </p>
                <p>
                  Additionally, since a primary part of my role has been
                  client-facing, I also have experience dealing with technical
                  and non-technical stakeholders both for suggesting problems to
                  investigate analytically and present insights to large groups.
                </p>
                <p>
                  My focus areas over the years has been consumer analytics and
                  data-driven application design. I have also developed multiple
                  in-house analytical tools ranging from python libraries for
                  machine learning and purpose-built web scrapping data stores
                  to standalone analytical dashboards using open-source tools.
                </p>
              </>
            ) : (
              <>
                <p className="not-prose mt-[0px]">
                  <span className="font-bold text-custom-accent">
                    Analytics:
                  </span>
                  pandas, NumPy, Polars, scikit-learn, XGBoost, TensorFlow,
                  PyTorch, dplyr, Pdyr, Pdymodels, NLTK, spaCy, OpenCV,
                  GeoPandas, PyMC3, Jupyter, Kedro, PySpark, NetworkX, PuLP
                </p>
                <p>
                  <span className="font-bold text-custom-accent">
                    Visualization:
                  </span>
                  Matplotlib, Seaborn, Plotly, Dash, Altair, Streamlit, ggplot2,
                  Vega, Tableau, nxviz
                </p>

                <p>
                  <span className="font-bold text-custom-accent">
                    Languages:
                  </span>
                  Python, R, SQL, Go, JavaScript
                </p>
                <p>
                  <span className="font-bold text-custom-accent">
                    Web Development:
                  </span>
                  Flask, FastAPI, HTMX, Node.js, Jinja, Templ, Tailwind CSS
                </p>
                <p>
                  <span className="font-bold text-custom-accent">
                    Developer Tools:
                  </span>
                  Git, Linux, Docker, CI/CD, Automated TesPng, Makefiles,
                  Selenium
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
