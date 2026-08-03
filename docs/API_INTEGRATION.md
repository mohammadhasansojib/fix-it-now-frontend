# API Integration

| Frontend Page                              | Backend Endpoints (Method)                                                         |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| `/dashboard/customer`                      | `GET /api/bookings`                                                                |
| `/dashboard/customer/bookings/[id]/pay`    | `GET /api/bookings/:id`<br>`POST /api/payments/checkout/:bookingId`                |
| `/dashboard/technician`                    | `GET /api/technicians/bookings`                                                    |
| `/dashboard/technician/services`           | `GET /api/services`<br>`GET /api/categories`<br>`POST /api/services`               |
| `/dashboard/technician/bookings/requested` | `GET /api/technicians/bookings`<br>`PATCH /api/technician/bookings/:bookingId`     |
| `/dashboard/admin`                         | `GET /api/admin/users`<br>`GET /api/admin/bookings`<br>`GET /api/admin/categories` |
| `/dashboard/admin/categories`              | `GET /api/admin/categories`<br>`POST /api/admin/categories`                        |
