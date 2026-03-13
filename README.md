# Notes App

A simple and modern **Notes Management Web Application** that allows users to securely create, view, and delete personal notes.

The application includes authentication features such as login and signup, ensuring that each user's notes remain private. Users can manage their notes through a clean and responsive dashboard interface.

---

## Features

* User Signup
* User Login
* Create new notes
* View all notes
* Delete notes
* Profile section
* Responsive user interface
* Secure note storage

---

## Tech Stack

**Frontend**

* React / Next.js
* Tailwind CSS

**Backend**

* Node.js
* Express / Next.js API Routes

**Database**

* MongoDB

**Authentication**

* JWT (JSON Web Token)

**Deployment**

* Vercel

---

## Project Structure

```text id="ndf7ux"
notes-app
│
├── components
│   ├── Navbar.jsx
│   ├── NoteCard.jsx
│   ├── NoteList.jsx
│   └── ProfileCard.jsx
│
├── pages
│   ├── index.jsx
│   ├── login.jsx
│   ├── signup.jsx
│   ├── dashboard.jsx
│   └── profile.jsx
│
├── pages/api
│   ├── auth
│   ├── notes
│   └── user
│
├── models
│   ├── User.js
│   └── Note.js
│
├── lib
│   └── mongodb.js
│
├── styles
│   └── globals.css
│
├── package.json
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash id="a2f3sq"
git clone https://github.com/your-username/notes-app.git
```

### 2. Navigate to the project directory

```bash id="o3b75n"
cd notes-app
```

### 3. Install dependencies

```bash id="8kq60c"
npm install
```

### 4. Create environment variables

Create a `.env.local` file and add the following:

```env id="f5rwoc"
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5. Run the development server

```bash id="zty4az"
npm run dev
```

The application will run at:

```text id="erh8n2"
http://localhost:3000
```

---

## API Endpoints

### Authentication

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | /api/auth/signup | Register a new user |
| POST   | /api/auth/login  | Login user          |
| GET    | /api/auth/me     | Get logged-in user  |

### Notes

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /api/notes     | Create a new note |
| GET    | /api/notes     | Get all notes     |
| DELETE | /api/notes/:id | Delete a note     |

### User

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | /api/user/profile | Get user profile    |
| PUT    | /api/user/profile | Update user profile |

---

## User Interface

The application includes the following pages:

* **Signup Page** – Register a new user
* **Login Page** – Authenticate existing users
* **Dashboard** – Create and view notes
* **Profile Page** – View and manage user information

---

## Future Improvements

* Edit notes functionality
* Note categories or tags
* Dark mode support
* Search notes feature
* Rich text editor

---

## Author

**Siddharth Malik**
B.Tech Student – Bennett University
