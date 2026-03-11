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
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const paginated = borrowers.slice(offset, offset + limit);
  res.json({
    borrowers: paginated,
    total: borrowers.length,
    limit,
    offset
  });
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

  const ltv = parseFloat(((loan_amount / property_value) * 100).toFixed(2));

  const application = {
    application_id: "app_" + Math.floor(Math.random() * 90000 + 10000),
    borrower_id,
    loan_amount,
    property_value,
    ltv,
    status: "submitted",
    submitted_at: new Date().toISOString()
  };

  applications.push(application);
  res.status(201).json(application);
});

// Get all loan applications
app.get("/v1/loan-applications", (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const paginated = applications.slice(offset, offset + limit);
  res.json({
    applications: paginated,
    total: applications.length,
    limit,
    offset
  });
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
// DOCUMENTS
// ─────────────────────────────────────────
const documents = [];

// Upload a document
app.post("/v1/documents", (req, res) => {
  const { borrower_id, document_type, file_name } = req.body;

  if (!borrower_id || !document_type || !file_name) {
    return res.status(400).json({
      error: "invalid_request",
      message: "borrower_id, document_type, and file_name are required."
    });
  }

  const borrower = borrowers.find(b => b.borrower_id === borrower_id);
  if (!borrower) {
    return res.status(404).json({
      error: "not_found",
      message: "Borrower not found."
    });
  }

  const document = {
    document_id: "doc_" + Math.floor(Math.random() * 90000 + 10000),
    borrower_id,
    document_type,
    file_name,
    status: "received",
    uploaded_at: new Date().toISOString()
  };

  documents.push(document);
  res.status(201).json(document);
});

// Get all documents for a borrower
app.get("/v1/documents", (req, res) => {
  const { borrower_id } = req.query;
  if (!borrower_id) {
    return res.status(400).json({
      error: "invalid_request",
      message: "borrower_id query parameter is required."
    });
  }
  const borrowerDocs = documents.filter(d => d.borrower_id === borrower_id);
  res.json({ documents: borrowerDocs, total: borrowerDocs.length });
});

// ─────────────────────────────────────────
// LOAN STATUS
// ─────────────────────────────────────────

// Update loan application status
app.patch("/v1/loan-applications/:id/status", (req, res) => {
  const { status } = req.body;
  const validStatuses = ["submitted", "under_review", "approved", "rejected"];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      error: "invalid_request",
      message: "status must be one of: submitted, under_review, approved, rejected."
    });
  }

  const application = applications.find(a => a.application_id === req.params.id);
  if (!application) {
    return res.status(404).json({
      error: "not_found",
      message: "Application not found."
    });
  }

  application.status = status;
  application.updated_at = new Date().toISOString();
  res.json(application);
});

// ─────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Loan Processing API running on port ${PORT}`);
});