"use client";

import MobileHeader from "@/app/components/mobile_header";
import ThemeController from "@/app/components/theme_controller";

export default function MobileComponent() {
  return (
    <div className="p-6">
      <div>
        <ThemeController />
        <MobileHeader />
      </div>
      <div className="absolute top-40">
        <article className="prose prose-sm lg:prose-lg">
          <h4 className="text-ctp-mauve-600 italic">
            Professionally stirring a pile of Linear Algebra and Statistics.
          </h4>
          <h6 className="italic">
            <a
              href="https://xkcd.com/1838"
              target="_blank"
              className="text-ctp-mauve-600 no-underline"
            >
              -- Obligatory XKCD
            </a>
          </h6>
          <p>
            I am a Data Scientist with {new Date().getFullYear() - 2018} years
            of experience and multiple projects under my belt covering industry
            domains from telecom and banking to public sector administration.
          </p>
          <p>
            Additionally, since a primary part of my role has been
            client-facing, I also have experience dealing with technical and
            non-technical stakeholders both for suggesting problems to
            investigate analytically and present insights to large groups.
          </p>
          <p>
            My focus areas over the years has been consumer analytics and
            data-driven application design. I have also developed multiple
            in-house analytical tools ranging from python libraries for machine
            learning and purpose-built web scrapping data stores to standalone
            analytical dashboards using open-source tools.
          </p>
          <div tabIndex={0} className="collapse">
            <div className="collapse-title font-semibold text-ctp-mauve-600">
              Tools
            </div>
            <div className="collapse-content text-sm">
              <p>
                <span className="font-bold text-ctp-mauve-600">Analytics:</span>{" "}
                pandas, NumPy, Polars, scikit-learn, XGBoost, TensorFlow,
                PyTorch, dplyr, Pdyr, Pdymodels, NLTK, spaCy, OpenCV, GeoPandas,
                PyMC3, Jupyter, Kedro, PySpark, NetworkX, PuLP
              </p>
              <p>
                <span className="font-bold text-ctp-mauve-600">
                  Visualization:
                </span>
                Matplotlib, Seaborn, Plotly, Dash, Altair, Streamlit, ggplot2,
                Vega, Tableau, nxviz
              </p>

              <p>
                <span className="font-bold text-ctp-mauve-600">Languages:</span>{" "}
                Python, R, SQL, Go, JavaScript
              </p>
              <p>
                <span className="font-bold text-ctp-mauve-600">
                  Web Development:
                </span>{" "}
                Flask, FastAPI, HTMX, Node.js, Jinja, Templ, Tailwind CSS
              </p>
              <p>
                <span className="font-bold text-ctp-mauve-600">
                  Developer Tools:
                </span>{" "}
                Git, Linux, Docker, CI/CD, Automated TesPng, Makefiles, Selenium
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
