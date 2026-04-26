// Updated Projects.js with slower scroll reveal animations
import React, { useEffect, useRef } from "react";
import "./Projects.css";

const ProjectCard = ({ title, description, image, link, index }) => {
  return (
    <div className="project-card">
      {/* Left Side Text */}
      <div className="project-text">
        <h3>{title}</h3>
        <p>{description}</p>
        {/* <a href={link} className="btnView">
          View Project
        </a> */}
      </div>

      {/* Right Side Image */}
      <div className="project-image">
        <img src={image} alt={title} loading="lazy" />
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  const projectList = [
    {
      title: "Virtual Pc Controller--By Using Python and OpenCV",
      description:
        "Developed a Touchless Virtual PC controller application to enhance user interface interactions and streamline computer operation.",
      image: "/project1.png",
      link: "#",
      tags: ["Figma", "UI/UX", "Prototyping"],
    },
    {
      title: "Geospatially Monitored Aid for Motorists",
      description:
        "Modern drivers navigating the open road often face sudden vehicle issues leaving them in need of immediate assistance while traveling.",
      image: "/project2.png",
      link: "#",
      tags: ["React", "Firebase", "Stripe"],
    },
    {
      title: "Fetched Career- By using Flutter",
      description:
        "Desgined and developed mobile application catering to the needs of government and private instituions for streamlined examination searching process.",
      image: "/project3.png",
      link: "#",
      tags: ["Next.js", "MongoDB", "Tailwind"],
    },
    {
      title: "Kids App For ADHC Students",
      description:
        "A Simple, interactive math app designed to support ADHC students with clear visuals, step by step learning, and personalised activities.",
      image: "/project4.png",
      link: "#",
      tags: ["Next.js", "MongoDB", "Tailwind"],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            const title = document.querySelector(".section-title");
            if (title) title.classList.add("animate");

            // Animate cards with slower stagger
            const cards = document.querySelectorAll(".project-card");
            cards.forEach((card, idx) => {
              setTimeout(() => {
                card.classList.add("animate");
              }, idx * 250); // Increased from 150ms to 250ms for slower reveal
            });
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <div className="projects-container" id="projects" ref={sectionRef}>
      <h2 className="section-title">Featured Projects ⚙️</h2>
      {projectList.map((proj, idx) => (
        <ProjectCard
          key={idx}
          index={idx}
          title={proj.title}
          description={proj.description}
          image={proj.image}
          link={proj.link}
        />
      ))}
    </div>
  );
};

export default Projects;
