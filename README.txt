TRUST MARKET — FULL-STACK V1

This package contains the mobile-first frontend plus Vercel serverless backend routes and a PostgreSQL schema.

PRIVATE CONTACT POLICY
- Buyer phone numbers are private.
- Seller/owner phone numbers are private.
- Public approved listings expose only Trust Market contact channels.
- Admin can view private contact data after authenticating.

BACKEND
- /api/health.js
- /api/listings.js
- /api/orders.js
- /api/reviews.js
- /api/admin.js

DATABASE
1. Create a PostgreSQL database (Neon is a suitable free-tier option when available).
2. Set DATABASE_URL in Vercel Project Settings > Environment Variables.
3. Run sql/schema.sql once against the database.

ADMIN
Set ADMIN_TOKEN in Vercel Environment Variables. Open /admin.html and enter the same token. Do not put the token in frontend code.

PAYMENTS
Domestic checkout accepts CBE and Telebirr as manual-verification methods. The backend records orders and payment references for admin review. No payment success is fabricated.
Visa/Mastercard/PayPal are displayed as Coming Soon until a real merchant gateway and server-side credentials are configured.

FACEBOOK PAGE AUTO-POSTING
The public share buttons work. Automatic posting to a Facebook Page requires Meta app/page authorization and a server-side access token; it is intentionally not faked.

DEPLOYMENT
- Import this repository/ZIP into Vercel.
- Configure DATABASE_URL and ADMIN_TOKEN.
- Run sql/schema.sql.
- Deploy.
- Test /api/health and /admin.html.

SECURITY NOTES
- Server-side validation is included.
- Public listing queries intentionally exclude owner/buyer phone numbers.
- Receipt data is private and size-limited at submission. For high-volume production, replace DB receipt storage with private object storage.
