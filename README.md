# Loan Processing API

A mock REST API for a fictional fintech loan processing platform. Built as a technical writing portfolio sample to demonstrate API documentation, endpoint design, and developer experience writing.

> **Live API:** `https://loan-processing-api.onrender.com`
>
> **Test API Key:** `Bearer test_key_loanapi_2026`

---

## Quick Start

New to the API? Start here:

→ [Getting Started Guide](GETTING_STARTED.md)

Already familiar with REST APIs? Import the Postman collection and start testing immediately:

→ [Download Postman Collection](loan-processing-api.postman_collection.json)

---

## Documentation

| Section | Description |
|---------|-------------|
| [Authentication](docs/authentication.md) | API keys, test credentials, key format |
| [Versioning](docs/versioning.md) | URL versioning, breaking changes, deprecation policy |
| [Idempotency](docs/idempotency.md) | Preventing duplicate requests in financial workflows |
| [Rate Limiting](docs/rate-limiting.md) | Request limits, headers, best practices |
| [Error Handling](docs/errors.md) | Error codes, response structure, validation errors |
| [Glossary](docs/glossary.md) | Fintech and API terminology |

---

## API Endpoints

| Section | Endpoints |
|---------|-----------|
| [Borrowers](docs/endpoints/borrowers.md) | `POST /v1/borrowers` · `GET /v1/borrowers` · `GET /v1/borrowers/:id` |
| [Loan Applications](docs/endpoints/loan-applications.md) | `POST /v1/loan-applications` · `GET /v1/loan-applications` · `PATCH /v1/loan-applications/:id/status` |
| [Documents](docs/endpoints/documents.md) | `POST /v1/documents` · `GET /v1/documents` |

---

## Workflow

A complete loan application follows this sequence:
```
1. POST /v1/borrowers                        → Create borrower profile
            ↓
2. POST /v1/loan-applications                → Submit loan application
            ↓
3. POST /v1/documents                        → Register supporting documents
            ↓
4. PATCH /v1/loan-applications/:id/status    → Update status to under_review
            ↓
5. PATCH /v1/loan-applications/:id/status    → Update status to approved
```

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## Support

- **GitHub Issues:** [Open an issue](https://github.com/writingteacher/loan-processing-api/issues)
- **GitHub Profile:** [writingteacher](https://github.com/writingteacher)

---

## About

This API was built as a **technical writing portfolio sample** to demonstrate:

- REST API documentation structure
- Multi-file documentation architecture
- Endpoint documentation with request/response examples
- Field validation and constraints documentation
- Error handling documentation
- Rate limiting documentation
- Idempotency documentation
- Versioning strategy documentation
- Developer workflow documentation
- Fintech domain knowledge
- Live API deployment

**Tech stack:** Node.js, Express.js, hosted on Render

---

*Built by [writingteacher](https://github.com/writingteacher)*