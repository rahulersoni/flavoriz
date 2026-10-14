# Flavoriz

Flavoriz is a modern food blogging application built with React and Vite, with a planned Node.js, Express, and MySQL backend. It provides a platform for publishing recipes and food articles, engaging with readers, and managing content through an admin dashboard.

## Project Status

- **Frontend:** Initial implementation completed.
- **Backend:** Not yet implemented.
- **Database:** MySQL integration planned.
- **Authentication:** Secure authentication using HTTP-only cookies and refresh tokens planned.

## Technology Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Motion
- Axios
- React Hook Form
- TanStack Query
- Tiptap editor
- Lenis smooth scrolling
- Lucide React icons

### Backend (Planned)

- Node.js
- Express.js
- MySQL
- HTTP-only cookies and refresh tokens for authentication

## Project Structure

```text
flavoriz/
├── frontend/       # React application
├── backend/        # Node.js and Express API (planned)
├── .gitignore      # Root-level Git ignore rules
└── README.md       # Project documentation
```

Each application maintains its own environment configuration and `.gitignore` file where appropriate.

## Getting Started

### Prerequisites

- Node.js and npm
- Git

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd flavoriz
```

Replace the placeholder with the actual GitHub repository URL.

### 2. Set up the frontend

```bash
cd frontend
npm install
```

### 3. Configure environment variables

Create a local `.env` file in the `frontend/` directory using `.env.example` as a reference.

Configure the API base URL as needed for your local environment.

### 4. Start the frontend development server

```bash
npm run dev
```

Vite will display the local development URL in your terminal.

### 5. Build the frontend

```bash
npm run build
```

The production build is generated in `frontend/dist/`.

## Planned Features

- Responsive food blog and recipe pages
- User accounts and profile dashboard
- Role-based access for subscribers, authors, and administrators
- Recipe and article management
- Comments, replies, likes, and bookmarks
- Recipe copying functionality
- Configurable post view counts
- Admin dashboard and content analytics
- Newsletter integration with Mailchimp
- Contact form
- Dark and light themes
- Page transitions and scroll animations
- Secure API and database integration

## Environment Variables

Environment files containing local configuration and secrets must not be committed to Git.

- `frontend/.env` — frontend environment configuration.
- `backend/.env` — backend environment configuration.
- `.env.example` files — example variable names and placeholder values.

Never expose database credentials, private API keys, or authentication secrets in frontend code or `VITE_` environment variables.

## Development Notes

- Frontend dependencies are managed through `frontend/package.json` and `frontend/package-lock.json`.
- Backend dependencies and scripts will be managed separately in `backend/`.
- The frontend and backend are maintained in the same Git repository.
- The backend and database setup instructions will be added when implementation begins.

## License

All rights reserved unless a license is explicitly provided. No permission to redistribute or reuse this project's code is granted by default.
