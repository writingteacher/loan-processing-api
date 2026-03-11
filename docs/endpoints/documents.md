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

```
POST /v1/documents
```

**Request Body**

| Field           | Type   | Required | Constraints | Description |
|-----------------|--------|----------|-------------|-------------|
| `borrower_id`   | string | ✅ Yes   | Must be a valid existing borrower ID | ID of an existing borrower |
| `document_type` | string | ✅ Yes   | Accepted values: `pay_stub`, `tax_return`, `bank_statement`, `id_verification` | Type of document |
| `file_name`     | string | ✅ Yes   | Max 200 chars, must include file extension | Name of the uploaded file |

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

```
Status: 201 Created
```

```json
{
  "document_id": "doc_90589",
  "borrower_id": "br_78234",
  "document_type": "pay_stub",
  "file_name": "jane_pay_stub_march2026.pdf",
  "status": "received",
  "uploaded_at": "2026-03-09T10:00:00.000Z"
}
```

---

## Get Documents

Returns all documents registered for a specific borrower.

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
    }
  ],
  "total": 1
}
```

---

## Supported Document Types

| Type | Description |
|------|-------------|
| `pay_stub` | Recent pay stub showing current income |
| `tax_return` | Most recent annual tax return |
| `bank_statement` | Last 3 months of bank statements |
| `id_verification` | Government-issued photo ID |

---

## Related

- [Borrowers](borrowers.md)
- [Loan Applications](loan-applications.md)
- [Authentication](../authentication.md)
- [Error Handling](../errors.md)