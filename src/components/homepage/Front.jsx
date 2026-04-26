import React from "react";
import "./Front.css";

const Front = () => {
  return (
    <div className="front-container" id="home">
      {/* Navigation */}

      {/* Hero Section */}
      <div className="hero">
        {/* Left Text */}
        <div className="hero-text">
          <h5 className="role">JAVA FULL STACK DEVELOPER</h5>
          <h1>Hello, I’m Surya Prabha</h1>
          <p>
            To work in organization where culture of freedom and working for
            initiatives is ensured, facilitating my contribution through
            thoughts and action to the company’s vision and the achieve
            self-development by playing a significant role in building the
            organization.
          </p>
          <div className="buttons">
            <a href="#contact" className="btn btn-green">
              Contact
            </a>
            <a
              href="https://www.linkedin.com/in/surya-prabha-s-2696b2260/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-image">
          <div className="yellow-shape"></div>
          <img src="/myprofile.png" alt="Surya Prabha" />
        </div>
      </div>
    </div>
  );
};

export default Front;
