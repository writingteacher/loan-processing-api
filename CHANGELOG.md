# Changelog

All notable changes to the Loan Processing API are documented here.

---

## [v1.2.0] — 2026-03-11

### Added
- Pagination support on `GET /v1/borrowers` and `GET /v1/loan-applications` — use `limit` and `offset` query parameters
- LTV (Loan-to-Value) calculated field returned in all loan application responses
- Idempotency keys documentation — prevents duplicate requests in financial workflows
- Multi-file documentation architecture — all docs moved to `docs/` folder
- `docs/authentication.md` — dedicated authentication guide
- `docs/versioning.md` — versioning strategy and deprecation policy
- `docs/idempotency.md` — idempotency keys guide
- `docs/rate-limiting.md` — rate limiting guide
- `docs/errors.md` — error handling guide
- `docs/glossary.md` — 19 fintech and API terms, alphabetized
- `docs/endpoints/borrowers.md` — dedicated borrowers endpoint reference
- `docs/endpoints/loan-applications.md` — dedicated loan applications endpoint reference
- `docs/endpoints/documents.md` — dedicated documents endpoint reference
- Multiple field validation error example
- State machine table for loan status transitions
- Field constraints column in all request body tables

### Changed
- README rebuilt as a clean landing page linking to all docs
- `Upload Document` endpoint renamed to `Register Document` to accurately reflect metadata-only behavior
- All timestamps standardized to millisecond precision — `2026-03-09T10:00:00.000Z`
- Glossary alphabetized and expanded from 15 to 19 terms

---

## [v1.1.0] — 2026-03-10

### Added
- `POST /v1/documents` — register document endpoint
- `GET /v1/documents` — get documents by borrower
- `PATCH /v1/loan-applications/:id/status` — update loan status endpoint
- Authentication middleware — all endpoints except root now require API key
- Workflow example — 5 step sequence from borrower creation to loan approval
- Rate limiting documentation
- HTTP status codes on all response examples
- Field constraints on all request body tables
- Versioning section
- Support section

---

## [v1.0.0] — 2026-03-09

### Added
- Initial release
- `GET /` — root health check endpoint
- `POST /v1/borrowers` — create borrower endpoint
- `GET /v1/borrowers` — list borrowers endpoint
- `GET /v1/borrowers/:id` — get single borrower endpoint
- `POST /v1/loan-applications` — submit loan application endpoint
- `GET /v1/loan-applications` — list loan applications endpoint
- Base authentication structure
- Error handling documentation
- Glossary
- Getting Started guide