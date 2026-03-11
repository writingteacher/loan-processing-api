# Getting Started with the Loan Processing API

This guide walks you through making your first API calls in under 5 minutes.

---

## What You Need

- A REST API client — we recommend [Postman](https://www.postman.com) (free) or [Hoppscotch](https://hoppscotch.io) (browser-based, no install)
- Your test API key:

```
Bearer test_key_loanapi_2026
```

> **Tip:** Want to skip setup? Import the [Postman Collection](loan-processing-api.postman_collection.json) and all endpoints are pre-configured and ready to test.

---

## Step 1 — Confirm the API is Running

Before making any requests, confirm the API is live.

**Request:**

```bash
curl https://loan-processing-api.onrender.com/
```

**Expected Response:**

```
Status: 200 OK
```

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

> **Important:** Save the `application_id` from the response. You will need it to update the loan status.
>
> **Note:** The `ltv` field is calculated automatically — loan_amount ÷ property_value × 100.

---

## Step 5 — Retrieve All Loan Applications

Use pagination to retrieve your loan applications.

**Request:**

```bash
curl "https://loan-processing-api.onrender.com/v1/loan-applications?limit=10&offset=0" \
  -H "Authorization: Bearer test_key_loanapi_2026"
```

**Expected Response:**

```
Status: 200 OK
```

```json
{
  "applications": [
    {
      "application_id": "app_90821",
      "borrower_id": "br_78234",
      "loan_amount": 350000,
      "property_value": 420000,
      "ltv": 83.33,
      "status": "submitted",
      "submitted_at": "2026-03-09T10:05:00.000Z"
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}
```

---

## What You Just Did

In 5 steps you completed a full loan application workflow:

```
✅ Step 1 — Confirmed the API is running
✅ Step 2 — Authenticated your requests
✅ Step 3 — Created a borrower profile
✅ Step 4 — Submitted a loan application with LTV calculation
✅ Step 5 — Retrieved applications using pagination
```

This is the core workflow every integration with the Loan Processing API follows.

---

## What's Next

Now that you've completed your first workflow, explore the full API:

- [Full Endpoint Reference](docs/endpoints/borrowers.md) — detailed documentation for all endpoints
- [Authentication Guide](docs/authentication.md) — API keys and security
- [Error Handling](docs/errors.md) — how to handle errors in your integration
- [Idempotency](docs/idempotency.md) — preventing duplicate requests
- [Rate Limiting](docs/rate-limiting.md) — request limits and best practices

---

## Need Help?

If something isn't working as expected:

1. Check that your API key is correct — `Bearer test_key_loanapi_2026`
2. Check that your request body is valid JSON
3. Check the [Error Handling](docs/errors.md) section for common error codes
4. Review the full endpoint documentation in [docs/endpoints](docs/endpoints/borrowers.md)
5. [Open an issue](https://github.com/writingteacher/loan-processing-api/issues) on GitHub