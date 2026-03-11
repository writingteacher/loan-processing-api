# Idempotency

Financial APIs must be protected against duplicate requests. Network failures, timeouts, and client retries can cause the same request to be sent multiple times — potentially creating duplicate borrowers or duplicate loan applications.

The Loan Processing API supports idempotency keys on all `POST` requests to prevent this.

---

## How It Works

Include a unique `Idempotency-Key` header with every `POST` request:
```
Idempotency-Key: a8098c1a-f86e-11da-bd1a-00112444be1e
```

If the same key is sent more than once, the API returns the original response without creating a duplicate record.

---

## Idempotency Key Rules

| Rule | Detail |
|------|--------|
| Format | Any unique string — we recommend UUID v4 |
| Max length | 255 characters |
| Expiry | Keys are stored for 24 hours |
| Scope | Keys are unique per endpoint — the same key can be used on different endpoints |

---

## Example — Safe Loan Application Retry

**First request:**
```bash
curl -X POST https://loan-processing-api.onrender.com/v1/loan-applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -H "Idempotency-Key: a8098c1a-f86e-11da-bd1a-00112444be1e" \
  -d '{"borrower_id": "br_78234", "loan_amount": 350000, "property_value": 420000}'
```

**Network failure occurs. Client retries with the same key:**
```bash
curl -X POST https://loan-processing-api.onrender.com/v1/loan-applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -H "Idempotency-Key: a8098c1a-f86e-11da-bd1a-00112444be1e" \
  -d '{"borrower_id": "br_78234", "loan_amount": 350000, "property_value": 420000}'
```

**Both requests return the same response — no duplicate created:**
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

## When to Use Idempotency Keys

- Always on `POST /v1/borrowers` — prevents duplicate borrower profiles
- Always on `POST /v1/loan-applications` — prevents duplicate loan submissions
- Always on `POST /v1/documents` — prevents duplicate document records

> **Note:** Idempotency is documented here to reflect real-world financial API design. It is not enforced in the current v1 demo but will be implemented in v2.

---

## Related

- [Authentication](authentication.md)
- [Error Handling](errors.md)
- [Endpoints](endpoints/loan-applications.md)