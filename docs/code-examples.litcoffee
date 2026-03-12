# Code Examples

Every endpoint shown in three languages — cURL, Python, and JavaScript.

---

## Authentication

All examples use the test API key. Replace `test_key_loanapi_2026` with your own key in production.

---

## Root — Health Check

**cURL**
```bash
curl https://loan-processing-api.onrender.com/
```

**Python**
```python
import requests

response = requests.get("https://loan-processing-api.onrender.com/")
print(response.json())
```

**JavaScript (fetch)**
```javascript
const response = await fetch("https://loan-processing-api.onrender.com/");
const data = await response.json();
console.log(data);
```

---

## Create Borrower

**cURL**
```bash
curl -X POST https://loan-processing-api.onrender.com/v1/borrowers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"first_name": "Jane", "last_name": "Smith", "email": "jane@example.com"}'
```

**Python**
```python
import requests

url = "https://loan-processing-api.onrender.com/v1/borrowers"
headers = {
    "Authorization": "Bearer test_key_loanapi_2026",
    "Content-Type": "application/json"
}
payload = {
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@example.com"
}

response = requests.post(url, json=payload, headers=headers)
borrower = response.json()
print(borrower["borrower_id"])
```

**JavaScript (fetch)**
```javascript
const response = await fetch("https://loan-processing-api.onrender.com/v1/borrowers", {
  method: "POST",
  headers: {
    "Authorization": "Bearer test_key_loanapi_2026",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    first_name: "Jane",
    last_name: "Smith",
    email: "jane@example.com"
  })
});

const borrower = await response.json();
console.log(borrower.borrower_id);
```

---

## Get All Borrowers

**cURL**
```bash
curl "https://loan-processing-api.onrender.com/v1/borrowers?limit=10&offset=0" \
  -H "Authorization: Bearer test_key_loanapi_2026"
```

**Python**
```python
import requests

url = "https://loan-processing-api.onrender.com/v1/borrowers"
headers = {"Authorization": "Bearer test_key_loanapi_2026"}
params = {"limit": 10, "offset": 0}

response = requests.get(url, headers=headers, params=params)
data = response.json()
print(f"Total borrowers: {data['total']}")
```

**JavaScript (fetch)**
```javascript
const response = await fetch(
  "https://loan-processing-api.onrender.com/v1/borrowers?limit=10&offset=0",
  {
    headers: {
      "Authorization": "Bearer test_key_loanapi_2026"
    }
  }
);

const data = await response.json();
console.log(`Total borrowers: ${data.total}`);
```

---

## Get Single Borrower

**cURL**
```bash
curl https://loan-processing-api.onrender.com/v1/borrowers/br_78234 \
  -H "Authorization: Bearer test_key_loanapi_2026"
```

**Python**
```python
import requests

borrower_id = "br_78234"
url = f"https://loan-processing-api.onrender.com/v1/borrowers/{borrower_id}"
headers = {"Authorization": "Bearer test_key_loanapi_2026"}

response = requests.get(url, headers=headers)
print(response.json())
```

**JavaScript (fetch)**
```javascript
const borrowerId = "br_78234";
const response = await fetch(
  `https://loan-processing-api.onrender.com/v1/borrowers/${borrowerId}`,
  {
    headers: {
      "Authorization": "Bearer test_key_loanapi_2026"
    }
  }
);

const borrower = await response.json();
console.log(borrower);
```

---

## Submit Loan Application

**cURL**
```bash
curl -X POST https://loan-processing-api.onrender.com/v1/loan-applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"borrower_id": "br_78234", "loan_amount": 350000, "property_value": 420000}'
```

**Python**
```python
import requests

url = "https://loan-processing-api.onrender.com/v1/loan-applications"
headers = {
    "Authorization": "Bearer test_key_loanapi_2026",
    "Content-Type": "application/json"
}
payload = {
    "borrower_id": "br_78234",
    "loan_amount": 350000,
    "property_value": 420000
}

response = requests.post(url, json=payload, headers=headers)
application = response.json()
print(f"Application ID: {application['application_id']}")
print(f"LTV: {application['ltv']}%")
```

**JavaScript (fetch)**
```javascript
const response = await fetch("https://loan-processing-api.onrender.com/v1/loan-applications", {
  method: "POST",
  headers: {
    "Authorization": "Bearer test_key_loanapi_2026",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    borrower_id: "br_78234",
    loan_amount: 350000,
    property_value: 420000
  })
});

const application = await response.json();
console.log(`Application ID: ${application.application_id}`);
console.log(`LTV: ${application.ltv}%`);
```

---

## Get All Loan Applications

**cURL**
```bash
curl "https://loan-processing-api.onrender.com/v1/loan-applications?limit=10&offset=0" \
  -H "Authorization: Bearer test_key_loanapi_2026"
```

**Python**
```python
import requests

url = "https://loan-processing-api.onrender.com/v1/loan-applications"
headers = {"Authorization": "Bearer test_key_loanapi_2026"}
params = {"limit": 10, "offset": 0}

response = requests.get(url, headers=headers, params=params)
data = response.json()
print(f"Total applications: {data['total']}")
```

**JavaScript (fetch)**
```javascript
const response = await fetch(
  "https://loan-processing-api.onrender.com/v1/loan-applications?limit=10&offset=0",
  {
    headers: {
      "Authorization": "Bearer test_key_loanapi_2026"
    }
  }
);

const data = await response.json();
console.log(`Total applications: ${data.total}`);
```

---

## Update Loan Status

**cURL**
```bash
curl -X PATCH https://loan-processing-api.onrender.com/v1/loan-applications/app_90821/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"status": "approved"}'
```

**Python**
```python
import requests

application_id = "app_90821"
url = f"https://loan-processing-api.onrender.com/v1/loan-applications/{application_id}/status"
headers = {
    "Authorization": "Bearer test_key_loanapi_2026",
    "Content-Type": "application/json"
}
payload = {"status": "approved"}

response = requests.patch(url, json=payload, headers=headers)
application = response.json()
print(f"New status: {application['status']}")
```

**JavaScript (fetch)**
```javascript
const applicationId = "app_90821";
const response = await fetch(
  `https://loan-processing-api.onrender.com/v1/loan-applications/${applicationId}/status`,
  {
    method: "PATCH",
    headers: {
      "Authorization": "Bearer test_key_loanapi_2026",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status: "approved" })
  }
);

const application = await response.json();
console.log(`New status: ${application.status}`);
```

---

## Register Document

**cURL**
```bash
curl -X POST https://loan-processing-api.onrender.com/v1/documents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test_key_loanapi_2026" \
  -d '{"borrower_id": "br_78234", "document_type": "pay_stub", "file_name": "jane_pay_stub_march2026.pdf"}'
```

**Python**
```python
import requests

url = "https://loan-processing-api.onrender.com/v1/documents"
headers = {
    "Authorization": "Bearer test_key_loanapi_2026",
    "Content-Type": "application/json"
}
payload = {
    "borrower_id": "br_78234",
    "document_type": "pay_stub",
    "file_name": "jane_pay_stub_march2026.pdf"
}

response = requests.post(url, json=payload, headers=headers)
document = response.json()
print(f"Document ID: {document['document_id']}")
```

**JavaScript (fetch)**
```javascript
const response = await fetch("https://loan-processing-api.onrender.com/v1/documents", {
  method: "POST",
  headers: {
    "Authorization": "Bearer test_key_loanapi_2026",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    borrower_id: "br_78234",
    document_type: "pay_stub",
    file_name: "jane_pay_stub_march2026.pdf"
  })
});

const document = await response.json();
console.log(`Document ID: ${document.document_id}`);
```

---

## Get Documents

**cURL**
```bash
curl "https://loan-processing-api.onrender.com/v1/documents?borrower_id=br_78234" \
  -H "Authorization: Bearer test_key_loanapi_2026"
```

**Python**
```python
import requests

url = "https://loan-processing-api.onrender.com/v1/documents"
headers = {"Authorization": "Bearer test_key_loanapi_2026"}
params = {"borrower_id": "br_78234"}

response = requests.get(url, headers=headers, params=params)
data = response.json()
print(f"Total documents: {data['total']}")
```

**JavaScript (fetch)**
```javascript
const response = await fetch(
  "https://loan-processing-api.onrender.com/v1/documents?borrower_id=br_78234",
  {
    headers: {
      "Authorization": "Bearer test_key_loanapi_2026"
    }
  }
);

const data = await response.json();
console.log(`Total documents: ${data.total}`);
```

---

## Related

- [Getting Started](../GETTING_STARTED.md)
- [Endpoints — Borrowers](endpoints/borrowers.md)
- [Endpoints — Loan Applications](endpoints/loan-applications.md)
- [Endpoints — Documents](endpoints/documents.md)