import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container" id="about">
      <div className="about-content">
        {/* Left Side */}
        <div className="about-text">
          <h2>About me🌸</h2>
          <p>
            I have a strong enthusiasm for the Information Technology department
            and entrepreneurship. I am deeply interested in learning about
            computers, software, and modern technologies, and I enjoy developing
            technical skills such as programming and problem-solving. At the
            same time, I am passionate about entrepreneurship, as it allows me
            to turn innovative ideas into real-world solutions and potentially
            build my own business. Combining my interest in IT with an
            entrepreneurial mindset motivates me to create impactful projects,
            explore new opportunities, and contribute to technological
            advancements.
          </p>

          <div className="about-actions">
            <a
              href="/resume.pdf"
              className="btn btn-yellow"
              download={"/SuryaPrabha2026resume.pdf"}
            >
              Download Resume
            </a>
            <div className="social-icons">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="mailto:yourmail@example.com">
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side */}
        {/* <div className="about-image">
          <div className="circle-bg"></div>
          <img src="/image2.png" alt="Profile" />
        </div> */}
      </div>
    </div>
  );
};

export default About;
