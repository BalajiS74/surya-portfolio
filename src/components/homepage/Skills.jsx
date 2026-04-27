// components/Skills.js - Updated with scroll animations
import React, { useState, useEffect, useRef } from "react";
import "./Skills.css";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            // Add animate class to all elements
            const animatedElements = document.querySelectorAll(
              ".skills-header, .skills-nav-btn, .skill-item, .category-card",
            );
            animatedElements.forEach((el) => {
              el.classList.add("animate");
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
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

  const skillsData = {
    frontend: {
      name: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "ReactJS", "Google Sites"],
    },
    backend: {
      name: "Backend & Database",
      skills: ["Python", "Java", "Dart", "Django", "Flask", "MySQL"],
    },
    cloud: {
      name: "Cloud & Hosting",
      skills: ["AWS Cloud", "Google Console", "Zoho Catalyst Hosting"],
    },
    other: {
      name: "Other Expertise",
      skills: ["Figma", "Flutter", "PROJECT CNNA (Cisco)"],
    },
  };

  const allSkills = Object.values(skillsData).flatMap((cat) => cat.skills);

  const getCategorySkills = () => {
    if (activeCategory === "all") {
      return allSkills;
    }
    return skillsData[activeCategory]?.skills || [];
  };

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-container">
        {/* Header */}
        <div className={`skills-header ${isVisible ? "animate" : ""}`}>
          <h2 className="skills-heading">Technical Skills🪄</h2>
          <p className="skills-description">
            Technologies and tools I specialize in
          </p>
        </div>

        {/* Category Navigation */}

        {/* Skills Grid */}

        {/* Categories Grid */}
        <div className="categories-grid">
          {Object.entries(skillsData).map(([key, category]) => (
            <div
              key={key}
              className={`category-card ${isVisible ? "animate" : ""}`}
            >
              <h3 className="category-title">{category.name}</h3>
              <div className="category-skills">
                {category.skills.map((skill, idx) => (
                  <span key={idx} className="category-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
