// components/ExperienceEducation.js - Updated with scroll animations
import React, { useEffect, useRef, useState } from "react";
import "./ExperienceEducation.css";

const ExperienceEducation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            // Add animate class to all elements with scroll-reveal
            const animatedElements = document.querySelectorAll(
              ".exp-card, .edu-card, .column-title",
            );
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate");
              }, index * 50);
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

  const experienceData = [
    {
      id: 1,
      title: "Full stack java developer",
      company: "TCS Inc.",
      period: "2026 — Present",
      description:
        "Leading company strategy, business development, and digital transformation initiatives. Grew revenue by 150% in 3 years.",
    },
    {
      id: 2,
      title: "Software trainer developer",
      company: "Elysium Group of Companies",
      period: "2025-2026",
      description:
        "I am a Software Trainer and Developer with 4 months of experience, specializing in Full Stack Python, Manual Testing, AWS, and basic DevOps. In my second company, I have successfully trained over 50 students. Additionally, I work as a freelance developer, delivering academic projects for college students in areas such as AI/ML and Full Stack Development.",
    },
    {
      id: 3,
      title: "Python developer",
      company: "RORIRI It park",
      period: "2024 — 2025",
      description:
        "I am a Full Stack Python Developer and Software Trainer. I have completed two real-time projects as part of my work. This is my first job, which I got through an on-campus placement arranged by my college. It has been a great opportunity to enhance my career, and I have gained a lot of valuable experience from this role.",
    },
  ];

  const educationData = [
    {
      id: 1,
      degree: "ME(CSE)",
      field: "Computer Science",
      institution: "Anna University",
      period: "2024 - 2026",
    },
    {
      id: 2,
      degree: "Bachelor of Engineering",
      field: "Computer Science",
      institution: "Anna University",
      period: "2021 — 2024",
    },
    {
      id: 3,
      degree: "Diploma(CSE)",
      field: "Computer Science",
      institution: "DOTE University",
      period: "2018 - 2021",
    },
    {
      id: 4,
      degree: "SSLC",
      institution: "State Board Of TamilNadu",
      period: "2018 -2013",
    },
  ];

  return (
    <section className="exp-edu-section" id="experience" ref={sectionRef}>
      <div className="exp-edu-container">
        {/* Header */}
        <div className={`exp-edu-header ${isVisible ? "animate" : ""}`}>
          <h2 className="exp-edu-title">Experience & Education🎒</h2>
          <div className="exp-edu-underline"></div>
        </div>

        {/* Two Column Layout */}
        <div className="exp-edu-grid">
          {/* Experience Column */}
          <div className="exp-column">
            <h3 className={`column-title ${isVisible ? "animate" : ""}`}>
              Experience
            </h3>
            <div className="exp-list">
              {experienceData.map((exp) => (
                <div
                  key={exp.id}
                  className={`exp-card ${isVisible ? "animate" : ""}`}
                >
                  <div className="exp-period">{exp.period}</div>
                  <div className="exp-title">{exp.title}</div>
                  <div className="exp-company">{exp.company}</div>
                  <p className="exp-description">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="edu-column">
            <h3 className={`column-title ${isVisible ? "animate" : ""}`}>
              Education
            </h3>
            <div className="edu-list">
              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className={`edu-card ${isVisible ? "animate" : ""}`}
                >
                  <div className="edu-period">{edu.period}</div>
                  <div className="edu-degree">{edu.degree}</div>
                  <div className="edu-field">{edu.field}</div>
                  <div className="edu-institution">{edu.institution}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceEducation;
