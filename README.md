# Medovate Hospital

A modern React-based hospital management system built with Vite.

## Features

- **Doctor Management**: View and manage hospital doctors
- **Admin Panel**: Secure admin interface for managing doctors
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Clean and professional design

## Admin Panel Access

The admin panel is protected by password authentication and is not accessible through the main navigation.

**Access URL**: `http://localhost:5174/admin` (when running locally)

**Admin Password**: `admin123`

### Admin Features
- Add new doctors
- Edit existing doctor information
- Delete doctors
- View statistics (total doctors, departments, average rating, total patients)
- Secure logout functionality

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5174`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- React 18
- Vite
- React Router
- Tailwind CSS
- React Icons
- Context API for state management
