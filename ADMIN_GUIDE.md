# Admin Guide

## Admin Features Overview

All admin functionality is fully implemented and ready to use. Here's what you can do as an admin:

### 1. Add/Edit/Delete Pets ✅

**Location:** Admin Dashboard → "Manage Pets" tab

- **Add Pet:** Click "Add New Pet" button to create a new pet entry
- **Edit Pet:** Click "Edit" button on any pet card to modify pet details
- **Delete Pet:** Click "Delete" button on any pet card to remove a pet

**Fields Available:**
- Name, Species, Breed, Age, Gender, Size
- Description, Location, Image URL
- Status (automatically managed, but can be updated manually via edit)

### 2. View All Adoption Applications ✅

**Location:** Admin Dashboard → "Applications" tab

- View all adoption applications from all users
- See applicant details (name, email)
- View application messages and submission dates
- See current application status (pending, approved, rejected)

### 3. Approve or Reject Applications ✅

**Location:** Admin Dashboard → "Applications" tab

- For pending applications, you'll see "Approve" and "Reject" buttons
- Click "Approve" to approve an adoption application
- Click "Reject" to reject an adoption application
- Once processed, buttons disappear as applications can't be changed again

### 4. Automatic Pet Status Updates ✅

**How it works:**
- When you approve an application, the pet's status automatically changes to "adopted"
- All other pending applications for the same pet are automatically rejected
- This ensures only one person can adopt each pet
- You can still manually update pet status by editing the pet

**Manual Status Update:**
- Go to "Manage Pets" tab
- Click "Edit" on any pet
- The status field can be updated if needed (available, pending, adopted)

## Accessing Admin Dashboard

1. Log in with admin credentials:
   - Email: `admin@petadoption.com`
   - Password: `admin123`

2. After login, you'll be automatically redirected to the admin dashboard

3. Or navigate to `/admin` route directly (will redirect if not admin)

## Creating Admin User

If you need to create an admin user:

```bash
cd backend
npm run seed:admin
```

This creates/updates the default admin user with the credentials above.

## API Endpoints for Admin

All admin endpoints require authentication + admin role:

- `POST /api/pets` - Create pet
- `PUT /api/pets/:id` - Update pet
- `DELETE /api/pets/:id` - Delete pet
- `GET /api/applications` - Get all applications
- `PUT /api/applications/:id/status` - Update application status

## Security

- All admin routes are protected by JWT authentication
- Role-based access control ensures only admins can access admin features
- Password is hashed using bcrypt
- JWT tokens expire after 7 days (configurable)

## Notes

- Pet status updates automatically when applications are approved - this is the default behavior
- You can manually override status by editing the pet
- Once an application is approved/rejected, it cannot be changed
- Deleting a pet will not automatically cancel related applications (they will show as orphaned)

