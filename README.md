# Loan Processing API

A mock REST API for a fictional fintech loan processing platform. Built as a technical writing portfolio sample to demonstrate API documentation, endpoint design, and developer experience writing.

> **Live API:** `https://loan-processing-api.onrender.com`
>
> **Test API Key:** `Bearer test_key_loanapi_2026`

---

## Table of Contents

- [Getting Started](GETTING_STARTED.md)
- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Root](#root)
  - [Create Borrower](#create-borrower)
  - [Get All Borrowers](#get-all-borrowers)
  - [Get Single Borrower](#get-single-borrower)
  - [Submit Loan Application](#submit-loan-application)
  - [Get All Loan Applications](#get-all-loan-applications)
  - [Upload Document](#upload-document)
  - [Get Documents](#get-documents)
  - [Update Loan Status](#update-loan-status)
- [Error Handling](#error-handling)
- [Workflow Example](#workflow-example)
- [Testing the API](#testing-the-api)
- [Rate Limiting](#rate-limiting)
- [Glossary](#glossary)
- [About This Project](#about-this-project)
- [Changelog](CHANGELOG.md)

---

## Overview

The Loan Processing API allows applications to create borrower profiles, submit loan applications, upload supporting documents, and manage loan status updates.

This API is designed for integration with mortgage platforms, loan origination systems, and financial service applications.

**Common use cases:**

- Create borrower records during onboarding
- Submit loan applications from partner systems
- Upload and manage supporting documents for underwriting
- Retrieve and update real-time loan application status
- Build and test fintech integrations

---

## Base URL

```
https://loan-processing-api.onrender.com
```

For local development:

```
http://localhost:3000
```

---

## Authentication

All requests except the root endpoint require a valid API key in the authorization header.

```
Authorization: Bearer YOUR_API_KEY
```

If the API key is missing or invalid, the API returns a `401 Unauthorized` response:

```json
{
  "error": "unauthorized",
  "message": "Missing or invalid API key."
}
```

---

### Test Credentials

Use this key to authenticate all requests:

```
Authorization: Bearer test_key_loanapi_2026
```

> **Note:** This is a test key for portfolio demonstration purposes only.

---

## Endpoints

---

### Root

Check that the API is running.

```
GET /
```

**cURL Example**

```bash
curl https://loan-processing-api.onrender.com/
```

**Response Example**

```json
{
  "message": "Loan Processing API is running.",
  "version": "1.0.0",
  "docs": "https://github.com/writingteacher/loan-processing-api"
}
```

---

### Create Borrower

Creates a new borrower profile in the loan processing system.

```
POST /v1/borrowers
```

**Request Body**

| Field        | Type   | Required | Description              |
|--------------|--------|----------|--------------------------|
| `first_name` | string | ✅ Yes   | Borrower's first name    |
| `last_name`  | string | ✅ Yes   | Borrower's last name     |
| `email`      | string | ✅ Yes   | Borrower's email address |

**cURL Example**

```bash
curl -X POST https://loan-processing-api.onrender.com/v1/borrowers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"first_name": "Jane", "last_name": "Smith", "email": "jane@example.com"}'
```

**Request Example**

```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com"
}
```

**Response Example**

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

---

### Get All Borrowers

Returns a list of all borrower profiles.

```
GET /v1/borrowers
```

**cURL Example**

```bash
curl https://loan-processing-api.onrender.com/v1/borrowers \
  -H "Authorization: Bearer test_key_loanapi_2026"
```

**Response Example**

```json
{
  "borrowers": [
    {
      "borrower_id": "br_78234",
      "first_name": "Jane",
      "last_name": "Smith",
      "email": "jane@example.com",
      "status": "created",
      "created_at": "2026-03-09T10:00:00Z"
    }
  ],
  "total": 1
}
```

---

### Get Single Borrower

Returns a single borrower by ID.

```
GET /v1/borrowers/:id
```

**Path Parameter**

| Parameter | Description                            |
|-----------|----------------------------------------|
| `id`      | The `borrower_id` returned on creation |

**cURL Example**

```bash
curl https://loan-processing-api.onrender.com/v1/borrowers/br_78234 \
  -H "Authorization: Bearer test_key_loanapi_2026"
```

**Response Example**

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

---

### Submit Loan Application

Creates a new loan application linked to an existing borrower.

```
POST /v1/loan-applications
```

**Request Body**

| Field            | Type   | Required | Description                     |
|------------------|--------|----------|---------------------------------|
| `borrower_id`    | string | ✅ Yes   | ID of an existing borrower      |
| `loan_amount`    | number | ✅ Yes   | Requested loan amount in USD    |
| `property_value` | number | ✅ Yes   | Estimated property value in USD |

**cURL Example**

```bash
curl -X POST https://loan-processing-api.onrender.com/v1/loan-applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"borrower_id": "br_78234", "loan_amount": 350000, "property_value": 420000}'
```

**Request Example**

```json
{
  "borrower_id": "br_78234",
  "loan_amount": 350000,
  "property_value": 420000
}
```

**Response Example**

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

### Get All Loan Applications

Returns a list of all submitted loan applications.

```
GET /v1/loan-applications
```

**cURL Example**

```bash
curl https://loan-processing-api.onrender.com/v1/loan-applications \
  -H "Authorization: Bearer test_key_loanapi_2026"
```

**Response Example**

```json
{
  "applications": [
    {
      "application_id": "app_90821",
      "borrower_id": "br_78234",
      "loan_amount": 350000,
      "property_value": 420000,
      "status": "submitted",
      "submitted_at": "2026-03-09T10:05:00Z"
    }
  ],
  "total": 1
}
```

---

### Upload Document

Uploads a supporting document linked to an existing borrower.

```
POST /v1/documents
```

**Request Body**

| Field           | Type   | Required | Description |
|-----------------|--------|----------|-------------|
| `borrower_id`   | string | ✅ Yes   | ID of an existing borrower |
| `document_type` | string | ✅ Yes   | Accepted values: `pay_stub`, `tax_return`, `bank_statement`, `id_verification` |
| `file_name`     | string | ✅ Yes   | Name of the uploaded file |

**cURL Example**

```bash
curl -X POST https://loan-processing-api.onrender.com/v1/documents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"borrower_id": "br_78234", "document_type": "pay_stub", "file_name": "jane_pay_stub_march2026.pdf"}'
```

**Request Example**

```json
{
  "borrower_id": "br_78234",
  "document_type": "pay_stub",
  "file_name": "jane_pay_stub_march2026.pdf"
}
```

**Response Example**

```json
{
  "document_id": "doc_90589",
  "borrower_id": "br_78234",
  "document_type": "pay_stub",
  "file_name": "jane_pay_stub_march2026.pdf",
  "status": "received",
  "uploaded_at": "2026-03-10T10:31:12.611Z"
}
```

---

### Get Documents

Returns all documents uploaded for a specific borrower.

```
GET /v1/documents?borrower_id={borrower_id}
```

**Query Parameter**

| Parameter     | Type   | Required | Description                |
|---------------|--------|----------|----------------------------|
| `borrower_id` | string | ✅ Yes   | ID of an existing borrower |

**cURL Example**

```bash
curl "https://loan-processing-api.onrender.com/v1/documents?borrower_id=br_78234" \
  -H "Authorization: Bearer test_key_loanapi_2026"
```

**Response Example**

```json
{
  "documents": [
    {
      "document_id": "doc_90589",
      "borrower_id": "br_78234",
      "document_type": "pay_stub",
      "file_name": "jane_pay_stub_march2026.pdf",
      "status": "received",
      "uploaded_at": "2026-03-10T10:31:12.611Z"
    }
  ],
  "total": 1
}
```

---

### Update Loan Status

Updates the status of an existing loan application.

```
PATCH /v1/loan-applications/:id/status
```

**Path Parameter**

| Parameter | Description                               |
|-----------|-------------------------------------------|
| `id`      | The `application_id` returned on creation |

**Request Body**

| Field    | Type   | Required | Description |
|----------|--------|----------|-------------|
| `status` | string | ✅ Yes   | Accepted values: `submitted`, `under_review`, `approved`, `rejected` |

**cURL Example**

```bash
curl -X PATCH https://loan-processing-api.onrender.com/v1/loan-applications/app_90821/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"status": "approved"}'
```

**Request Example**

```json
{
  "status": "approved"
}
```

**Response Example**

```json
{
  "application_id": "app_90821",
  "borrower_id": "br_78234",
  "loan_amount": 350000,
  "property_value": 420000,
  "status": "approved",
  "submitted_at": "2026-03-10T10:31:55.609Z",
  "updated_at": "2026-03-10T10:33:01.974Z"
}
```

---

## Error Handling

All errors return a consistent JSON structure:

```json
{
  "error": "error_code",
  "message": "A human-readable description of the error."
}
```

**Common Error Codes**

| Status Code | Error Code             | Meaning                       |
|-------------|------------------------|-------------------------------|
| `400`       | `invalid_request`      | Missing or invalid parameters |
| `401`       | `unauthorized`         | Missing or invalid API key    |
| `404`       | `not_found`            | Resource not found            |
| `429`       | `rate_limit_exceeded`  | Too many requests             |
| `500`       | `server_error`         | Internal server error         |

**400 — Invalid Request**

Returned when required fields are missing or contain invalid values.

```json
{
  "error": "invalid_request",
  "message": "first_name, last_name, and email are required."
}
```

---

**401 — Unauthorized**

Returned when the API key is missing or incorrect.

```json
{
  "error": "unauthorized",
  "message": "Missing or invalid API key."
}
```

---

**404 — Not Found**

Returned when the requested resource does not exist.

```json
{
  "error": "not_found",
  "message": "Borrower not found."
}
```

---

**429 — Too Many Requests**

Returned when you exceed the API rate limit.
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please wait before retrying.",
  "retry_after": 60
}
```

> See the [Rate Limiting](#rate-limiting) section for limits and best practices.

**500 — Server Error**

Returned when an unexpected error occurs on the server.

```json
{
  "error": "server_error",
  "message": "An unexpected error occurred. Please try again later."
}
```

---

## Workflow Example

A complete loan application follows this sequence:

```
1. POST /v1/borrowers                        → Create borrower profile
            ↓
2. POST /v1/loan-applications                → Submit loan application
            ↓
3. POST /v1/documents                        → Upload supporting documents
            ↓
4. PATCH /v1/loan-applications/:id/status    → Update status to under_review
            ↓
5. PATCH /v1/loan-applications/:id/status    → Update status to approved
```

---

**Step 1 — Create a borrower**

```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com"
}
```

> Save the `borrower_id` from the response — you need it in Steps 2 and 3.

---

**Step 2 — Submit a loan application**

```json
{
  "borrower_id": "br_78234",
  "loan_amount": 350000,
  "property_value": 420000
}
```

> Save the `application_id` from the response — you need it in Steps 4 and 5.

---

**Step 3 — Upload supporting documents**

```json
{
  "borrower_id": "br_78234",
  "document_type": "pay_stub",
  "file_name": "jane_pay_stub_march2026.pdf"
}
```

> Repeat this step for each required document — tax returns, bank statements, ID verification.

---

**Step 4 — Move application to under review**

```json
{
  "status": "under_review"
}
```

---

**Step 5 — Approve or reject the application**

```json
{
  "status": "approved"
}
```

> Valid status values: `submitted`, `under_review`, `approved`, `rejected`

---

## Testing the API

You can test all endpoints using **Postman** or **Hoppscotch** (free, browser-based).

### Using Postman

1. Set the request method (GET, POST, or PATCH)
2. Enter the endpoint URL
3. Click the **Headers** tab and add:

| Key             | Value                          |
|-----------------|--------------------------------|
| `Authorization` | `Bearer test_key_loanapi_2026` |

4. For POST and PATCH requests, click **Body** → **raw** → **JSON** and add the request body
5. Click **Send**

### Using Hoppscotch (browser-based, no install needed)

1. Go to [hoppscotch.io](https://hoppscotch.io)
2. Set the method and URL
3. Add the `Authorization` header with the test key
4. Click **Send**

> **Note:** This API is hosted on Render's free tier. The first request after a period of inactivity may take 30-60 seconds while the server wakes up. Subsequent requests will be fast.

---
## Rate Limiting

The Loan Processing API limits the number of requests 
you can make in a given time period to ensure stability 
and fair usage across all integrations.

**Default Limits**

| Plan  | Requests per minute | Requests per day |
|-------|--------------------|--------------------|
| Free  | 30                 | 1,000              |
| Pro   | 100                | 10,000             |

> **Note:** This is a portfolio demonstration API. Rate 
> limiting is documented here to reflect real-world API 
> design but is not enforced in the current version.

---

### Rate Limit Headers

Every API response includes headers that show your 
current usage:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed per minute |
| `X-RateLimit-Remaining` | Requests remaining in current window |
| `X-RateLimit-Reset` | Unix timestamp when the limit resets |

---

### Exceeded Rate Limit

If you exceed the rate limit the API returns a 
`429 Too Many Requests` response:
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please wait before retrying.",
  "retry_after": 60
}
```

The `retry_after` field tells you how many seconds 
to wait before making another request.

---

### Best Practices

- Cache responses where possible to reduce API calls
- Implement exponential backoff when retrying failed requests
- Monitor your `X-RateLimit-Remaining` header to avoid hitting limits
- Contact support to upgrade your plan if you need higher limits

---

## Glossary

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface. A set of rules that allows software applications to communicate with each other. |
| **Borrower** | An individual applying for a loan. In this API, a borrower profile must be created before a loan application can be submitted. |
| **Endpoint** | A specific URL where an API can be accessed. Each endpoint performs a specific action, such as creating a borrower or submitting a loan application. |
| **LTV (Loan-to-Value)** | A ratio that compares the loan amount to the property value. For example, a $350,000 loan on a $420,000 property has an LTV of 83%. Lenders use LTV to assess risk. |
| **Origination** | The process of creating a new loan, from the initial application through to funding. |
| **Underwriting** | The process by which a lender evaluates the risk of lending to a borrower. Underwriters review documents such as pay stubs, tax returns, and bank statements. |
| **REST** | Representational State Transfer. An architectural style for APIs that uses standard HTTP methods like GET, POST, PATCH, and DELETE. |
| **JSON** | JavaScript Object Notation. A lightweight data format used to send and receive data in REST APIs. |
| **Bearer Token** | A type of API authentication where a token is included in the request header to verify the caller's identity. |
| **ISO 8601** | An international standard for representing dates and times. All timestamps in this API use this format, for example: `2026-03-09T10:00:00Z`. The `Z` indicates UTC timezone. |
| **HTTP Status Code** | A three-digit code returned by an API to indicate the result of a request. Common codes include `200` (success), `400` (bad request), `401` (unauthorized), `404` (not found), and `500` (server error). |
| **Query Parameter** | A key-value pair appended to a URL to filter or modify a request. For example: `/v1/documents?borrower_id=br_78234`. |
| **Path Parameter** | A variable segment in a URL that identifies a specific resource. For example: `/v1/borrowers/:id` where `:id` is the path parameter. |

---

## About This Project

This API was built as a **technical writing portfolio sample** to demonstrate:

- REST API documentation structure
- Endpoint documentation with request/response examples
- Error handling documentation
- Developer workflow documentation
- Fintech domain knowledge
- Live API deployment

**Tech stack:** Node.js, Express.js, hosted on Render

---

*Built by [writingteacher](https://github.com/writingteacher)*