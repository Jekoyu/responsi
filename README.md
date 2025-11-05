# Product API

Node.js REST API dengan Prisma untuk CRUD produk dan autentikasi user.

## Features

- **Authentication**: Register & Login dengan JWT
- **Product CRUD**: Create, Read, Update, Delete produk (hanya untuk user yang login)
- **Modular Architecture**: Terstruktur dengan controllers, services, middleware, dan routes
- **Database**: SQLite dengan Prisma ORM

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products (Protected - Require Authentication)
- `POST /api/products` - Create produk baru
- `GET /api/products` - Get semua produk user
- `GET /api/products/:id` - Get produk by ID
- `PUT /api/products/:id` - Update produk
- `DELETE /api/products/:id` - Delete produk

## Setup

1. Install dependencies:
```bash
npm install
```

2. Setup database:
```bash
npm run db:generate
npm run db:push
```

3. Start server:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## Usage

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Product (dengan token)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Laptop","description":"Gaming laptop","price":15000000,"stock":10}'
```