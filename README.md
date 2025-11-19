# URL Shortener

A simple URL shortener application built with Next.js and MongoDB.

## Functionality

### Create Short Links
- Enter a long URL in the form
- The app generates a unique short URL
- Short URLs are in the format: `http://localhost:3000/api/links/{shortId}`
- Clicking the short URL redirects to the original long URL

### View Links
- View all created links in a table
- See the short URL, long URL, click count, creation date, and last clicked date
- Search and filter links
- Sort by any column (short URL, long URL, clicks, dates)
- Copy short or long URLs to clipboard

### Delete Links
- Enter the short ID of a link to delete it
- Link is permanently removed from the database

### Track Clicks
- Each time a short URL is accessed, the visit count increases
- The last clicked timestamp is updated

## API Endpoints

- GET /api/links - Get all links
- POST /api/links - Create a new short link (requires longUrl in body)
- GET /api/links/{id} - Redirect to the long URL for the given short ID
- DELETE /api/links/{id} - Delete a link by short ID

## Environment Variables

- MONGODB_URI - MongoDB connection string
- BASE_URL or SHORT_URL - Base URL for generating short links (defaults to http://localhost:3000)

## Setup

1. Install dependencies: `npm install`
2. Create a .env file with MONGODB_URI and optional BASE_URL
3. Run development server: `npm run dev`
4. Open http://localhost:3000
