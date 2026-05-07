# DaftAlerts

A personal web application that organizes property rental alerts forwarded from Daft.ie emails.

## Tech Stack

- **Frontend:** React 18, Vite, TypeScript, TailwindCSS
- **UI Components:** shadcn/ui, lucide-react, motion
- **State Management:** TanStack React Query (v5)
- **Routing:** React Router DOM (v6)
- **Maps:** @vis.gl/react-google-maps
- **Localization:** i18next (English & Portuguese)
- **Validation:** Zod

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in the values:
   - `VITE_API_BASE_URL`: The backend REST API URL.
   - `VITE_API_TOKEN`: Your personal bearer token for single-user access.
   - `VITE_GOOGLE_MAPS_API_KEY`: API key for Google Maps integration.
   - `VITE_USE_MOCK`: Set to `true` to use local mock data instead of the API.

3. Start the development server:
   ```bash
   npm run dev
   ```

## Workflow

1. **Inbox:** Triage new property alerts. `A` to Approve, `X` to Recycle, `Enter` to View Details.
2. **Approved:** View your shortlist on a map.
3. **Recycled:** Restore or permanently delete ignored properties.
4. **Settings:** Configure filter presets for different search criteria.

## Keyboard Shortcuts

- `G` then `I`: Go to Inbox
- `G` then `A`: Go to Approved
- `G` then `R`: Go to Recycled
- `/`: Focus search
- `?`: Show shortcuts help (Coming soon)
