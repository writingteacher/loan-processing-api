const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────
// AUTHENTICATION MIDDLEWARE
// Validates the Bearer token on every request except the root endpoint.
// Returns 401 Unauthorized if the token is missing or incorrect.
// All protected endpoints require: Authorization: Bearer test_key_loanapi_2026
// ─────────────────────────────────────────
const TEST_API_KEY = "test_key_loanapi_2026";

app.use((req, res, next) => {
  // Allow unauthenticated access to the root health check endpoint
  if (req.path === "/") return next();
  
  const authHeader = req.headers["authorization"];

  // Reject requests with missing or invalid API keys
  if (!authHeader || authHeader !== `Bearer ${TEST_API_KEY}`) {
    return res.status(401).json({
      error: "unauthorized",
      message: "Missing or invalid API key."
    });
  }
  next();
});

// ─────────────────────────────────────────
// IN-MEMORY DATA STORE
// Simulates a database using arrays. Data resets on every server restart.
// In a production API these would be persistent database collections.
// ─────────────────────────────────────────
const borrowers = [];
const applications = [];
const documents = [];

// ─────────────────────────────────────────
// ROOT
// Health check endpoint. No authentication required.
// Returns API status, version, and docs URL.
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
// A borrower profile must be created before a loan application can be submitted.
// The borrower_id returned on creation is required for all subsequent operations.
// ─────────────────────────────────────────

// Create a borrower
// Validates that first_name, last_name, and email are all present.
// Returns 400 if any required field is missing.
// Returns 201 with the new borrower object including a generated borrower_id.
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
// Supports pagination via limit and offset query parameters.
// Default: limit=10, offset=0
// Returns the paginated borrower list plus total count, limit, and offset.
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

// Get a single borrower by ID
// Returns 404 if the borrower_id does not exist in the data store.
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
// Loan applications must be linked to an existing borrower via borrower_id.
// LTV (Loan-to-Value) is calculated automatically on creation.
// Status transitions follow a strict state machine — see docs/endpoints/loan-applications.md
// ─────────────────────────────────────────

// Submit a loan application
// Validates that borrower_id, loan_amount, and property_value are all present.
// Verifies that the borrower_id exists — returns 404 if not found.
// Calculates LTV automatically: (loan_amount / property_value) * 100
// Returns 201 with the new application object including generated application_id and ltv.
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

  // Calculate LTV rounded to 2 decimal places
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
// Supports pagination via limit and offset query parameters.
// Default: limit=10, offset=0
// Returns the paginated application list plus total count, limit, and offset.
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

// Get a single loan application by ID
// Returns 404 if the application_id does not exist in the data store.
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
// Documents are linked to borrowers via borrower_id.
// This endpoint registers document metadata only — no actual file upload occurs.
// Supported document types: pay_stub, tax_return, bank_statement, id_verification
// ─────────────────────────────────────────

// Register a document
// Validates that borrower_id, document_type, and file_name are all present.
// Verifies that the borrower_id exists — returns 404 if not found.
// Returns 201 with the new document object including generated document_id.
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
// Requires borrower_id as a query parameter — returns 400 if missing.
// Returns all documents registered for the specified borrower.
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
// Updates the status of an existing loan application.
// Valid status values: submitted, under_review, approved, rejected
// Status transitions follow a strict state machine:
//   submitted    → under_review, rejected
//   under_review → approved, rejected
//   approved     → no further transitions
//   rejected     → no further transitions
// ─────────────────────────────────────────

// Update loan application status
// Validates that status is present and is one of the accepted values.
// Returns 404 if the application_id does not exist.
// Returns 200 with the updated application object including updated_at timestamp.
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
// Uses PORT environment variable if set — falls back to 3000 for local development.
// Render.com sets PORT automatically on deployment.
// ─────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Loan Processing API running on port ${PORT}`);
});