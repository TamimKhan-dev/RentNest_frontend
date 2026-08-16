# 🏡 RentNest — Property Rental Platform

RentNest is a full-stack property rental platform that connects tenants with landlords through a secure and user-friendly rental experience.

The platform allows users to explore available properties, search and filter listings, send rental requests, complete payments through Stripe, manage rentals, and leave reviews after completing a rental.

---

## 🌐 Live Website

**Live URL:** https://your-vercel-domain.vercel.app
**BACKEND API URL:** https://rentnest-coral.vercel.app 
**BACKEND Repository URL:** https://github.com/TamimKhan-dev/RentNest.git

---

# ✨ Features

## 🔐 Authentication

- User registration and login
- JWT-based authentication
- Role-based access control
- Protected dashboard routes
- Persistent authentication using cookies
- Automatic role-based dashboard redirection

### User Roles

- 👨‍💼 Admin
- 🏠 Landlord
- 🧑‍💼 Tenant

---

## 🏠 Property Discovery

Public users can:

- Browse available properties
- View detailed property information
- Search properties by location
- Filter properties by:
  - Property type
  - Price range
  - Amenities
- Sort property listings
- Navigate through paginated results
- View featured properties on the homepage

---

## 📋 Rental Requests

Tenants can:

- Send rental requests to landlords
- View their rental requests
- Track rental status
- Complete active rentals

The frontend handles appropriate feedback when:

- The user is not authenticated
- A rental request already exists
- A property is unavailable
- The request fails

---

## 💳 Stripe Payment

RentNest integrates Stripe Checkout for real payment processing.

The frontend provides:

- Payment initiation
- Stripe Checkout redirection
- Payment success page
- Payment cancellation page
- Payment status handling
- Payment history
- Individual payment details

---

## ⭐ Reviews

Tenants can:

- Submit reviews after completing a rental
- View previously submitted reviews
- Edit reviews
- Delete reviews
- Prevent duplicate reviews for the same property

---

## 👤 Tenant Dashboard

Tenants can manage:

- Rental requests
- Payment history
- Reviews
- Profile information

---

## 🏠 Landlord Dashboard

Landlords can:

- Create properties
- Update properties
- Delete properties
- View their listed properties
- Manage rental requests
- Approve or reject rental requests

---

## 🛡️ Admin Dashboard

Administrators can:

- View platform statistics
- Manage users
- Search users
- Filter users by role
- Paginate users
- Ban users
- Unban users

---

# 🔎 Advanced Search & Filtering

The property discovery page provides real-time search and filtering.

Available filters include:

- 📍 Location
- 💰 Minimum price
- 💰 Maximum price
- 🏠 Property type
- 🛋️ Amenities

Search inputs use debouncing to prevent unnecessary API requests while the user is typing.

Pagination is also implemented to improve performance and usability when browsing large numbers of properties.

---

# 🧩 API Integration

The frontend consumes the backend REST API for authentication, properties, rental requests, payments, reviews, users, and dashboard functionality.

A detailed mapping of frontend features to backend endpoints is available in:

```text
API_INTEGRATION.md