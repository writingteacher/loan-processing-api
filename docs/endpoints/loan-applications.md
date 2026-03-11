# Loan Applications

Loan application endpoints manage the submission and status tracking of loan requests. A borrower profile must exist before a loan application can be submitted.

---

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/loan-applications` | Submit a loan application |
| `GET` | `/v1/loan-applications` | List all loan applications |
| `PATCH` | `/v1/loan-applications/:id/status` | Update loan status |

---

## Submit Loan Application

Creates a new loan application linked to an existing borrower.

```
POST /v1/loan-applications
```

**Request Body**

| Field            | Type   | Required | Constraints | Description                     |
|------------------|--------|----------|-------------|---------------------------------|
| `borrower_id`    | string | ✅ Yes   | Must be a valid existing borrower ID | ID of an existing borrower |
| `loan_amount`    | number | ✅ Yes   | Min: 1,000 — Max: 10,000,000 | Requested loan amount in USD |
| `property_value` | number | ✅ Yes   | Min: 1,000 — Max: 50,000,000 | Estimated property value in USD |

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

```
Status: 201 Created
```

```json
{
  "application_id": "app_90821",
  "borrower_id": "br_78234",
  "loan_amount": 350000,
  "property_value": 420000,
  "status": "submitted",
  "submitted_at": "2026-03-09T10:05:00.000Z"
}
```

---

## Get All Loan Applications

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
      "status": "submitted",
      "submitted_at": "2026-03-09T10:05:00.000Z"
    }
  ],
  "total": 1
}
```

---

## Update Loan Status

Updates the status of an existing loan application.

```
PATCH /v1/loan-applications/:application_id/status
```

**Path Parameter**

| Parameter        | Description                               |
|------------------|-------------------------------------------|
| `application_id` | The `application_id` returned on creation |

**Request Body**

| Field    | Type   | Required | Constraints | Description |
|----------|--------|----------|-------------|-------------|
| `status` | string | ✅ Yes   | Must be one of the accepted values | Accepted values: `submitted`, `under_review`, `approved`, `rejected` |

**Allowed Status Transitions**

Not all status changes are permitted. The following table defines the valid transitions:

| Current Status | Allowed Next Status |
|----------------|---------------------|
| `submitted`    | `under_review`, `rejected` |
| `under_review` | `approved`, `rejected` |
| `approved`     | No further transitions allowed |
| `rejected`     | No further transitions allowed |

> **Note:** A loan cannot move backwards in the workflow. For example, a `rejected` application cannot be moved back to `under_review`. A new application must be submitted.

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

```
Status: 200 OK
```

```json
{
  "application_id": "app_90821",
  "borrower_id": "br_78234",
  "loan_amount": 350000,
  "property_value": 420000,
  "status": "approved",
  "submitted_at": "2026-03-09T10:05:00.000Z",
  "updated_at": "2026-03-09T10:33:01.000Z"
}
```

---

## Related

- [Borrowers](borrowers.md)
- [Documents](documents.md)
- [Authentication](../authentication.md)
- [Error Handling](../errors.md)
- [Idempotency](../idempotency.md)