# Style Guide

This style guide defines the writing and formatting conventions used across 
all Loan Processing API documentation.

---

## API Design Conventions

### Naming

| Convention | Rule | Example |
|------------|------|---------|
| Endpoints | Lowercase, hyphen-separated | `/v1/loan-applications` |
| JSON fields | Lowercase, underscore-separated (snake_case) | `borrower_id`, `loan_amount` |
| Status values | Lowercase, underscore-separated | `under_review`, `pay_stub` |
| IDs | Prefixed with resource type | `br_78234`, `app_90821`, `doc_90589` |

### HTTP Methods

| Method | When to use |
|--------|-------------|
| `GET` | Retrieve a resource or list of resources |
| `POST` | Create a new resource |
| `PATCH` | Update part of an existing resource |
| `DELETE` | Remove a resource (reserved for future use) |

### Status Codes

| Code | When to use |
|------|-------------|
| `200 OK` | Successful GET or PATCH |
| `201 Created` | Successful POST that creates a resource |
| `400 Bad Request` | Missing or invalid request parameters |
| `401 Unauthorized` | Missing or invalid API key |
| `404 Not Found` | Resource does not exist |
| `429 Too Many Requests` | Rate limit exceeded |
| `500 Internal Server Error` | Unexpected server error |

---

## Documentation Writing Conventions

### Endpoint Descriptions

- Always start with a verb in the third person — "Creates", "Returns", "Updates"
- Be specific about what the endpoint does — not just "manages borrowers"
- Note any prerequisites — for example "A borrower profile must exist before submitting a loan application"

**Correct:**
> Creates a new borrower profile in the loan processing system.

**Incorrect:**
> This endpoint is for borrowers.

---

### Field Descriptions

- Always specify the data type — string, number, boolean
- Always note whether the field is required or optional
- Always list accepted values for enum fields
- Always specify constraints — max length, min/max value

**Correct:**

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `loan_amount` | number | ✅ Yes | Min: 1,000 — Max: 10,000,000 | Requested loan amount in USD |

**Incorrect:**

| Field | Description |
|-------|-------------|
| `loan_amount` | The loan amount |

---

### Code Examples

- Always include a cURL example for every endpoint
- Use realistic but clearly fictional data — `jane@example.com`, `br_78234`
- Never use real personal data in examples
- Always include the `Authorization` header
- Always show the response status code above the response body

---

### Response Examples

- Always show the status code above the JSON block:
```
Status: 201 Created
```
- Use consistent example IDs across all docs — `br_78234`, `app_90821`, `doc_90589`
- Use consistent timestamps — `2026-03-09T10:00:00.000Z`
- Always include milliseconds in timestamps

---

### Callouts

Use callouts sparingly — only for critical information a developer must not miss.
```markdown
> **Important:** Save the `borrower_id` from the response — you need it in the next step.
> **Note:** This is a test key for portfolio demonstration purposes only.
```

Never use callouts for general information that belongs in the main text.

---

### Capitalization

| Term | Convention |
|------|------------|
| API | Always uppercase |
| REST | Always uppercase |
| JSON | Always uppercase |
| Fintech | Capital F only at start of sentence |
| Bearer | Capital B when referring to the auth scheme |
| endpoint | Lowercase unless starting a sentence |

---

### Versioning Language

- Refer to the current version as `v1` — not `version 1` or `V1`
- Refer to future versions as `v2`, `v3` — not `version 2`
- Use "deprecated" not "depreciated" when describing old versions

---

## File and Folder Conventions

| Item | Convention |
|------|------------|
| File names | Lowercase, hyphen-separated | 
| Folder names | Lowercase, hyphen-separated |
| Markdown files | `.md` extension |
| OpenAPI spec | `openapi.yaml` in root |
| Postman collection | `*.postman_collection.json` in root |

---

## Related

- [Authentication](authentication.md)
- [Versioning](versioning.md)
- [Glossary](glossary.md)