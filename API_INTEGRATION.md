# API Integration

This document describes how the RentNest frontend integrates with the backend REST API.

## Base URL

The frontend communicates with the backend using:

`BACKEND_API_URL`

---

## Authentication

Authentication is handled using JWT-based authentication and HTTP cookies.

Protected API requests require an authenticated user.

---

## Public APIs

| Frontend Function | Method | Endpoint | Purpose |
|---|---|---|---|
| `getAllPublicProperties` | GET | `/api/properties` | Fetch, search, filter and paginate available properties |
| `getCategories` | GET | `/api/properties/categories` | Fetch property categories |
| `getSingleProperty` | GET | `/api/properties/:id` | Fetch property details |
| `sendBookingRequests` | POST | `/api/rentals` | Send a rental request |

---

## Landlord APIs

| Frontend Function | Method | Endpoint | Purpose |
|---|---|---|---|
| `createProperty` | POST | `/api/landlord/properties` | Create a property |
| `updateProperty` | PUT | `/api/landlord/properties/:id` | Update a property |
| `getLandlordProperties` | GET | `/api/landlord/landlord-properties` | Fetch landlord's properties |
| `rentalRequestAction` | PATCH | `/api/landlord/requests/:id` | Approve or reject rental request |
| `getRentalRequests` | GET | `/api/landlord/requests` | Fetch landlord rental requests |

---

## Tenant APIs

| Frontend Function | Method | Endpoint | Purpose |
|---|---|---|---|
| `getTenantPayments` | GET | `/api/payments` | Fetch tenant payment history |
| `getTenantReviews` | GET | `/api/reviews` | Fetch tenant reviews |
| `getTenantRentalRequest` | GET | `/api/rentals/:id` | Fetch rental request details |
| `initiatePayment` | POST | `/api/payments/create` | Create Stripe Checkout session |
| `getTenantPaymentInfo` | GET | `/api/payments/:session_id` | Fetch payment information |

---

## Admin APIs

| Frontend Function | Method | Endpoint | Purpose |
|---|---|---|---|
| `getUsersInformation` | GET | `/api/admin/users` | Fetch users |
| `banUnbanUser` | PATCH | `/api/admin/users/:userId` | Ban or unban user |
| `getAdminRentalRequests` | GET | `/api/admin/rentals` | Fetch rental requests |
| `getAdminProperties` | GET | `/api/admin/properties` | Fetch properties |

---

## Error Handling

API errors are handled through:

- Toast notifications
- Inline error messages
- Loading states
- Error states
- Form validation
- Authentication redirects

---

## Payment Integration

The frontend integrates with Stripe Checkout.

```text
Tenant
   ↓
Initiate Payment
   ↓
Create Stripe Checkout Session
   ↓
Stripe Checkout
   ↓
Success / Cancel
   ↓
Payment Result Page