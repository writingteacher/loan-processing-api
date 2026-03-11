# Glossary

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface. A set of rules that allows software applications to communicate with each other. |
| **Borrower** | An individual applying for a loan. In this API, a borrower profile must be created before a loan application can be submitted. |
| **Endpoint** | A specific URL where an API can be accessed. Each endpoint performs a specific action, such as creating a borrower or submitting a loan application. |
| **LTV (Loan-to-Value)** | A ratio that compares the loan amount to the property value. For example, a $350,000 loan on a $420,000 property has an LTV of 83%. Lenders use LTV to assess risk. |
| **Origination** | The process of creating a new loan, from the initial application through to funding. |
| **Underwriting** | The process by which a lender evaluates the risk of lending to a borrower. Underwriters review documents such as pay stubs, tax returns, and bank statements. |
| **REST** | Representational State Transfer. An architectural style for APIs that uses standard HTTP methods like GET, POST, PATCH, and DELETE. |
| **JSON** | JavaScript Object Notation. A lightweight data format used to send and receive data in REST APIs. |
| **Bearer Token** | A type of API authentication where a token is included in the request header to verify the caller's identity. |
| **ISO 8601** | An international standard for representing dates and times. All timestamps in this API use this format, for example: `2026-03-09T10:00:00.000Z`. The `Z` indicates UTC timezone. |
| **HTTP Status Code** | A three-digit code returned by an API to indicate the result of a request. Common codes include `200` (success), `400` (bad request), `401` (unauthorized), `404` (not found), and `500` (server error). |
| **Query Parameter** | A key-value pair appended to a URL to filter or modify a request. For example: `/v1/documents?borrower_id=br_78234`. |
| **Path Parameter** | A variable segment in a URL that identifies a specific resource. For example: `/v1/borrowers/:id` where `:id` is the path parameter. |
| **Versioning** | A strategy for managing changes to an API over time. This API uses URL versioning — for example `/v1/borrowers`. |
| **Rate Limiting** | A restriction on how many API requests can be made in a given time period. Protects the API from overuse and ensures fair access. |
| **Idempotency** | The property of an operation that produces the same result even if performed multiple times. In APIs, idempotency keys prevent duplicate records from being created. |
| **UUID** | Universally Unique Identifier. A 128-bit value used to uniquely identify records. Recommended format for idempotency keys. |
| **State Machine** | A model that defines the allowed states of a resource and the valid transitions between them. Used in this API to define valid loan status transitions. |

---

## Related

- [Authentication](authentication.md)
- [Error Handling](errors.md)
- [Versioning](versioning.md)
- [Idempotency](idempotency.md)