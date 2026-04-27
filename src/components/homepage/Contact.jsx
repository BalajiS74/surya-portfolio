// pages/Contact.js
import React, { useState } from "react";
import "./Contact.css";
import { createPortfolio } from "../../api/portfolioApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the real API
      await createPortfolio({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "General Enquiry",
        message: formData.message,
      });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
      console.log("Form submitted successfully:", formData);
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      details: "surya.prabha@ceoventures.com",
      link: "mailto:surya.prabha@ceoventures.com",
      note: "Response within 24 hours",
    },
    {
      icon: "📱",
      title: "Phone",
      details: "+91 98765 43210",
      link: "tel:+919876543210",
      note: "Mon-Fri, 9AM - 6PM IST",
    },
    {
      icon: "📍",
      title: "Office",
      details: "Bengaluru, India",
      link: null,
      note: "Available for meetings",
    },
    {
      icon: "💬",
      title: "LinkedIn",
      details: "/in/suryaprabha",
      link: "https://linkedin.com/in/suryaprabha",
      note: "Connect professionally",
    },
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">Let's Connect📞</h1>
          <div className="contact-underline"></div>
          <p className="contact-description">
            Whether you're interested in collaboration, investment
            opportunities, or just want to say hello — I'd love to hear from
            you.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="contact-grid">
          {/* Left Column - Contact Info */}

          {/* Right Column - Contact Form */}
          <div className="contact-form-side">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Business inquiry / Collaboration / Speaking engagement"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Please share details about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-loader"></span>
                ) : (
                  <>
                    Send Message
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="success-message">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Office Hours Section */}
        <div className="office-hours">
          <div className="hours-card">
            <div className="hours-icon">⏰</div>
            <div className="hours-content">
              <h4>Office Hours</h4>
              <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
              <p>Saturday - Sunday: By appointment only</p>
            </div>
          </div>
          <div className="response-card">
            <div className="response-icon">⚡</div>
            <div className="response-content">
              <h4>Response Time</h4>
              <p>Emails typically replied within 24 hours</p>
              <p>Urgent matters: +91 63693 47439</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
