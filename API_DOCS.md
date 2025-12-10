# API Documentation

Base URL: `http://localhost:5000/api`

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Authentication Endpoints

### Register
- **POST** `/auth/register`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- Response: `{ success, token, user }`

### Login
- **POST** `/auth/login`
- Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- Response: `{ success, token, user }`

### Get Current User
- **GET** `/auth/me`
- Protected: Yes
- Response: `{ success, user }`

## Pet Endpoints

### Get All Pets
- **GET** `/pets`
- Query params: `page`, `limit`, `search`, `species`, `status`, `size`
- Example: `/pets?page=1&limit=12&species=Dog&status=available`
- Response: `{ success, pets[], pagination }`

### Get Single Pet
- **GET** `/pets/:id`
- Response: `{ success, pet }`

### Create Pet
- **POST** `/pets`
- Protected: Yes (Admin only)
- Body:
```json
{
  "name": "Buddy",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 3,
  "gender": "Male",
  "size": "Large",
  "description": "Friendly dog",
  "location": "New York",
  "image": "https://example.com/image.jpg"
}
```

### Update Pet
- **PUT** `/pets/:id`
- Protected: Yes (Admin only)
- Body: Same as create (all fields optional)

### Delete Pet
- **DELETE** `/pets/:id`
- Protected: Yes (Admin only)

## Application Endpoints

### Create Application
- **POST** `/applications`
- Protected: Yes
- Body:
```json
{
  "petId": "pet_id_here",
  "message": "I would love to adopt this pet"
}
```

### Get My Applications
- **GET** `/applications/my-applications`
- Protected: Yes
- Response: `{ success, applications[] }`

### Get All Applications
- **GET** `/applications`
- Protected: Yes (Admin only)
- Query params: `page`, `limit`, `status`
- Response: `{ success, applications[], pagination }`

### Update Application Status
- **PUT** `/applications/:id/status`
- Protected: Yes (Admin only)
- Body:
```json
{
  "status": "approved" // or "rejected"
}
```

## Response Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

