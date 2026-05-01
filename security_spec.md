# Security Specification - SRXHUB

## Data Invariants
1. A user profile (`/users/{uid}`) can only be created by the authenticated user with that UID.
2. Only the owner of a profile or a Super Admin can read/write the full user profile.
3. CRM Deals (`/crm_deals/{id}`) require authentication.
4. Admin Logs (`/admin_logs/{id}`) are append-only for authenticated users and readable only by admins.

## The Dirty Dozen (Attack Scenarios)
1. **Identity Spoofing**: Attempt to create a user profile for a different UID.
2. **Privilege Escalation**: Attempt to set `role: "Super Admin"` during registration.
3. **Ghost Fields**: Adding `isVerified: true` to a CRM deal.
4. **ID Poisoning**: Using a 2KB string as a `userId`.
5. **Orphaned Writes**: Creating a deal with a non-existent `ownerId`.
6. **Timeline Tampering**: Providing a future `joinedAt` timestamp from the client.
7. **Cross-User Snooping**: Reading another user's private phone number.
8. **Bulk Scraping**: Querying all `/users` without restrictions.
9. **Log Erasure**: Attempting to delete or update an `admin_log`.
10. **State Skipping**: Changing a CRM deal stage directly to "Closed Won" from "Lead" (if logic enforced, but here we enforce key changes).
11. **PII Leak**: Accessing email/phone without being the owner or admin.
12. **Denial of Wallet**: Spamming create with huge payload.
