import React from "react";
import Front from "../components/homepage/Front";
import About from "../components/homepage/About";
import Projects from "../components/homepage/Projects";
import Skills from "../components/homepage/Skills";
import ExperienceEducation from "../components/homepage/ExperienceEducation";
import Entrepreneurship from "../components/homepage/Entrepreneurship";
import Contact from "../components/homepage/Contact";
const Home = () => {
  return (
    <div>
      <Front />
      <About />
      <ExperienceEducation />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};
export default Home;
