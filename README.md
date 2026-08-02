# FixItNow Frontend

## Project Structure
```txt
└── fix-it-now-frontend/
    ├── app/
    │   ├── global.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── auth/
    │   │   ├── layout.tsx
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── register/
    │   │   │   └── page.tsx
    │   │   ├── _components/
    │   │   │   ├── LoginForm.tsx
    │   │   │   └── RegisterForm.tsx
    │   │   └── _actions/
    │   │       └── authActions.ts
    │   ├── services/
    │   │   ├── page.tsx
    │   │   ├── _components/
    │   │   │   └── ServiceCard.tsx
    │   │   └── _actions/
    │   │       └── serviceActions.ts
    │   ├── dashboard/
    │   │   ├── layout.tsx
    │   │   ├── customer/
    │   │   │   ├── page.tsx
    │   │   │   └── bookings/
    │   │   │       └── [id]/
    │   │   │           └── pay/
    │   │   │               └── page.tsx
    │   │   ├── technician/
    │   │   │   ├── page.tsx
    │   │   │   └── bookings/
    │   │   │       └── page.tsx
    │   │   └── admin/
    │   │       ├── page.tsx
    │   │       └── categories/
    │   │           └── page.tsx
    │   └── payment/
    │       ├── success/
    │       │   └── page.tsx
    │       └── cancel/
    │           └── page.tsx
    ├── lib/
    ├── components/
    │   └── ui/
    ├── public/
    ├── docs/
    ├── types/
    ├── proxy.ts
    ├── package.json
    ├── pnpm-lock.yaml
    ├── pnpm-workspace.yaml
    ├── tsconfig.json
    ├── Readme.md
    ├── next.config.ts
    ├── next-env.d.ts
    ├── eslint.config.mjs
    ├── components.json
    ├── .gitignore
    ├── .env.example
    └── .env

```
---
---
## Routes
### Public Routes
- Home (`/`)
- Services (`/services`)
- Technician Profile (`/technicians/[id]`)
- Login (`/auth/login`)
- Register (`/auth/register`)

### Customer Routes
- Customer Dashboard (`/dashboard/customer`)
- Customer Booking Payment (`/dashboard/customer/bookings/[id]/pay`)

### Technician Routes
- Technician Dashboard (`/dashboard/technician`)
- Technician's all bookings (`/dashboard/technician/bookings`)

### Admin Routes
- Admin Dashboard (`/dashboard/admin`)
- All service categories (`/dashboard/admin/categories`)

### Shared Routes
- Payment Success (`/payment/success`)
- Payment Cancel (`/payment/cancel`)
- 404 (`/404`)

---
---

## API Integration

| Frontend Page/Route | Backend API consumption |
|----------------|-------------------------|
| Home(`/`) | `GET /api/services` |
| Services(`/services`) | `GET /api/services`, `GET /api/technicians`, `GET /api/categories` |
| Technician Profile (`/technicians/[id]`) | `GET /api/technicians/:id` |
| Login (`/auth/login`) | `POST /api/auth/login` |
| Register (`/auth/register`) | `POST /api/auth/register` |
| Customer Dashboard (`/dashboard/customer`) | `GET /api/bookings`, `GET /api/payments` |
| Customer Booking Payment (`/dashboard/customer/bookings/[id]/pay`) | `POST /api/payments/connect` |
| Technician Dashboard (`/dashboard/technician`) | `GET /api/technicians/:id`, `GET /api/technician/availability (have to build)` |
| Technician's all bookings (`/dashboard/technician/bookings`) | `GET /api/technicians/bookings`, `PATCH /api/technicians/bookings/:id` |
| Admin Dashboard (`/dashboard/admin`) | `GET /api/admin/users`, `GET /api/admin/bookings` |
| All service categories (`/dashboard/admin/categories`) | `GET /api/admin/categories`, `POST /api/admin/categories` |

---
---

## Global Architecture

### Authentication
- How will the app know if a user is logged in?
    - If there is a valid access token in browser cookie, then the user is logged in.
- Where will the user information be stored?
    - In JWT token, which will be stored in broswer cookie.

### Server State
- How will API data be fetched and cached?
    - in server component/function using fetch method and in client component using fetch also inside useEffect hook.

---
---

## Shared Layouts

### Root Layout
- Navbar
- Footer

### Auth Layout
- Center the auth forms(login/register)

### Dashboard Layout (customer/technician/admin)
- sidebar
- main content area

So here Root layouts will be appear to all routes like in auth, dashboard etc. But the navbar will be dynamic based on user login state and role.
For example:
- if user not logged in, then in navbar there will be public navlinks(home, services) in middle and login/register button on right corner.
- if user is logged in, then there will be a profile icon on the right corner and navlinks will be according to role.

### ✅ Final Layout Plan
- Root Layout
  - Navbar (dynamic)
  - Main content
  - Footer (hide on dashboard if preferred)
- Auth Layout
  - Centered auth forms
- Dashboard Layout
  - Role-based sidebar
  - Main content

---
---

## Authentication Flow

- User logs in.
- Backend validates credentials.
- Backend returns/sets authentication data.
- Frontend redirects.
- Protected routes are accessed.
- User logs out.

---
---

## Routes Protection

### Public Routes
- Home (`/`)
- Services (`/services`)
- Technician Profile (`/technicians/[id]`)
- Payment Success (`/payment/success`)
- Payment Cancel (`/payment/cancel`)
- 404 (`/404`)

### Routes Accessible Only When Logged Out
- Login (`/auth/login`)
- Register (`/auth/register`)

### Protected Routes
- Customer Dashboard (`/dashboard/customer`)
- Customer Booking Payment (`/dashboard/customer/bookings/[id]/pay`)
- Technician Dashboard (`/dashboard/technician`)
- Technician's all bookings (`/dashboard/technician/bookings`)
- Admin Dashboard (`/dashboard/admin`)
- All service categories (`/dashboard/admin/categories`)