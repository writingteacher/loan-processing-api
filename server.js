const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────
// AUTHENTICATION MIDDLEWARE
// ─────────────────────────────────────────
const TEST_API_KEY = "test_key_loanapi_2026";

app.use((req, res, next) => {
  if (req.path === "/") return next();
  
  const authHeader = req.headers["authorization"];
  if (!authHeader || authHeader !== `Bearer ${TEST_API_KEY}`) {
    return res.status(401).json({
      error: "unauthorized",
      message: "Missing or invalid API key."
    });
  }
  next();
});

// In-memory data store (mock database)
const borrowers = [];
const applications = [];

// ─────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "Loan Processing API is running.",
    version: "1.0.0",
    docs: "https://github.com/writingteacher/loan-processing-api"
  });
});

// ─────────────────────────────────────────
// BORROWERS
// ─────────────────────────────────────────

// Create a borrower
app.post("/v1/borrowers", (req, res) => {
  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).json({
      error: "invalid_request",
      message: "first_name, last_name, and email are required."
    });
  }

  const borrower = {
    borrower_id: "br_" + Math.floor(Math.random() * 90000 + 10000),
    first_name,
    last_name,
    email,
    status: "created",
    created_at: new Date().toISOString()
  };

  borrowers.push(borrower);
  res.status(201).json(borrower);
});

// Get all borrowers
app.get("/v1/borrowers", (req, res) => {
  res.json({ borrowers, total: borrowers.length });
});

// Get a single borrower
app.get("/v1/borrowers/:id", (req, res) => {
  const borrower = borrowers.find(b => b.borrower_id === req.params.id);
  if (!borrower) {
    return res.status(404).json({
      error: "not_found",
      message: "Borrower not found."
    });
  }
  res.json(borrower);
});

// ─────────────────────────────────────────
// LOAN APPLICATIONS
// ─────────────────────────────────────────

// Submit a loan application
app.post("/v1/loan-applications", (req, res) => {
  const { borrower_id, loan_amount, property_value } = req.body;

  if (!borrower_id || !loan_amount || !property_value) {
    return res.status(400).json({
      error: "invalid_request",
      message: "borrower_id, loan_amount, and property_value are required."
    });
  }

  const borrower = borrowers.find(b => b.borrower_id === borrower_id);
  if (!borrower) {
    return res.status(404).json({
      error: "not_found",
      message: "Borrower ID not found. Create a borrower first."
    });
  }

  const application = {
    application_id: "app_" + Math.floor(Math.random() * 90000 + 10000),
    borrower_id,
    loan_amount,
    property_value,
    status: "submitted",
    submitted_at: new Date().toISOString()
  };

  applications.push(application);
  res.status(201).json(application);
});

// Get all loan applications
app.get("/v1/loan-applications", (req, res) => {
  res.json({ applications, total: applications.length });
});

// Get a single loan application
app.get("/v1/loan-applications/:id", (req, res) => {
  const application = applications.find(a => a.application_id === req.params.id);
  if (!application) {
    return res.status(404).json({
      error: "not_found",
      message: "Application not found."
    });
  }
  res.json(application);
});

// ─────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Loan Processing API running on port ${PORT}`);
});