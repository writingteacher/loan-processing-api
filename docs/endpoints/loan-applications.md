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