# Loan Processing API

A mock REST API for a fictional fintech loan processing platform. Built as a technical writing portfolio sample to demonstrate API documentation, endpoint design, and developer experience writing.

> **Live API:** `https://loan-processing-api.onrender.com` ← *(update this after deployment)*

---

## Table of Contents

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
- [Error Handling](#error-handling)
- [Workflow Example](#workflow-example)
- [Testing the API](#testing-the-api)

---

## Overview

The Loan Processing API allows applications to create borrower profiles, submit loan applications, and retrieve application status updates.

This API is designed for integration with mortgage platforms, loan origination systems, and financial service applications.

**Common use cases:**

- Create borrower records during onboarding
- Submit loan applications from partner systems
- Retrieve real-time loan application status
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

All requests except the root endpoint require an API key 
in the authorization header.

​```
Authorization: Bearer YOUR_API_KEY
​```

If the API key is missing or invalid, the API returns 
a `401 Unauthorized` response:

​```json
{
  "error": "unauthorized",
  "message": "Missing or invalid API key."
}
​```

---

### Test Credentials

Use this key to authenticate all requests:

​```
Authorization: Bearer test_key_loanapi_2026
​```

> **Note:** This is a test key for portfolio demonstration purposes only.

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
curl https://loan-processing-api.onrender.com/v1/borrowers
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

| Parameter     | Description                          |
|---------------|--------------------------------------|
| `id`          | The `borrower_id` returned on creation |

**cURL Example**

```bash
curl https://loan-processing-api.onrender.com/v1/borrowers/br_78234
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

| Field            | Type   | Required | Description                        |
|------------------|--------|----------|------------------------------------|
| `borrower_id`    | string | ✅ Yes   | ID of an existing borrower         |
| `loan_amount`    | number | ✅ Yes   | Requested loan amount in USD       |
| `property_value` | number | ✅ Yes   | Estimated property value in USD    |

**cURL Example**

```bash
curl -X POST https://loan-processing-api.onrender.com/v1/loan-applications \
  -H "Content-Type: application/json" \
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
curl https://loan-processing-api.onrender.com/v1/loan-applications
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

## Error Handling

All errors return a consistent JSON structure:

```json
{
  "error": "error_code",
  "message": "A human-readable description of the error."
}
```

**Common Error Codes**

| Status Code | Error Code        | Meaning                          |
|-------------|-------------------|----------------------------------|
| `400`       | `invalid_request` | Missing or invalid parameters    |
| `401`       | `unauthorized`    | Missing or invalid API key       |
| `404`       | `not_found`       | Resource not found               |
| `500`       | `server_error`    | Internal server error            |

**Example Error Response**

```json
{
  "error": "invalid_request",
  "message": "first_name, last_name, and email are required."
}
```

---

## Workflow Example

A typical loan application follows this sequence:

```
1. POST /v1/borrowers         → Create borrower profile
         ↓
2. POST /v1/loan-applications → Submit loan application using borrower_id
         ↓
3. GET  /v1/loan-applications/:id → Retrieve application status
```

**Step 1 — Create a borrower**

```json
POST /v1/borrowers
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com"
}
```

**Step 2 — Submit a loan application using the returned `borrower_id`**

```json
POST /v1/loan-applications
{
  "borrower_id": "br_78234",
  "loan_amount": 350000,
  "property_value": 420000
}
```

**Step 3 — Retrieve the application**

```
GET /v1/loan-applications/app_90821
```

---

## Testing the API

You can test all endpoints without installing anything using **Hoppscotch** (free, browser-based):

1. Go to [hoppscotch.io](https://hoppscotch.io)
2. Set the method (GET or POST)
3. Enter the endpoint URL
4. For POST requests, add the request body as JSON
5. Click **Send**

---

## About This Project

This API was built as a **technical writing portfolio sample** to demonstrate:

- REST API documentation structure
- Endpoint documentation with request/response examples
- Error handling documentation
- Developer workflow documentation
- Live API deployment

**Tech stack:** Node.js, Express.js, hosted on Render

---

*Built by [writingteacher](https://github.com/writingteacher)*