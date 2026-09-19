TRUST MARKET — production-ready Vercel project

Frontend: mobile-first marketplace + ETCARE product area + business packages + sharing + checkout verification UX.
Backend: Vercel serverless API routes in /api and PostgreSQL schema in schema.sql.

Required Vercel Environment Variables for live backend:
DATABASE_URL=your PostgreSQL connection string
ADMIN_TOKEN=a long random secret

Important: payment gateways are NOT faked. Live gateway verification requires approved merchant credentials and server-side secrets.
Public listings never expose seller/buyer phone numbers; personal contact data is kept out of the public response layer.

Default Vercel domain can be used first; replace canonical/OG URLs after the real production URL is known.
