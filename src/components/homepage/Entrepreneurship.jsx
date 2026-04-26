// Entrepreneurship.js
import React, { useEffect, useRef, useState } from "react";
import "./Entrepreneurship.css";

const Entrepreneurship = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  const companyData = {
    name: "Surya Prabha Ventures",
    founded: "2021",
    location: "India",
    tagline: "Building innovative solutions for tomorrow",
    description:
      "A technology venture focused on creating impactful digital products and solutions that solve real-world problems.",
    mission:
      "To empower businesses by delivering cutting-edge IT solutions while nurturing talent through career-focused training, real-world project experience, and continuous learning — bridging the gap between innovation and employability.",
    vision:
      "To build a dynamic IT ecosystem where innovative startups thrive and aspiring professionals grow into skilled technology leaders, driving digital transformation globally.",
    services: [
      "UI/UX Design & Strategy",
      "Web & Mobile Development",
      "Cloud Solutions",
      "Digital Transformation Consulting",
    ],
    achievements: [
      "Served 50+ clients worldwide",
      "Successfully delivered 100+ projects",
      "Team of 20+ experts",
      "98% client satisfaction rate",
    ],
  };

  const stats = [
    { value: 50, label: "Clients", suffix: "+" },
    { value: 100, label: "Projects", suffix: "+" },
    { value: 20, label: "Team Members", suffix: "" },
    { value: 98, label: "Satisfaction", suffix: "%" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="entrepreneurship-section" ref={sectionRef}>
      <div className="entrepreneurship-container">
        {/* Header with animation */}
        <div
          className={`entrepreneurship-header ${isVisible ? "animate-header" : ""}`}
        >
          <span className="entrepreneurship-badge">CEO & Founder</span>
          <h2 className="entrepreneurship-title">My Venture👩‍💼</h2>
          <div className="entrepreneurship-underline"></div>
        </div>

        {/* Hero Company Card */}
        <div className={`company-hero ${isVisible ? "animate-company" : ""}`}>
          <div className="company-glow"></div>
          <div className="company-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M3 9L12 3L21 9L12 15L3 9Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 11V17C5 18.6569 8.13401 20 12 20C15.866 20 19 18.6569 19 17V11"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 15V20" strokeLinecap="round" />
              <path d="M8 11L8 16" strokeLinecap="round" />
              <path d="M16 11L16 16" strokeLinecap="round" />
            </svg>
          </div>
          <div className="company-name">{companyData.name}</div>
          <div className="company-meta">
            <span className="company-founded">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Founded {companyData.founded}
            </span>
            <span className="company-location">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" />
                <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" />
              </svg>
              {companyData.location}
            </span>
          </div>
          <div className="company-tagline">{companyData.tagline}</div>
          <p className="company-description">{companyData.description}</p>
        </div>

        {/* Stats Counter Section */}
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card ${isVisible ? "animate-stat" : ""}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="stat-number">
                <Counter
                  end={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision with Flip Animation */}
        <div className="mv-grid">
          <div className={`mv-card mission ${isVisible ? "animate-mv" : ""}`}>
            <div className="mv-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mv-title">Mission</h3>
            <p className="mv-text">{companyData.mission}</p>
          </div>
          <div className={`mv-card vision ${isVisible ? "animate-mv" : ""}`}>
            <div className="mv-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M2 12H22M12 2V22M12 2L8 6M12 2L16 6M12 22L8 18M12 22L16 18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <h3 className="mv-title">Vision</h3>
            <p className="mv-text">{companyData.vision}</p>
          </div>
        </div>

        {/* Services & Achievements with Stagger Animation */}
        <div className="services-achievements">
          <div
            className={`service-section ${isVisible ? "animate-service" : ""}`}
          >
            <div className="section-header">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fcd34d"
                strokeWidth="1.5"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" />
              </svg>
              <h3 className="section-subtitle">Services</h3>
            </div>
            <ul className="services-list">
              {companyData.services.map((service, index) => (
                <li key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                  <span className="list-marker"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`achievement-section ${isVisible ? "animate-achievement" : ""}`}
          >
            <div className="section-header">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fcd34d"
                strokeWidth="1.5"
              >
                <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" />
              </svg>
              <h3 className="section-subtitle">Key Achievements</h3>
            </div>
            <ul className="achievements-list">
              {companyData.achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="achievement-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="achievement-check">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Counter Component for Stats Animation
const Counter = ({ end, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [end, isVisible]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default Entrepreneurship;
