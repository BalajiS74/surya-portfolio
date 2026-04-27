// src/api/portfolioApi.js
const API_BASE_URL =
  "https://gnt-official-website-backend.onrender.com/api/ceo-portfolio";

// Create new portfolio
export const createPortfolio = async (portfolioData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(portfolioData),
  });
  if (!response.ok) {
    throw new Error("Failed to create portfolio");
  }
  return response.json();
};

// Get all portfolios
export const getAllPortfolios = async () => {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch portfolios");
  }
  return response.json();
};

// Get portfolio by ID
export const getPortfolioById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch portfolio");
  }
  return response.json();
};

// Update portfolio
export const updatePortfolio = async (id, portfolioData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(portfolioData),
  });
  if (!response.ok) {
    throw new Error("Failed to update portfolio");
  }
  return response.json();
};

// Delete portfolio
export const deletePortfolio = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete portfolio");
  }
  return response.json();
};

export default {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
};
