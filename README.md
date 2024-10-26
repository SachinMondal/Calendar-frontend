# Calendar App Frontend

This project is the frontend of a calendar application built with React. It allows users to create, view, edit, and delete calendar events, with timezone support, responsive design, and user authentication. The frontend is styled with Tailwind CSS and includes FullCalendar for the calendar UI, along with custom features such as event reminders and timezone settings.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Acknowledgments](#acknowledgments)

## Features
- **User Authentication**: Login and register functionality with token-based authentication.
- **FullCalendar Integration**: Display events in various views (day, week, month, and list) with drag-and-drop and timezone support.
- **Responsive UI**: Adapts to screen size, displaying a sidebar on larger screens and a floating button on mobile.
- **Event Management**: CRUD operations for events with SweetAlert prompts for confirmation and validation.
- **Timezone Support**: Auto-detects user’s timezone, with an option to change it.
- **Styled with Tailwind CSS**: Ensures a consistent, responsive, and modern UI.

## Tech Stack
- **React**: Core framework for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **FullCalendar**: Calendar UI component to manage events.
- **Moment.js with Timezone Plugin**: Manages time zones and formatting.
- **SweetAlert2**: Customizable alerts for user feedback.

## Environment Variables
To run this project, you’ll need to add the following environment variables to your `.env` file in the root of the project. **Ensure they are prefixed with `REACT_APP_`** so they are accessible in the frontend.

```
REACT_APP_BASEURL=<Your Backend API URL>
```

> **Note**: Restart the server after making changes to `.env`.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd calendar-app-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment variables**:
   - Create a `.env` file in the root of your project.
   - Add the required environment variables as shown above.

4. **Run the application**:
   ```bash
   npm start
   ```
   The app will be accessible at `http://localhost:3000`.

## Usage

- **Log in/Register**: Access the app by logging in with valid credentials. If not authenticated, you will be redirected to the login page.
- **Create Events**: Select a date/time on the calendar to create an event. A prompt will ask for event details.
- **Edit Events**: Drag-and-drop to change event timing or click on an event to edit.
- **Delete Events**: Click an event and confirm deletion.
- **View Events**: Switch between day, week, month, and list views to view events.
- **Timezone Selection**: Change your timezone in the settings, and the calendar will adjust to your selection.

## Project Structure

```
src
│   ├── components          # Reusable components (e.g., Sidebar, EventModal)
│   ├── pages               # Main pages (Calendar, Login, Register)
│   ├── assets              # Static assets (e.g., images, icons)
│   ├── styles              # Tailwind CSS configurations and custom styles
│   ├── utils               # Utility functions (e.g., token handling, API calls)
│   ├── App.js              # Root component
│   └── index.js            # Entry point
```

## Acknowledgments
This project utilizes [FullCalendar](https://fullcalendar.io/), [Tailwind CSS](https://tailwindcss.com/), and [SweetAlert2](https://sweetalert2.github.io/) for a smooth and responsive calendar experience. Special thanks to the developers of these libraries for providing open-source tools for building modern UIs.

--- 

This README provides a comprehensive overview and helps users and collaborators understand and use your project effectively.