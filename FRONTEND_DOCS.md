# Frontend Documentation

## Overview

This is the frontend for the Chat Application, built with Next.js 16 (App Router), React 19, and TailwindCSS. It features a responsive UI, real-time updates via Socket.IO, and a robust state management system.

## Tech Stack & Libraries

- **Framework**: Next.js 16 (App Router), React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS, Shadcn/UI, Lucide React (Icons), TW Animate CSS
- **State Management**: React Context
- **Real-time**: Socket.IO Client
- **Validation**: Zod
- **Utilities**: Cookies-next, Class Variance Authority, CLSX, Tailwind Merge
- **Linting/Formatting**: ESLint, Prettier

## Architecture

The project follows the Next.js App Router structure:

- **app/**: Contains the application routes and layouts.
  - **(auth)/**: Authentication routes (login, signup, etc.).
  - **chat/**: The main chat interface.
- **components/**: Reusable UI components.
  - **ui/**: Shadcn/UI primitives.
  - **Other/**: Other components.
- **context/**: React Context providers (e.g., `ChatProvider`).
- **hooks/**: Custom React hooks.
- **middlewares/**: Custom middleware logic for route protection.

- **types/**: TypeScript type definitions.
- **utils/**: Utility functions.
- **validation/**: Zod schemas for form validation.
- **socket.ts**: Socket.IO client initialization.

## Setup & Installation

1.  **Prerequisites**: Node.js installed.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**: Create a `.env` file in the root directory:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:4000/api
    NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
    ```
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
5.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

## Key Components

### Chat Interface (`components/chat-page/`)

- **`ChatContent.tsx`**: The core component that orchestrates the chat view. It manages the layout between the header, message list, and input area.
- **`ChatHeader.tsx`**: Displays the active user's details (avatar, name, status) and typing indicators.
- **`MessagesList.tsx`**: Renders the scrollable list of messages, grouping them by date.
- **`SendMessage.tsx`**: The input component for composing and sending messages. Handles typing events.
- **`FindFriends.tsx`**: A mobile-only toggle to open the user sidebar.
- **`ChatWelcom.tsx`**: The landing view shown when no conversation is selected.

### Sidebar (`components/User-list/`)

- **`UserListUI.tsx`**: The main sidebar container that handles user search and list rendering.
- **`UserList.tsx`**: Renders individual user items in the list.
- **`Avatar.tsx`**: (`components/Avatar.tsx`) A reusable avatar component that displays user initials or profile pictures.

### Authentication Components (`components/Auth-UI/`)

- **`AuthInput.tsx`**: Reusable input field with validation error display.
- **`AuthButton.tsx`**: Submit button with loading state support.
- **`AuthHeader.tsx`**: Header component for auth forms (Login/Signup titles).
- **`AuthFooter.tsx`**: Footer component for auth forms (links to other auth pages).
- **`AuthAlert.tsx`**: Displays error or success messages.

### Logic & Infrastructure

- **`SocketController.tsx`**: A headless component that manages global socket event listeners (e.g., `receive_message`, `user_online`, `user_typing`) and updates the global state accordingly.
- **`ChatProvider.tsx`**: A React Context provider that exposes global state like `logedinUser`, `selectedUserForChat`, and `onlineUsers`.

## State Management

### Context (`ChatContext`)

Used for application-wide state that needs to be accessible by many components:

- `logedinUser`: The currently authenticated user.
- `selectedUserForChat`: The user currently selected in the sidebar.
- `onlineUsers`: A Set of user IDs representing currently online users.

## Validation

The application uses **Zod** for schema validation, primarily for authentication forms.

- **`signup.ts`**: Validates registration data (username, email, password).
- **`login.ts`**: Validates login credentials.
- **`forgotPassword.ts`**: Validates email for password reset requests.
- **`resetPassword.ts`**: Validates new password input.

## Middleware & Security

The application uses a custom middleware implementation in `middlewares/` to protect routes.

- **`authMiddleware.ts`**: Checks for the presence of a `token` cookie.
- **Role-Based Access**: Routes are defined with allowed roles (`guest`, `user`).
  - `guest` routes (e.g., login, signup) are accessible without a token.
  - `user` routes (e.g., `/chat`) require a valid token.
  - Unauthorized access redirects the user to the appropriate page (e.g., home or login).

## Custom Hooks

- **`useChatMessages`**: Manages fetching and storing messages for the active conversation. It handles loading states and appending new real-time messages.
- **`useChatScroll`**: Automatically scrolls the chat container to the bottom when new messages arrive.
- **`use-mobile`**: Detects if the user is on a mobile device to adjust the UI (e.g., sidebar behavior).

## Routing

The application uses Next.js App Router:

- `/login`: User login page.
- `/signup`: User registration page.
- `/verify-account`: Email verification page.
- `/forgot-password`: Request password reset.
- `/reset-password`: Reset password page.
- `/chat`: The main protected route for the chat application.

## Socket Integration

The socket connection is initialized in `socket.ts` as a singleton.

- **Connection**: Auto-connects when a user is authenticated (token present).
- **Events**:
  - Listens for: `receive_message`, `user_online`, `user_offline`, `user_typing`, `user_stopped_typing`.
  - Emits: `send_message`, `user_typing`, `user_stopped_typing`, `mark_as_read`.

## Utilities

- **`apiFetch.ts`**: A wrapper around the `fetch` API to handle headers and base URLs consistently.
- **`generateAvatarColor.ts`**: Generates consistent colors for user avatars based on their name.
