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
