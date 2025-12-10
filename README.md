# Pet Adoption Management System

A full-stack MERN application for managing pet adoptions. Visitors can browse pets, registered users can submit adoption applications, and admins can manage pets and review applications.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend:** React, React Router, Axios

## Features

- Browse pets with search, filter, and pagination
- User registration and authentication
- Adoption application submission
- User dashboard to track application status
- Admin dashboard for pet management (CRUD)
- Admin panel for reviewing and approving/rejecting applications
- Automatic pet status updates when applications are approved

## Demo / Preview

Watch the application demo video:

📹 **Demo Video:** [View on Google Drive](https://drive.google.com/file/d/1lxLtFn8kSEeQ3g8Ks5sJnBZCLBdljM3t/view?usp=sharing)

### Quick Preview

The demo showcases:
- Modern, responsive UI with smooth animations
- Pet browsing with search and filtering capabilities
- User authentication and registration flow
- Adoption application submission process
- Admin dashboard for pet and application management
- Real-time status updates and notifications

## Project Structure

```
pet-adoption/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── petController.js
│   │   └── applicationController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Pet.js
│   │   └── AdoptionApplication.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── pets.js
│   │   └── applications.js
│   ├── server.js
│   ├── package.json
│   └── env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pet-adoption
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Pets
- `GET /api/pets` - Get all pets (supports query params: page, limit, search, species, status, size)
- `GET /api/pets/:id` - Get single pet
- `POST /api/pets` - Create pet (admin only)
- `PUT /api/pets/:id` - Update pet (admin only)
- `DELETE /api/pets/:id` - Delete pet (admin only)

### Applications
- `POST /api/applications` - Create adoption application (protected)
- `GET /api/applications/my-applications` - Get user's applications (protected)
- `GET /api/applications` - Get all applications (admin only)
- `PUT /api/applications/:id/status` - Update application status (admin only)

## User Roles

- **Visitor:** Can browse pets without authentication
- **User:** Can browse pets and submit adoption applications
- **Admin:** Full access including pet management and application reviews

## Seeding the Database

### Seed Pet Data

To populate the database with dummy pet data, run the seed script:

```bash
cd backend
npm run seed
```

This will add 18 sample pets to the database (dogs, cats, birds, and rabbits).

### Seed Admin User

To create an admin user with default credentials:

```bash
cd backend
npm run seed:admin
```

**Default Admin Credentials:**
- Email: `admin@petadoption.com`
- Password: `admin123`

You can use these credentials to log in and access the admin dashboard. The script will create the admin user if it doesn't exist, or update it if it already exists.

## Features in Detail

### Pet Browsing
- Search by name, breed, or description
- Filter by species, size, and status
- Pagination for large datasets
- Responsive grid layout

### Adoption Workflow
1. User browses available pets
2. User submits an application with optional message
3. Admin reviews the application
4. When approved, pet status changes to "adopted" and other pending applications are automatically rejected
5. User can track application status in their dashboard

### Admin Dashboard
- View and manage all pets (CRUD operations)
- Review pending applications
- Approve or reject applications
- Automatic status management

## Development Notes

- JWT tokens are stored in localStorage on the frontend
- Protected routes require authentication
- Admin routes require both authentication and admin role
- Pet status automatically updates when applications are approved/rejected
- Duplicate applications for the same pet by the same user are prevented
