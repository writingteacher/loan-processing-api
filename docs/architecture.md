# Architecture

## API Architecture

The Loan Processing API follows a standard REST architecture. All requests flow through authentication middleware before reaching the endpoint handlers.
```mermaid
flowchart TD
    Client(["Client\n(Postman / App / cURL)"])
    Auth["Authentication Middleware\nValidates Bearer token"]
    Root["GET /\nHealth Check"]
    Borrowers["Borrowers\nPOST · GET · GET :id"]
    Loans["Loan Applications\nPOST · GET · PATCH :id/status"]
    Documents["Documents\nPOST · GET"]
    Store[("In-Memory\nData Store")]

    Client -->|"All requests"| Auth
    Client -->|"No auth required"| Root
    Auth -->|"Valid key"| Borrowers
    Auth -->|"Valid key"| Loans
    Auth -->|"Valid key"| Documents
    Auth -->|"Invalid key → 401"| Client
    Borrowers <--> Store
    Loans <--> Store
    Documents <--> Store
```

---

## Data Relationships
```mermaid
erDiagram
    BORROWER {
        string borrower_id
        string first_name
        string last_name
        string email
        string status
        string created_at
    }
    LOAN_APPLICATION {
        string application_id
        string borrower_id
        number loan_amount
        number property_value
        number ltv
        string status
        string submitted_at
        string updated_at
    }
    DOCUMENT {
        string document_id
        string borrower_id
        string document_type
        string file_name
        string status
        string uploaded_at
    }

    BORROWER ||--o{ LOAN_APPLICATION : "has many"
    BORROWER ||--o{ DOCUMENT : "has many"
```

---

## Loan Status Workflow
```mermaid
stateDiagram-v2
    [*] --> submitted : POST loan application
    submitted --> under_review : PATCH status
    submitted --> rejected : PATCH status
    under_review --> approved : PATCH status
    under_review --> rejected : PATCH status
    approved --> [*]
    rejected --> [*]
```

---

## Related

- [Endpoints — Borrowers](endpoints/borrowers.md)
- [Endpoints — Loan Applications](endpoints/loan-applications.md)
- [Endpoints — Documents](endpoints/documents.md)
- [Versioning](versioning.md)