# Tutorial — Processing a Complete Loan Application

This tutorial walks through a complete loan application workflow from 
borrower creation to final approval. By the end you will have made 
7 API calls covering the full loan lifecycle.

**Time to complete:** 10 minutes

**What you need:**
- Test API key: `Bearer test_key_loanapi_2026`
- Postman, Hoppscotch, or cURL

---

## Overview

A complete loan application follows this sequence:
```
1. Create borrower          → POST /v1/borrowers
2. Submit loan application  → POST /v1/loan-applications
3. Register documents       → POST /v1/documents (repeat x3)
4. Move to under review     → PATCH /v1/loan-applications/:id/status
5. Approve the loan         → PATCH /v1/loan-applications/:id/status
```

---

## Step 1 — Create a Borrower

Every loan application must be linked to a borrower. Start by creating 
a borrower profile for Jane Smith.

**Request:**
```bash
curl -X POST https://loan-processing-api.onrender.com/v1/borrowers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"first_name": "Jane", "last_name": "Smith", "email": "jane@example.com"}'
```

**Response:**
```
Status: 201 Created
```
```json
{
  "borrower_id": "br_78234",
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "status": "created",
  "created_at": "2026-03-09T10:00:00.000Z"
}
```

> **Important:** Save the `borrower_id` — you need it in every subsequent step.

---

## Step 2 — Submit a Loan Application

Jane is applying for a $350,000 mortgage on a property valued at $420,000.
Use the `borrower_id` from Step 1.

**Request:**
```bash
curl -X POST https://loan-processing-api.onrender.com/v1/loan-applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"borrower_id": "br_78234", "loan_amount": 350000, "property_value": 420000}'
```

**Response:**
```
Status: 201 Created
```
```json
{
  "application_id": "app_90821",
  "borrower_id": "br_78234",
  "loan_amount": 350000,
  "property_value": 420000,
  "ltv": 83.33,
  "status": "submitted",
  "submitted_at": "2026-03-09T10:05:00.000Z"
}
```

> **Note:** The `ltv` field is calculated automatically — 83.33% means Jane 
> is borrowing 83.33% of the property value. Lenders use LTV to assess risk.
>
> **Important:** Save the `application_id` — you need it in Steps 4 and 5.

---

## Step 3 — Register Supporting Documents

Underwriting requires three documents. Register each one using the 
`borrower_id` from Step 1.

**Register a pay stub:**
```bash
curl -X POST https://loan-processing-api.onrender.com/v1/documents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"borrower_id": "br_78234", "document_type": "pay_stub", "file_name": "jane_pay_stub_march2026.pdf"}'
```

**Register a tax return:**
```bash
curl -X POST https://loan-processing-api.onrender.com/v1/documents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"borrower_id": "br_78234", "document_type": "tax_return", "file_name": "jane_tax_return_2025.pdf"}'
```

**Register a bank statement:**
```bash
curl -X POST https://loan-processing-api.onrender.com/v1/documents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"borrower_id": "br_78234", "document_type": "bank_statement", "file_name": "jane_bank_statement_march2026.pdf"}'
```

**Verify all documents were registered:**
```bash
curl "https://loan-processing-api.onrender.com/v1/documents?borrower_id=br_78234" \
  -H "Authorization: Bearer test_key_loanapi_2026"
```

**Response:**
```
Status: 200 OK
```
```json
{
  "documents": [
    {
      "document_id": "doc_90589",
      "borrower_id": "br_78234",
      "document_type": "pay_stub",
      "file_name": "jane_pay_stub_march2026.pdf",
      "status": "received",
      "uploaded_at": "2026-03-09T10:00:00.000Z"
    },
    {
      "document_id": "doc_90590",
      "borrower_id": "br_78234",
      "document_type": "tax_return",
      "file_name": "jane_tax_return_2025.pdf",
      "status": "received",
      "uploaded_at": "2026-03-09T10:01:00.000Z"
    },
    {
      "document_id": "doc_90591",
      "borrower_id": "br_78234",
      "document_type": "bank_statement",
      "file_name": "jane_bank_statement_march2026.pdf",
      "status": "received",
      "uploaded_at": "2026-03-09T10:02:00.000Z"
    }
  ],
  "total": 3
}
```

---

## Step 4 — Move Application to Under Review

All documents are received. Move the application to `under_review` to 
signal that underwriting has begun.

Use the `application_id` from Step 2.

**Request:**
```bash
curl -X PATCH https://loan-processing-api.onrender.com/v1/loan-applications/app_90821/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"status": "under_review"}'
```

**Response:**
```
Status: 200 OK
```
```json
{
  "application_id": "app_90821",
  "borrower_id": "br_78234",
  "loan_amount": 350000,
  "property_value": 420000,
  "ltv": 83.33,
  "status": "under_review",
  "submitted_at": "2026-03-09T10:05:00.000Z",
  "updated_at": "2026-03-09T10:15:00.000Z"
}
```

---

## Step 5 — Approve the Loan

Underwriting is complete. Approve the loan application.

**Request:**
```bash
curl -X PATCH https://loan-processing-api.onrender.com/v1/loan-applications/app_90821/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"status": "approved"}'
```

**Response:**
```
Status: 200 OK
```
```json
{
  "application_id": "app_90821",
  "borrower_id": "br_78234",
  "loan_amount": 350000,
  "property_value": 420000,
  "ltv": 83.33,
  "status": "approved",
  "submitted_at": "2026-03-09T10:05:00.000Z",
  "updated_at": "2026-03-09T10:30:00.000Z"
}
```

---

## What You Just Did
```
✅ Step 1 — Created a borrower profile
✅ Step 2 — Submitted a loan application with LTV calculation
✅ Step 3 — Registered 3 supporting documents
✅ Step 4 — Moved application to under review
✅ Step 5 — Approved the loan
```

You completed a full loan processing workflow — 7 API calls covering 
the entire loan lifecycle from application to approval.

---

## What Happens if a Loan is Rejected

If underwriting finds issues, reject the application instead:
```bash
curl -X PATCH https://loan-processing-api.onrender.com/v1/loan-applications/app_90821/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"status": "rejected"}'
```

> **Note:** A rejected loan cannot be reactivated. The borrower must 
> submit a new loan application.

---

## Related

- [Getting Started](../GETTING_STARTED.md)
- [Endpoints — Loan Applications](endpoints/loan-applications.md)
- [Endpoints — Borrowers](endpoints/borrowers.md)
- [Endpoints — Documents](endpoints/documents.md)
- [Error Handling](errors.md)