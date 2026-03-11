# Authentication

All requests except the root endpoint require a valid API key in the authorization header.

---

## How to Authenticate

Include your API key in the `Authorization` header of every request:
```
Authorization: Bearer YOUR_API_KEY
```

**Example:**
```bash
curl https://loan-processing-api.onrender.com/v1/borrowers \
  -H "Authorization: Bearer test_key_loanapi_2026"
```

---

## Test Credentials

Use this key to authenticate all requests:
```
Authorization: Bearer test_key_loanapi_2026
```

> **Note:** This is a test key for portfolio demonstration purposes only. In a production API, each client receives a unique API key.

---

## Key Format Rules

| Rule | Detail |
|------|--------|
| Case sensitive | `test_key_loanapi_2026` is valid — `TEST_KEY_LOANAPI_2026` is not |
| Bearer prefix | Must include `Bearer` followed by a single space |
| Header name | Must use `Authorization` — any other header name will fail |
| Where to send | Header only — never in the URL or request body |

---

## Unauthenticated Requests

If the API key is missing or invalid the API returns `401 Unauthorized`:
```json
{
  "error": "unauthorized",
  "message": "Missing or invalid API key."
}
```

The root endpoint `GET /` does not require authentication.

---

## Key Rotation

In a production API, API keys should be rotated regularly to reduce security risk. Best practices:

- Rotate keys every 90 days
- Immediately rotate a key if it is accidentally exposed — for example committed to a public GitHub repo
- Never hardcode API keys in client-side code
- Store keys in environment variables or a secrets manager

> **Note:** Key rotation is documented here to reflect real-world API security practices. It is not enforced in the current v1 demo.

---

## In a Production API

Production API key management would include:

| Feature | Description |
|---------|-------------|
| Multiple keys per client | Issue separate keys for development, staging, and production |
| Key expiry | Keys expire after a set period and must be renewed |
| Key revocation | Instantly revoke a compromised key without affecting other keys |
| Scoped permissions | Restrict keys to specific endpoints or actions |
| Audit logging | Track which key made which request and when |

---

## Related

- [Getting Started](../GETTING_STARTED.md)
- [Rate Limiting](rate-limiting.md)
- [Error Handling](errors.md)