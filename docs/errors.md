# Error Handling

All errors return a consistent JSON structure:
```json
{
  "error": "error_code",
  "message": "A human-readable description of the error."
}
```

---

## Error Codes

| Status Code | Error Code             | Meaning                       |
|-------------|------------------------|-------------------------------|
| `400`       | `invalid_request`      | Missing or invalid parameters |
| `401`       | `unauthorized`         | Missing or invalid API key    |
| `404`       | `not_found`            | Resource not found            |
| `429`       | `rate_limit_exceeded`  | Too many requests             |
| `500`       | `server_error`         | Internal server error         |

---

## 400 — Invalid Request

Returned when required fields are missing or contain invalid values.

**Single field error:**
```json
{
  "error": "invalid_request",
  "message": "first_name, last_name, and email are required."
}
```

**Multiple field errors:**
```json
{
  "error": "invalid_request",
  "message": "Validation failed.",
  "errors": [
    {
      "field": "first_name",
      "message": "first_name is required."
    },
    {
      "field": "email",
      "message": "email must be a valid email address."
    },
    {
      "field": "loan_amount",
      "message": "loan_amount must be between 1,000 and 10,000,000."
    }
  ]
}
```

---

## 401 — Unauthorized

Returned when the API key is missing or incorrect.
```json
{
  "error": "unauthorized",
  "message": "Missing or invalid API key."
}
```

---

## 404 — Not Found

Returned when the requested resource does not exist.
```json
{
  "error": "not_found",
  "message": "Borrower not found."
}
```

---

## 429 — Too Many Requests

Returned when you exceed the API rate limit.
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please wait before retrying.",
  "retry_after": 60
}
```

> See [Rate Limiting](rate-limiting.md) for limits and best practices.

---

## 500 — Server Error

Returned when an unexpected error occurs on the server.
```json
{
  "error": "server_error",
  "message": "An unexpected error occurred. Please try again later."
}
```

---

## Related

- [Authentication](authentication.md)
- [Rate Limiting](rate-limiting.md)
- [Getting Started](../GETTING_STARTED.md)