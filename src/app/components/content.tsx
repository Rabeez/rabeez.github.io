import { JSX } from "react";

type Content = {
  Bio: JSX.Element;
  Tools: JSX.Element;
};
export const mainContent: Content = {
  Bio: (
    <>
      <p className="not-prose mt-[0px]">
        I am a Data Scientist with {new Date().getFullYear() - 2018} years of
        experience and multiple projects under my belt covering industry domains
        from telecom and banking to public sector administration.
      </p>
      <p>
        Additionally, since a primary part of my role has been client-facing, I
        also have experience dealing with technical and non-technical
        stakeholders both for suggesting problems to investigate analytically
        and present insights to large groups.
      </p>
      <p>
        My focus areas over the years has been consumer analytics and
        data-driven application design. I have also developed multiple in-house
        analytical tools ranging from python libraries for machine learning and
        purpose-built web scrapping data stores to standalone analytical
        dashboards using open-source tools.
      </p>
    </>
  ),
  Tools: (
    <>
      <p className="not-prose mt-[0px]">
        <span className="font-bold text-custom-accent">Analytics:</span>
        pandas, NumPy, Polars, scikit-learn, XGBoost, TensorFlow, PyTorch,
        dplyr, Pdyr, Pdymodels, NLTK, spaCy, OpenCV, GeoPandas, PyMC3, Jupyter,
        Kedro, PySpark, NetworkX, PuLP
      </p>
      <p>
        <span className="font-bold text-custom-accent">Visualization:</span>
        Matplotlib, Seaborn, Plotly, Dash, Altair, Streamlit, ggplot2, Vega,
        Tableau, nxviz
      </p>

      <p>
        <span className="font-bold text-custom-accent">Languages:</span>
        Python, R, SQL, Go, JavaScript
      </p>
      <p>
        <span className="font-bold text-custom-accent">Web Development:</span>
        Flask, FastAPI, HTMX, Node.js, Jinja, Templ, Tailwind CSS
      </p>
      <p>
        <span className="font-bold text-custom-accent">Developer Tools:</span>
        Git, Linux, Docker, CI/CD, Automated TesPng, Makefiles, Selenium
      </p>
    </>
  ),
};

type GridItem = {
  title: JSX.Element;
  content: JSX.Element;
};
export const gridItems: GridItem[] = [
  {
    title: <div>Machine Learning</div>,
    content: (
      <div>
        <p>Propesity Modeling</p>
        <p>Multi-label Classification</p>
        <p>Structural time series</p>
        <p>Automated rule extraction</p>
        <p>Gradient Boosting</p>
        <p>Feature importance - SHAP</p>
      </div>
    ),
  },
  {
    title: <div>Data Pipelines</div>,
    content: (
      <div>
        <p>Multi-modal input sources into single feature store</p>
        <p>Clickstream data-mart</p>
        <p>Domain-driven record linkage</p>
        <p>'Plug-and-play' BI pipeline</p>
      </div>
    ),
  },
  {
    title: <div>Engineering</div>,
    content: (
      <div>
        <p>Version Control</p>
        <p>System Architecture</p>
        <p>Structured Logging</p>
        <p>Package/library development</p>
        <p>Containers</p>
      </div>
    ),
  },
  {
    title: <div>Causal Inference</div>,
    content: (
      <div>
        <p>A/B Tests</p>
        <p>Monte-carlo simulations</p>
        <p>Uplift Modeling</p>
        <p>Impact quantification</p>
        <p>Multiple interventions</p>
      </div>
    ),
  },
  {
    title: <div>Data Visualization &amp; Reporting</div>,
    content: (
      <div>
        <p>Custom plotly/dash dashboards</p>
        <p>Custom python/javascript charts in PowerBI</p>
        <p>Automated PDF report generation</p>
        <p>Streamlit application for processing news sentiment</p>
        <p>Interactive RShiny applications</p>
      </div>
    ),
  },
  {
    title: <div>Custom Tooling</div>,
    content: (
      <div>
        <p>Web scraper for tourism data</p>
        <p>Powerpoint parser for data extraction</p>
        <p>YAML-based feature engineering DSL</p>
        <p>Custom, lightweight model orchestration</p>
      </div>
    ),
  },
  {
    title: <div>Domain-specific Modeling</div>,
    content: (
      <div>
        <p>Morphological image transformations to isolate features</p>
        <p>Text embeddings and LLMs</p>
        <p>Remote-sensing CNN model for land-use classification</p>
        <p>White space analysis</p>
      </div>
    ),
  },
  {
    title: <div>Communication &amp; Teaching</div>,
    content: (
      <div>
        <p>Software Engineering toolkit workshops (CLI, Git, Dev tools)</p>
        <p>
          Interactive Data Science teaching material (jupyter notebooks in
          guided sessions)
        </p>
        <p>Intro to DS/ML workshops for generalist consultants</p>
        <p>
          Executive-level reports covering ML model performance, AB test results
        </p>
        <p>
          Ran requirements-gathering workshops with operational domain experts
        </p>
      </div>
    ),
  },
  {
    title: <div>Web Development</div>,
    content: (
      <div>
        <p>Flask/FastAPI analytical APIs</p>
        <p>HTMX for simple standalone web application</p>
      </div>
    ),
  },
];
