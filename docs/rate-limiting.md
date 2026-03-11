# Rate Limiting

The Loan Processing API limits the number of requests you can make in a given time period to ensure stability and fair usage across all integrations.

---

## Default Limits

| Plan  | Requests per minute | Requests per day |
|-------|---------------------|------------------|
| Free  | 30                  | 1,000            |
| Pro   | 100                 | 10,000           |

> **Note:** This is a portfolio demonstration API. Rate limiting is documented here to reflect real-world API design but is not enforced in the current version.

---

## Rate Limit Headers

Every API response includes headers that show your current usage:

| Header                  | Description                          |
|-------------------------|--------------------------------------|
| `X-RateLimit-Limit`     | Maximum requests allowed per minute  |
| `X-RateLimit-Remaining` | Requests remaining in current window |
| `X-RateLimit-Reset`     | Unix timestamp when the limit resets |

---

## Exceeded Rate Limit

If you exceed the rate limit the API returns a `429 Too Many Requests` response:
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please wait before retrying.",
  "retry_after": 60
}
```

The `retry_after` field tells you how many seconds to wait before making another request.

---

## Best Practices

- Cache responses where possible to reduce API calls
- Implement exponential backoff when retrying failed requests
- Monitor your `X-RateLimit-Remaining` header to avoid hitting limits
- Contact support to upgrade your plan if you need higher limits

---

## Related

- [Error Handling](errors.md)
- [Authentication](authentication.md)
- [Support](../README.md#support)