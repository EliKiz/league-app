# Home Assignment - FE - Sports Leagues

## Overview

This project is a single-page application (SPA) that displays sports leagues with filtering and badge lookup, simulating a simplified component from an online bookmaker platform. The app is built with React, TypeScript, Ant Design, and follows FSD (Feature-Sliced Design) architecture. API responses are cached for performance.

## Features & Requirements

- **Fetch and display a list of sports leagues** from [TheSportsDB All Leagues API](https://www.thesportsdb.com/api/v1/json/3/all_leagues.php)
- **Display fields:**
  - `strLeague`
  - `strSport`
  - `strLeagueAlternate`
- **Search bar** to filter leagues by name
- **Dropdown** to filter by sport type (e.g., Soccer, Basketball, Motorsport)
- **Component-based architecture** (FSD)
- **Responsive UI** (mobile & desktop)
- **League card click or "Show Badge" button** calls the Season Badge API and displays a badge in a modal
- **API responses are cached** (React Query)

## Tech Stack

- **React** + **TypeScript**
- **Ant Design** (UI components)
- **@tanstack/react-query** (API integration & caching)
- **FSD (Feature-Sliced Design)**
- **Vite** (build tool)

## API

- **All Leagues:**  
  `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- **Badge Lookup:**  
  `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<id>`
- [API Documentation](https://www.thesportsdb.com/free_sports_api)

## Architecture & Design Decisions

- **FSD (Feature-Sliced Design):**
  - `pages/` — page components
  - `features/` — business logic (filtering, badge fetching)
  - `entities/` — (reserved for future domain entities)
  - `shared/` — reusable hooks, API, UI primitives
  - `ui/` — presentational components (cards, header)
- **React Query** is used for all API calls and caching (leagues and badges)
- **Debounce** is used for search input to avoid excessive API/filtering calls
- **Responsive layout**: filters stack vertically on mobile
- **SVG logo** is used for best quality and as favicon

## How to Run

1. `npm install`
2. `npm run dev`
3. Open [http://localhost:5173](http://localhost:5173)

## AI Tools Used

- **ChatGPT (OpenAI):**
  - Used for code scaffolding, FSD architecture planning, and UI/UX suggestions

## Notes

- The project is fully runnable and all requirements from the assignment are covered.
- If you have any questions or need clarifications, feel free to reach out!
