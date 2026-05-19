# Learnova

A modern, responsive online learning platform built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Zustand**. Learnova connects learners and instructors through a seamless course discovery, enrollment, and quiz experience.

---

## Tech Stack

| Category        | Technology                                      |
| --------------- | ----------------------------------------------- |
| **Framework**   | Next.js 16 (App Router), React 19               |
| **Language**    | TypeScript                                      |
| **Styling**     | Tailwind CSS v4, tw-animate-css, shadcn/ui      |
| **State**       | Zustand 5                                       |
| **Auth**        | Cookie-based (bcryptjs, uuid)                   |
| **Fonts**       | DM Sans, Inter (next/font)                      |
| **Icons**       | Lucide React                                    |
| **Testing**     | Jest 30, @testing-library/react                 |
| **Linting**     | ESLint, eslint-config-next                      |

---

## Features

### 🔐 Authentication
- **Sign Up** — Register as a learner or instructor with email/password. Passwords are hashed with bcryptjs.
- **Sign In / Sign Out** — Session-based auth stored in httpOnly cookies (1-hour expiry).
- **Profile Management** — Update first name, last name, and other profile details from the profile page.

### 📚 Course Catalog
- **Browse All Courses** — View a grid of available courses fetched from a mock API.
- **Category Filtering** — Filter courses by category (programming, databases, design, devops, mobile development, web development).
- **Search** — Search courses by title or description.
- **Course Details** — View full course information, including description, instructor, level, duration, price, language, and tags.

### 🛒 Enrollment & Payments
- **Free Enrollment** — Enroll in free courses instantly — redirects to your dashboard.
- **Paid Courses** — Redirects to a checkout flow with a mock payment form.
- **Mock Payment Processing** — Validates card details (16-digit card, 3-digit CVV, valid expiry) and returns a mock transaction ID.

### 📊 Dashboard
- **Learner Dashboard** — View enrolled courses and learning progress.
- **Instructor Dashboard** — Create new courses and manage your content.

### ❓ Interactive Quizzes
- Course-specific quizzes to test your knowledge.
- Results page showing your score and correct answers.

### 🎨 UI / UX
- **Responsive Design** — Works seamlessly across mobile, tablet, and desktop.
- **Dark Mode** — Toggle between light and dark themes (next-themes).
- **Side Navigation** — Collapsible sidebar with toggle support.
- **Mobile Navigation** — Slide-out menu for mobile devices.
- **Notifications** — Toast-style notifications for success, error, warning, and info messages.
- **Skeleton Loading** — Loading placeholders for course cards during data fetch.

### 🧪 Testing
- Unit tests for API calls, authentication, course filtering, and mock payment processing.
- Jest configured with coverage reporting (v8 provider).

---

## Project Structure

```
learnova/
├── app/                          # Next.js App Router pages
│   ├── (protected)/              # Authenticated routes
│   │   ├── dashboard/            # Learner/instructor dashboard
│   │   │   └── create-course/    # Course creation (instructors)
│   │   └── profile/              # Profile settings
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   └── sign-up/
│   └── courses/                  # Course catalog & details
│       ├── [id]/                 # Dynamic course pages
│       │   ├── checkout/         # Mock payment checkout
│       │   └── quiz/             # Course quiz
│       └── page.tsx              # Course listing with filters
├── components/                   # React components
│   ├── common/                   # Reusable feature components
│   ├── layouts/                  # Layout components
│   ├── providers/                # Context providers
│   └── ui/                       # shadcn/ui primitives
├── lib/                          # Utilities, API, auth, business logic
│   └── __test__/                 # Jest test files
├── store/                        # Zustand state stores
├── __mocks__/                    # Jest module mocks
└── public/                       # Static assets
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone <repository-url>
cd learnova
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Test

```bash
npm run test
```

Test coverage is output to the `coverage/` directory.

---

## Environment

- Courses are fetched from an external mock API (`mock.apidog.com`).
- Revalidation is set to 60 seconds (ISR).
- No environment variables or API keys are required to run the project.
