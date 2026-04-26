// components/ContactDashboard.js
import React, { useState } from "react";
import "./ContactDashboard.css";

const ContactDashboard = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState("all");
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43210",
      subject: "Business Partnership Opportunity",
      message:
        "We are looking for a strategic partnership with your company. Would love to discuss potential collaboration opportunities in the AI space.",
      date: "2024-03-15",
      time: "10:30 AM",
      status: "pending",
      category: "business",
      priority: "high",
      company: "Tech Innovations Ltd",
      country: "India",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 87654 32109",
      subject: "Speaking Engagement Request",
      message:
        "We would like to invite you as a keynote speaker at our annual tech conference. Your insights on leadership would be valuable.",
      date: "2024-03-14",
      time: "02:15 PM",
      status: "read",
      category: "speaking",
      priority: "medium",
      company: "Tech Conference Org",
      country: "India",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      phone: "+65 9123 4567",
      subject: "Investment Inquiry",
      message:
        "Our venture capital firm is interested in learning more about your company's growth plans and potential investment opportunities.",
      date: "2024-03-13",
      time: "11:45 AM",
      status: "replied",
      category: "investment",
      priority: "high",
      company: "Golden Gate Ventures",
      country: "Singapore",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 415 555 1234",
      subject: "Media Interview Request",
      message:
        "We would love to feature you in our 'Leaders of Tomorrow' podcast series. The episode would focus on your entrepreneurial journey.",
      date: "2024-03-12",
      time: "09:00 AM",
      status: "pending",
      category: "media",
      priority: "medium",
      company: "Leaders Podcast",
      country: "USA",
    },
    {
      id: 5,
      name: "Amit Patel",
      email: "amit.patel@example.com",
      phone: "+91 99887 66554",
      subject: "Collaboration for Social Impact",
      message:
        "We are working on a social impact project and would love to collaborate with your organization to make a difference.",
      date: "2024-03-11",
      time: "03:30 PM",
      status: "read",
      category: "collaboration",
      priority: "low",
      company: "Social Impact Initiative",
      country: "India",
    },
    {
      id: 6,
      name: "Emma Watson",
      email: "emma.w@example.com",
      phone: "+44 7700 123456",
      subject: "Advisory Board Invitation",
      message:
        "We are forming an advisory board and would be honored if you would consider joining us.",
      date: "2024-03-10",
      time: "01:20 PM",
      status: "pending",
      category: "advisory",
      priority: "high",
      company: "Global Tech Council",
      country: "UK",
    },
  ]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const stats = {
    total: contacts.length,
    pending: contacts.filter((c) => c.status === "pending").length,
    replied: contacts.filter((c) => c.status === "replied").length,
    read: contacts.filter((c) => c.status === "read").length,
  };

  const categories = [
    { value: "all", label: "All", count: stats.total },
    { value: "pending", label: "Pending", count: stats.pending },
    { value: "replied", label: "Replied", count: stats.replied },
    { value: "read", label: "Read", count: stats.read },
  ];

  const filteredContacts =
    filter === "all"
      ? contacts
      : contacts.filter((contact) => contact.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "read":
        return "status-read";
      case "replied":
        return "status-replied";
      default:
        return "";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "";
    }
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    setShowDeleteConfirm(null);
    setSelectedContact(null);
  };

  const handleMarkAsRead = (id) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, status: "read" } : contact,
      ),
    );
  };

  return (
    <section className="dashboard-section">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h2 className="dashboard-title">Contact Dashboard</h2>
          <p className="dashboard-subtitle">
            View all messages from your visitors
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📬</div>
            <div className="stat-info">
              <h3 className="stat-number">{stats.total}</h3>
              <p className="stat-label">Total Messages</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3 className="stat-number">{stats.pending}</h3>
              <p className="stat-label">Unread</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📖</div>
            <div className="stat-info">
              <h3 className="stat-number">{stats.read}</h3>
              <p className="stat-label">Read</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3 className="stat-number">{stats.replied}</h3>
              <p className="stat-label">Replied</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`filter-tab ${filter === cat.value ? "active" : ""}`}
              onClick={() => setFilter(cat.value)}
            >
              {cat.label}
              <span className="tab-count">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Contact List Table */}
          <div className="contact-table-container">
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Info</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="contact-row">
                    <td className="contact-name-cell">
                      <div className="contact-avatar">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <div className="contact-name">{contact.name}</div>
                        <div className="contact-company">{contact.company}</div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info-cell">
                        <div className="contact-email">{contact.email}</div>
                        <div className="contact-phone">{contact.phone}</div>
                      </div>
                    </td>
                    <td className="contact-subject">{contact.subject}</td>
                    <td>
                      <div className="contact-date">{contact.date}</div>
                      <div className="contact-time">{contact.time}</div>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${getStatusColor(contact.status)}`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() => setSelectedContact(contact)}
                        >
                          View
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => setShowDeleteConfirm(contact.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredContacts.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>No messages found</h3>
                <p>All messages are cleared</p>
              </div>
            )}
          </div>

          {/* Recent Activity Sidebar */}
          <div className="recent-activity">
            <h3 className="activity-title">Recent Messages</h3>
            <div className="activity-list">
              {contacts.slice(0, 5).map((contact) => (
                <div
                  key={contact.id}
                  className={`activity-item ${contact.status === "pending" ? "unread" : ""}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p className="activity-text">
                      <strong>{contact.name}</strong>
                      {contact.status === "pending" && (
                        <span className="unread-badge">New</span>
                      )}
                    </p>
                    <p className="activity-subject">{contact.subject}</p>
                    <span className="activity-time">{contact.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for Viewing Contact Details */}
        {selectedContact && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedContact(null)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setSelectedContact(null)}
              >
                ×
              </button>
              <div className="modal-header">
                <div className="modal-avatar">
                  {selectedContact.name.charAt(0)}
                </div>
                <div className="modal-header-info">
                  <h3 className="modal-name">{selectedContact.name}</h3>
                  <p className="modal-company">{selectedContact.company}</p>
                </div>
                <button
                  className="modal-delete-btn"
                  onClick={() => {
                    setSelectedContact(null);
                    setShowDeleteConfirm(selectedContact.id);
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{selectedContact.email}</span>
                </div>
                <div className="modal-info-row">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{selectedContact.phone}</span>
                </div>
                <div className="modal-info-row">
                  <span className="info-label">Subject:</span>
                  <span className="info-value">{selectedContact.subject}</span>
                </div>
                <div className="modal-info-row">
                  <span className="info-label">Category:</span>
                  <span className="info-value">{selectedContact.category}</span>
                </div>
                <div className="modal-info-row">
                  <span className="info-label">Country:</span>
                  <span className="info-value">{selectedContact.country}</span>
                </div>
                <div className="modal-info-row">
                  <span className="info-label">Date:</span>
                  <span className="info-value">
                    {selectedContact.date} at {selectedContact.time}
                  </span>
                </div>
                <div className="modal-message">
                  <span className="info-label">Message:</span>
                  <p>{selectedContact.message}</p>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className="btn-mark-read"
                  onClick={() => {
                    handleMarkAsRead(selectedContact.id);
                    setSelectedContact({ ...selectedContact, status: "read" });
                  }}
                >
                  Mark as Read
                </button>
                <button
                  className="btn-close"
                  onClick={() => setSelectedContact(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div
            className="modal-overlay"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
              <div className="confirm-icon">⚠️</div>
              <h3 className="confirm-title">Delete Message</h3>
              <p className="confirm-message">
                Are you sure you want to delete this message? This action cannot
                be undone.
              </p>
              <div className="confirm-actions">
                <button
                  className="confirm-cancel"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  className="confirm-delete"
                  onClick={() => handleDelete(showDeleteConfirm)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactDashboard;
