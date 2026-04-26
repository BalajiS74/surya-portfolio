// components/Blog.js - With Very Slow One-by-One Scroll Reveal Animations
import React, { useState, useEffect, useRef } from "react";
import "./Blog.css";

const Blog = () => {
  const [filter, setFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Digital Transformation in 2024",
      excerpt:
        "Exploring emerging trends in AI, cloud computing, and how businesses can adapt to stay competitive in the digital age.",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "leadership",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      author: "Surya Prabha",
      authorRole: "CEO & Founder",
      featured: true,
    },
    {
      id: 2,
      title: "Building a Culture of Innovation",
      excerpt:
        "How to foster creativity and innovation within your organization while maintaining operational excellence.",
      date: "February 28, 2024",
      readTime: "6 min read",
      category: "culture",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      author: "Surya Prabha",
      authorRole: "CEO & Founder",
      featured: false,
    },
    {
      id: 3,
      title: "Lessons from Scaling a Startup to Success",
      excerpt:
        "Key insights and lessons learned from growing a venture from idea to market leader in 3 years.",
      date: "February 10, 2024",
      readTime: "10 min read",
      category: "entrepreneurship",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      author: "Surya Prabha",
      authorRole: "CEO & Founder",
      featured: false,
    },
    {
      id: 4,
      title: "Why UX Matters in Enterprise Software",
      excerpt:
        "Understanding the critical role of user experience in enterprise solutions and ROI impact.",
      date: "January 25, 2024",
      readTime: "5 min read",
      category: "design",
      image:
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800",
      author: "Surya Prabha",
      authorRole: "CEO & Founder",
      featured: false,
    },
    {
      id: 5,
      title: "Navigating Economic Uncertainty as a Leader",
      excerpt:
        "Strategic approaches to leading your company through challenging economic times.",
      date: "January 12, 2024",
      readTime: "7 min read",
      category: "leadership",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
      author: "Surya Prabha",
      authorRole: "CEO & Founder",
      featured: false,
    },
    {
      id: 6,
      title: "The Power of Mentorship in Tech",
      excerpt:
        "How mentorship shaped my career and why giving back matters for industry growth.",
      date: "December 20, 2023",
      readTime: "6 min read",
      category: "career",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
      author: "Surya Prabha",
      authorRole: "CEO & Founder",
      featured: false,
    },
  ];

  const categories = [
    { value: "all", label: "All Posts" },
    { value: "leadership", label: "Leadership" },
    { value: "entrepreneurship", label: "Entrepreneurship" },
    { value: "culture", label: "Culture" },
    { value: "design", label: "Design" },
    { value: "career", label: "Career" },
  ];

  const filteredPosts =
    filter === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === filter);

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            // Animate header
            const header = document.querySelector(".blog-header");
            if (header) header.classList.add("animate");

            // Animate filter buttons one by one
            const filterBtns = document.querySelectorAll(".filter-btn");
            filterBtns.forEach((btn, idx) => {
              setTimeout(() => {
                btn.classList.add("animate");
              }, idx * 100);
            });

            // Animate featured post
            const featured = document.querySelector(".featured-post");
            if (featured) featured.classList.add("animate");

            // Animate blog cards one by one (very slow)
            const cards = document.querySelectorAll(".blog-card");
            cards.forEach((card, idx) => {
              setTimeout(() => {
                card.classList.add("animate");
              }, idx * 250); // 250ms delay between each card for slow reveal
            });

            // Animate newsletter section
            const newsletter = document.querySelector(".newsletter-section");
            if (newsletter) newsletter.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.1,
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

  // Re-run animation when filter changes
  useEffect(() => {
    if (isVisible) {
      // Reset and re-animate cards when filter changes
      const cards = document.querySelectorAll(".blog-card");
      cards.forEach((card) => {
        card.classList.remove("animate");
      });

      setTimeout(() => {
        cards.forEach((card, idx) => {
          setTimeout(() => {
            card.classList.add("animate");
          }, idx * 250);
        });
      }, 100);
    }
  }, [filter, isVisible]);

  return (
    <section className="blog-section" id="blog" ref={sectionRef}>
      <div className="blog-container">
        {/* Header */}
        <div className="blog-header">
          <h2 className="blog-title">Insights & Articles</h2>
          <div className="blog-underline"></div>
          <p className="blog-description">
            Sharing perspectives on leadership, innovation, and the future of
            technology
          </p>
        </div>

        {/* Category Filter */}
        <div className="blog-filters">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`filter-btn ${filter === cat.value ? "active" : ""}`}
              onClick={() => setFilter(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filter === "all" && (
          <div className="featured-post">
            <div className="featured-image">
              <img src={featuredPost?.image} alt={featuredPost?.title} />
              <span className="featured-badge">Featured</span>
            </div>
            <div className="featured-content">
              <div className="post-meta">
                <span className="post-date">{featuredPost?.date}</span>
                <span className="post-readtime">{featuredPost?.readTime}</span>
              </div>
              <h3 className="featured-title">{featuredPost?.title}</h3>
              <p className="featured-excerpt">{featuredPost?.excerpt}</p>
              <div className="post-author">
                <div className="author-avatar">
                  <span>SP</span>
                </div>
                <div className="author-info">
                  <span className="author-name">{featuredPost?.author}</span>
                  <span className="author-role">
                    {featuredPost?.authorRole}
                  </span>
                </div>
              </div>
              <button className="read-more-btn">
                Read Article
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="blog-grid">
          {regularPosts.map((post, index) => (
            <article key={post.id} className="blog-card">
              <div className="card-image">
                <img src={post.image} alt={post.title} loading="lazy" />
                <div className="category-tag">{post.category}</div>
              </div>
              <div className="card-content">
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  <span className="post-readtime">{post.readTime}</span>
                </div>
                <h3 className="card-title">{post.title}</h3>
                <p className="card-excerpt">{post.excerpt}</p>
                <div className="card-footer">
                  <div className="post-author-small">
                    <div className="author-avatar-small">
                      <span>SP</span>
                    </div>
                    <span className="author-name-small">{post.author}</span>
                  </div>
                  {/* <button className="read-link">
                    Read
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button> */}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-icon">📬</div>
            <h3 className="newsletter-title">Subscribe to My Newsletter</h3>
            <p className="newsletter-text">
              Get the latest insights on leadership, technology, and
              entrepreneurship delivered to your inbox.
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            <p className="newsletter-note">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
