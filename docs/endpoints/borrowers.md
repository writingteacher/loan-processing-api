# Borrowers

Borrower endpoints manage the profiles of individuals applying for loans. A borrower profile must exist before a loan application can be submitted.

---

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/borrowers` | Create a borrower |
| `GET` | `/v1/borrowers` | List all borrowers |
| `GET` | `/v1/borrowers/:id` | Get a single borrower |

---

## Create Borrower

Creates a new borrower profile in the loan processing system.
```
POST /v1/borrowers
```

**Request Body**

| Field        | Type   | Required | Constraints | Description              |
|--------------|--------|----------|-------------|--------------------------|
| `first_name` | string | ✅ Yes   | Max 50 chars | Borrower's first name   |
| `last_name`  | string | ✅ Yes   | Max 50 chars | Borrower's last name    |
| `email`      | string | ✅ Yes   | Valid email format, max 100 chars | Borrower's email address |

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

---

## Get All Borrowers

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
```
Status: 200 OK
```
```json
{
  "borrowers": [
    {
      "borrower_id": "br_78234",
      "first_name": "Jane",
      "last_name": "Smith",
      "email": "jane@example.com",
      "status": "created",
      "created_at": "2026-03-09T10:00:00.000Z"
    }
  ],
  "total": 1
}
```

---

## Get Single Borrower

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
```
Status: 200 OK
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

---

## Related

- [Loan Applications](loan-applications.md)
- [Documents](documents.md)
- [Authentication](../authentication.md)
- [Error Handling](../errors.md)