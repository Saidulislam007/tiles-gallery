# 🧱 Tiles Gallery Website

A modern and responsive Tiles Gallery web application built with **Next.js**, showcasing different types of tiles with authentication, search, and detailed product views.

---


## 📌 Project Purpose

This project is designed to help users explore and discover different types of tiles (ceramic, marble, wooden, etc.) in an interactive and visually appealing gallery format. It includes authentication, profile management, and a full tile browsing experience.

---

## 🚀 Key Features

- 🔐 User Authentication (Email & Google Login)
- 🏠 Home Page with Featured Tiles
- 🖼️ All Tiles Gallery with Search Functionality
- 🔍 Single Tile Details Page
- 👤 My Profile Page (View & Update User Info)
- ✏️ Update Profile (Name & Image URL)
- 📱 Fully Responsive (Mobile, Tablet, Desktop)
- ⚡ Loader on Data Fetching
- ❌ Custom 404 Not Found Page
- 🔒 Protected Routes (Private Pages)
- ☁️ Environment Variables for Security
- 🎨 Unique Modern UI Design

---

## 🧰 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + HeroUI / DaisyUI
- **Authentication:** BetterAuth (MongoDB Adapter)
- **State/Data:** JSON Server (Mock API)
- **Deployment:** Vercel / Render

---

## 📦 NPM Packages Used

- `next`
- `react`
- `tailwindcss`
- `@heroui/react`
- `better-auth`
- `axios`
- `json-server`
- `animate.css` *(for UI animation)*

---

## 📂 Project Routes

### Public Routes
- `/` → Home Page
- `/all-tiles` → Tiles Gallery
- `/login` → Login Page
- `/register` → Registration Page

### Private Routes
- `/tile/[id]` → Tile Details Page
- `/my-profile` → User Profile Page

---

## 🔐 Authentication Flow

### Login Page
- Email + Password Login
- Google Sign-In Button
- Redirects to Home on success
- Error toast on failure
- Link to Register Page

### Register Page
- Name, Email, Photo URL, Password
- Google Sign-Up option
- Redirects to Login page after success
- Error handling with toast

--

## 🏠 Home Page Features

- Banner: "Discover Your Perfect Aesthetic"
- Browse Now button → All Tiles Page
- Marquee Text (New Arrivals / Features)
- Featured Tiles (Top 4 from API)
- View Details button on each tile

---

## 🖼️ All Tiles Page

- Search bar to filter tiles by title
- Responsive grid layout
- Tile cards with image + title
- Details button → Tile details page

---

## 🔍 Tile Details Page

- Large tile image preview
- Title, description, material, dimensions
- Tags (e.g. Modern, Ceramic, Blue)

---

## 👤 My Profile Page (Challenge Feature)

- Show logged-in user info
- Name, Email, Profile Image
- Update button:
  - Navigate to update page
  - Edit Name & Image URL only

---

## ✏️ Update Profile Page

Form fields:
- Name
- Image URL

Update functionality:
- Uses BetterAuth update user API
- Redirects back to profile page

---

## ⚙️ Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret