
## Muzak-Lab App
Date, 2025/10/01
By Moses O. Oyelade

## Description
The Lab Sample Tracker is a full-stack health laboratory workflow management system designed to help lab teams efficiently track patient samples from collection to result completion.

It provides structured sample processing, role-based user access, real-time status visibility, and historical tracking for auditing and compliance. Built to support standard medical laboratory operations in hospitals, clinics, and research centers.

## Key Features
* Role-based Access
    - Collector: Can register sample
    - Technician: Can update sample processing status
    - Admin: Full access and user management (optional customization)
* Sample Lifecycle Tracking (Collected ➝ Received ➝ Processing ➝ Completed)
* Status Change History for traceability
* Dashboard Report Summary
    - Total samples
    - Completed vs Pending
    - Processing & Received counts
    - Daily collection statistics
* Filtering & Search options
* Pagination for large datasets
* Secure Authentication with JWT
* Modern UI and responsive layout

## Tech Stack
**Backend:** Django REST Framework, PostgreSQL
**Authentication:** Django SimpleJWT
**Frontend:** React.js + Tailwind CSS
**Deployment-ready:** Docker support enabled

## Setup Instructions
1. Clone the repository:
```
git clone https://github.com/Moses-Oyelade/lab-sample-tracker.git
```
2. Set up environment variables for both backend and frontend including PostgreSQL:
SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/labdb 

3. Backend setup and Install dependencies:
```
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
4. Frontend setup and Install dependencies:
```
cd frontend
npm install
npm run dev
```

## User Roles & Permissions
    Role	    Permissions
    Admin	    Manage users, view and update all samples
    Technician	Update processing → completed
    Collector	Register collected samples only

## Reports & Dashboard
- Status distribution chart
- Number of samples collected today
- Summary cards displaying activity at a glance

## Contribution
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.
