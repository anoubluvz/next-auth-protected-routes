# NEXTJS Authentication Project
a NEXTJS project hooked up to supabase with authentication and protected routes

---
## Technologies
* Supabase
* NEXTJS

--- 
## Notes:
* Each user can create their own profile
* Protected routes are blocked on unauthorized users on the server 

---
## Installation:

Installing Dependencies:

    git clone https://github.com/syntomy/next-auth-protected-routes.git
    cd next-auth-protected-routes
    npm i

Change environment variables:
* Head over to next.config.js
* Change SUPABASE_URL to your supabase api URL
* Change SUPABASE_ANON_KEY to your anon key

Run application:

    npm run dev