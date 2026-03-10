# Changelog

All notable changes to the Loan Processing API are documented here.

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version — incompatible API changes
- **MINOR** version — new functionality, backwards compatible
- **PATCH** version — bug fixes, backwards compatible

---

## [1.1.0] - 2026-03-10

### Added
- `POST /v1/documents` — upload supporting documents linked to a borrower
- `GET /v1/documents` — retrieve all documents for a specific borrower
- `PATCH /v1/loan-applications/:id/status` — update loan application status
- API key authentication required on all endpoints except root
- Test credentials documented in README and Getting Started guide

### Changed
- Updated workflow example to reflect full 5-step loan process
- Expanded error handling documentation with response examples for all error codes
- Added Glossary of fintech and API terms to README

---

## [1.0.0] - 2026-03-09

### Added
- Initial release
- `POST /v1/borrowers` — create a borrower profile
- `GET /v1/borrowers` — list all borrowers
- `GET /v1/borrowers/:id` — retrieve a single borrower
- `POST /v1/loan-applications` — submit a loan application
- `GET /v1/loan-applications` — list all loan applications
- Error handling for `400`, `401`, `404`, and `500` responses
- Getting Started guide
- Full README with endpoint documentation, workflow example, and testing instructions

---

*For questions or feedback, visit the [repository](https://github.com/writingteacher/loan-processing-api).*