# Documents

Document endpoints manage the registration of supporting documents linked to a borrower. Documents are required during the underwriting process.

---

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/documents` | Register a document |
| `GET` | `/v1/documents` | Get all documents for a borrower |

---

## Register Document

Registers a document record linked to an existing borrower.

> **Note:** This endpoint records document metadata only. File upload via multipart/form-data is not supported in v1.