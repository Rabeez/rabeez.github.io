"use client";

import NavBar from "./components/navbar";
import make_modal from "./registry";

export default function Home() {
  return (
    <>
      <NavBar />
      <div
        id="content"
        className="grid h-[95%] w-full min-w-full grid-cols-5 gap-0"
      >
        <div className="col-span-2 block h-full w-full motion-preset-focus place-content-center pl-8 motion-duration-1000">
          <article className="prose prose-lg">
            <p>
              I am a Data Scientist with {new Date().getFullYear() - 2018} years
              of experience and multiple projects under my belt covering
              industry domains from telecom and banking to public sector
              administration.
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
              in-house analytical tools ranging from python libraries for
              machine learning and purpose-built web scrapping data stores to
              standalone analytical dashboards using open-source tools.
            </p>
            <div tabIndex={0} className="collapse bg-base-100">
              <div className="collapse-title font-semibold">Tools</div>
              <div className="collapse-content text-sm">
                <p>
                  <span className="font-bold">Analytics:</span> pandas, NumPy,
                  Polars, scikit-learn, XGBoost, TensorFlow, PyTorch, dplyr,
                  Pdyr, Pdymodels, NLTK, spaCy, OpenCV, GeoPandas, PyMC3,
                  Jupyter, Kedro, PySpark, NetworkX, PuLP
                </p>
                <p>
                  <span className="font-bold">Visualization:</span>
                  Matplotlib, Seaborn, Plotly, Dash, Altair, Streamlit, ggplot2,
                  Vega, Tableau, nxviz
                </p>

                <p>
                  <span className="font-bold">Languages:</span> Python, R, SQL,
                  Go, JavaScript
                </p>
                <p>
                  <span className="font-bold">Web Development:</span> Flask,
                  FastAPI, HTMX, Node.js, Jinja, Templ, Tailwind CSS
                </p>
                <p>
                  <span className="font-bold">Developer Tools:</span> Git,
                  Linux, Docker, CI/CD, Automated TesPng, Makefiles, Selenium
                </p>
              </div>
            </div>
          </article>
        </div>
        <div className="col-span-3 block h-full w-full">
          <div className="col-span-1 grid h-full w-full grid-cols-3">
            <div className="col-span-1 grid h-full grid-rows-3 place-items-center p-10">
              {make_modal("alpha")}
              {make_modal("beta")}
              {make_modal("beta")}
            </div>
            <div className="col-span-1 grid grid-rows-4 place-items-center p-10">
              {make_modal("alpha")}
              {make_modal("beta")}
              {make_modal("beta")}
              {make_modal("beta")}
            </div>
            <div className="col-span-1 grid grid-rows-3 place-items-center p-10">
              {make_modal("alpha")}
              {make_modal("beta")}
              {make_modal("beta")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
