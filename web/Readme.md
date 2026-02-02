🥗 Healthy Food EC Web Platform
Overview

Healthy Food EC Web is a production-ready e-commerce platform designed for online food ordering and content-driven product management.
The system is built with a modular monolith architecture, focusing on clear domain boundaries, data consistency, security, and scalability.

The platform supports end-to-end e-commerce workflows, including product browsing, cart management, checkout, payment processing, order lifecycle management, and administrative content operations.

This project emphasizes clean architecture, predictable state management, secure backend workflows, and performance-oriented data access.

Tech Stack
Frontend

React 18

TypeScript

React Query

Axios

Context API

TailwindCSS

Quill (Rich Text Editor)

Yup (schema-based validation)

Backend

Node.js

GraphQL

MongoDB

JWT Authentication

RBAC (Role-Based Access Control)

bcrypt (password hashing)

Nodemailer

Infrastructure & Tooling

Docker

Swagger / OpenAPI

Postman

Stripe (Test Mode)

Architecture Overview
1. Modular Monolith Design

The system follows a modular monolith architecture, where the application is deployed as a single service but internally structured into well-defined domains.

Key domains include:

Authentication & Authorization

Users

Products

Orders

Payments

Content & Promotions

Inventory

Each domain encapsulates:

Data models

Business rules

Validation logic

API contracts

This approach avoids premature microservices while maintaining strong separation of concerns and long-term scalability.

2. Frontend Architecture
Container–Presentation Pattern

The frontend adopts a container–presentation architecture:

Container components

Handle data fetching, mutations, and orchestration

Interact with APIs and global state

Presentation components

Pure UI

Stateless where possible

Easy to reuse and test

This separation improves:

Maintainability

Testability

UI consistency

Custom Hooks & Service Layers

Business logic is extracted into:

Custom React hooks (useProducts, useOrders, useCheckout, etc.)

Service layers responsible for API communication

Benefits:

Reusable logic across pages

Predictable side effects

Cleaner component trees

State Management Strategy

React Query

Server state management

Caching, background refetching

Optimistic updates for mutations

Context API

Auth state

User session

Global UI state

This hybrid approach avoids Redux boilerplate while ensuring deterministic client-side behavior.

3. Backend Architecture
GraphQL API Design

The backend exposes a GraphQL API, allowing:

Fine-grained data fetching

Reduced over-fetching

Clear separation between queries and mutations

Resolvers are organized by domain and enforce:

Authentication checks

Authorization rules

Input validation

Authentication & Authorization

JWT-based authentication

bcrypt for password hashing

RBAC enforced at resolver level

User roles:

Admin

Staff

Customer

Access control is centralized and applied consistently across:

API resolvers

Admin dashboard features

Content management workflows

Input Validation & Security

Centralized input validation

Schema-based sanitization

Defensive checks before persistence

This prevents:

Invalid state transitions

Injection attacks

Corrupted domain data

4. Payment & Order Workflow
Stripe Integration

Integrated Stripe Checkout (test mode)

Server-side verification of payment intent

Secure handling of payment metadata

Order Lifecycle

Cart creation

Checkout initiation

Stripe payment session

Payment confirmation

Order persistence

Email notification

All steps are fully automated, eliminating manual intervention.

Email Notifications

Nodemailer used for transactional emails

Order confirmation

Payment status updates

Emails are triggered only after verified payment success, ensuring consistency.

5. Admin Dashboard

The admin dashboard supports full CRUD operations for:

Products

Orders

Promotions

Content pages

Rich Text Content Management

Integrated Quill editor

Schema validation via Yup

Supports complex structured content

This enables non-technical users to manage:

Product descriptions

Promotional pages

Informational content

6. Search, Filtering & Pagination

Server-side pagination

Filterable queries

Optimized query parameters

These features improve:

Performance for large datasets

User browsing experience

Admin productivity

7. SEO & UX Optimization

SEO best practices applied:

Semantic HTML

Structured URLs

Meta tags

Crawl-friendly page hierarchy

UX considerations:

Clear browsing flow

Optimized checkout experience

Predictable navigation patterns

8. Tree-Based Algorithms

Tree-based data structures are used for:

Content moderation workflows

Inventory indexing

Benefits:

Faster lookup operations

Clear parent–child relationships

Easier lifecycle management for nested data

9. Containerization & API Validation

Backend services containerized using Docker

APIs documented and tested via:

Swagger / OpenAPI

Postman

This ensures:

Environment consistency

Reliable onboarding

Easier future deployment

Testing & Validation

End-to-end workflow validation

Payment flow testing using Stripe test mode

Manual verification of edge cases:

Duplicate payments

Order consistency

Authorization boundaries

Outcome

Processed 100+ Stripe test orders

Zero duplicate or inconsistent payments

Fully automated:

Order creation

Payment handling

Email notifications

Stable performance under realistic usage scenarios

Key Engineering Takeaways

Modular monoliths scale well when domain boundaries are respected

React Query significantly simplifies server-state management

Centralized validation is critical for data integrity

Automation reduces operational risk in payment-heavy systems

Architecture matters more than framework choice

Future Improvements

Introduce background job processing (queues)

Add automated test suites

Expand inventory forecasting logic

Progressive migration to microservices if needed

Author

Nguyen Bui Nhut Y
Full-stack Software Engineer (Frontend-focused)
GitHub: https://github.com/NguyenNhutY