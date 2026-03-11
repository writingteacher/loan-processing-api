# Authentication

All requests except the root endpoint require a valid API key in the authorization header.
```
Authorization: Bearer YOUR_API_KEY
```

If the API key is missing or invalid, the API returns a `401 Unauthorized` response:
```json
{
  "error": "unauthorized",
  "message": "Missing or invalid API key."
}
```

---

## Test Credentials

Use this key to authenticate all requests:
```
Authorization: Bearer test_key_loanapi_2026
```

> **Note:** This is a test key for portfolio demonstration purposes only.

---

## Key Format

- API keys are case-sensitive
- Keys must be prefixed with `Bearer` followed by a single space
- Keys are passed in the `Authorization` header on every request

---

## Related

- [Getting Started](../GETTING_STARTED.md)
- [Rate Limiting](rate-limiting.md)
- [Error Handling](errors.md)