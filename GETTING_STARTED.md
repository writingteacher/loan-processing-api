# Getting Started with the Loan Processing API

This guide walks you through making your first API calls in under 5 minutes.

---

## What You Need

- A REST API client — we recommend [Postman](https://www.postman.com) (free) or [Hoppscotch](https://hoppscotch.io) (browser-based, no install)
- Your test API key:

```
Bearer test_key_loanapi_2026
```

---

## Step 1 — Confirm the API is Running

Before making any requests, confirm the API is live.

**Request:**

```bash
curl https://loan-processing-api.onrender.com/
```

**Expected Response:**

```json
{
  "message": "Loan Processing API is running.",
  "version": "1.0.0",
  "docs": "https://github.com/writingteacher/loan-processing-api"
}
```

> **Note:** This API is hosted on Render's free tier. If you haven't made a request recently, the server may take 30-60 seconds to wake up. This is normal.

---

## Step 2 — Authenticate Your Requests

All endpoints except the root require an API key in the request header.

Add this header to every request:

```
Authorization: Bearer test_key_loanapi_2026
```

**What happens without the key:**

```json
{
  "error": "unauthorized",
  "message": "Missing or invalid API key."
}
```

---

## Step 3 — Create Your First Borrower

A borrower is a person applying for a loan. Every loan application must be linked to a borrower, so this is always your first step.

**Request:**

```bash
curl -X POST https://loan-processing-api.onrender.com/v1/borrowers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"first_name": "Jane", "last_name": "Smith", "email": "jane@example.com"}'
```

**Expected Response:**

```json
{
  "borrower_id": "br_78234",
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "status": "created",
  "created_at": "2026-03-09T10:00:00Z"
}
```

> **Important:** Save the `borrower_id` from the response. You will need it in the next step.

---

## Step 4 — Submit a Loan Application

Now use the `borrower_id` from Step 3 to submit a loan application.

**Request:**

```bash
curl -X POST https://loan-processing-api.onrender.com/v1/loan-applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"borrower_id": "br_78234", "loan_amount": 350000, "property_value": 420000}'
```

**Expected Response:**

```json
{
  "application_id": "app_90821",
  "borrower_id": "br_78234",
  "loan_amount": 350000,
  "property_value": 420000,
  "status": "submitted",
  "submitted_at": "2026-03-09T10:05:00Z"
}
```

> **Important:** Save the `application_id` from the response. You will need it to retrieve the application status.

---

## Step 5 — Retrieve Your Application

Use the `application_id` from Step 4 to retrieve your loan application.

**Request:**

```bash
curl https://loan-processing-api.onrender.com/v1/loan-applications/app_90821 \
  -H "Authorization: Bearer test_key_loanapi_2026"
```

**Expected Response:**

```json
{
  "application_id": "app_90821",
  "borrower_id": "br_78234",
  "loan_amount": 350000,
  "property_value": 420000,
  "status": "submitted",
  "submitted_at": "2026-03-09T10:05:00Z"
}
```

---

## What You Just Did

In 5 steps you completed a full loan application workflow:

```
✅ Step 1 — Confirmed the API is running
✅ Step 2 — Authenticated your requests
✅ Step 3 — Created a borrower profile
✅ Step 4 — Submitted a loan application
✅ Step 5 — Retrieved the application status
```

This is the core workflow every integration with the Loan Processing API follows.

---

## What's Next

Now that you've completed your first workflow, explore the full API:

- [Full Endpoint Reference](README.md#endpoints) — detailed documentation for every endpoint
- [Error Handling](README.md#error-handling) — how to handle errors in your integration
- [Workflow Example](README.md#workflow-example) — a complete end-to-end workflow diagram

---

## Need Help?

If something isn't working as expected:

1. Check that your API key is correct — `Bearer test_key_loanapi_2026`
2. Check that your request body is valid JSON
3. Check the [Error Handling](README.md#error-handling) section for common error codes
4. Review the full endpoint documentation in the [README](README.md)