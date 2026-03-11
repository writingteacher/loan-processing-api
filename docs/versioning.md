# Versioning

The Loan Processing API uses URL-based versioning. The current version is `v1`.
```
https://loan-processing-api.onrender.com/v1/
```

---

## How Versioning Works

- All endpoints are prefixed with the version number — for example `/v1/borrowers`
- When breaking changes are introduced a new version is released — for example `/v2/borrowers`
- Previous versions remain available for a deprecation period to give integrations time to migrate
- Non-breaking changes such as new fields or new endpoints are added to the current version without a version bump

**Current version:** `v1`

---

## What Counts as a Breaking Change

| Change | Breaking? |
|--------|-----------|
| Removing an endpoint | ✅ Yes |
| Renaming a required field | ✅ Yes |
| Changing a field data type | ✅ Yes |
| Adding a new optional field | ❌ No |
| Adding a new endpoint | ❌ No |
| Fixing a bug in response data | ❌ No |

---

## Deprecation Policy

When a new version is released:

1. The old version is marked as **deprecated**
2. Developers receive advance notice via the changelog
3. The deprecated version remains available for a minimum of 6 months
4. After the deprecation period the old version is retired

---

## Related

- [Changelog](../CHANGELOG.md)
- [Endpoints](endpoints/borrowers.md)