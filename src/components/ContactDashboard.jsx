// components/ContactDashboard.js
import React, { useState, useEffect } from "react";
import "./ContactDashboard.css";
import {
  getAllPortfolios,
  deletePortfolio,
  updatePortfolio,
} from "../api/portfolioApi";

const ContactDashboard = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState("all");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await getAllPortfolios();
      // API returns { success: true, data: [...] } - extract the data array
      const apiData = response.data || response;
      // Transform API data to match component's expected format
      const transformedContacts = (Array.isArray(apiData) ? apiData : []).map(
        (item, index) => ({
          id: item._id || item.id || index + 1,
          name: item.name || "Unknown",
          email: item.email || "",
          phone: item.phone || "",
          subject: item.subject || item.title || "No Subject",
          message: item.message || item.description || "",
          date: item.createdAt
            ? new Date(item.createdAt).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          time: item.createdAt
            ? new Date(item.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "12:00 PM",
          status: item.status || "pending",
          category: item.category || "general",
          priority: item.priority || "medium",
          company: item.company || "",
          country: item.country || "",
        }),
      );
      setContacts(transformedContacts);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      setError("Failed to load contacts. Please try again later.");
      // Fallback to empty array - dashboard will show empty state
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = async (id) => {
    try {
      // Call the API to delete from backend
      await deletePortfolio(id);
      // Remove from local state after successful API call
      setContacts(contacts.filter((contact) => contact.id !== id));
      setShowDeleteConfirm(null);
      setSelectedContact(null);
    } catch (err) {
      console.error("Failed to delete contact:", err);
      alert("Failed to delete contact. Please try again.");
    }
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
          <div className="header-row">
            <div>
              <h2 className="dashboard-title">Contact Dashboard</h2>
              <p className="dashboard-subtitle">
                View all messages from your visitors
              </p>
            </div>
            <button
              className="refresh-button"
              onClick={fetchContacts}
              disabled={loading}
            >
              {loading ? "⟳" : "↻"} Refresh
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading contacts...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button className="retry-button" onClick={fetchContacts}>
              Retry
            </button>
          </div>
        )}

        {/* Stats Cards */}
        {!loading && !error && (
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
        )}

        {/* Filter Tabs */}
        {!loading && !error && (
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
        )}

        {/* Dashboard Content */}
        {!loading && !error && (
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
                          <div className="contact-company">
                            {contact.company}
                          </div>
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
        )}

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
