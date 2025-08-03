__🪺SmartNest-LEARNING-TRACKER__
*Frontend*

 _SmartNest Learning Tracker is a  modern REACT-based learning management system that helps those who use it to track all of their courses, sessions, and notes on their learning journey.  SmartNest is buit with REACT, TailwindCSS, and integrated with a Node.js backend._

Landing Page [SmartNest-Learning-Tracker](https://smartnesttracker.netlify.app/)
 <img width="916" height="651" alt="image" src="https://github.com/user-attachments/assets/6c04e2e3-d23d-42ef-8ff6-979666fa65f6" />


 Register Page [SmartNest-Learning-Tracker](https://smartnesttracker.netlify.app/register)
<img width="917" height="654" alt="image" src="https://github.com/user-attachments/assets/8950c889-2c2c-474b-8356-7396a50339b5" />


Dashboard Page [SmartNest-Learning-Tracker](https://smartnesttracker.netlify.app/dashboard)
<img width="920" height="703" alt="image" src="https://github.com/user-attachments/assets/deb2d95b-6ba9-45f2-8034-d4cf45876c0a" />

Adding Sessions to Courses [SmartNest-Learning-Tracker](https://smartnesttracker.netlify.app/courses/688f0ec76dbfc41373aa6fc2)
<img width="911" height="692" alt="image" src="https://github.com/user-attachments/assets/dbd044a6-48f7-4e55-9e79-3fe5af1bf38f" />

Session Add to Course [SmartNest-Learning-Tracker](https://smartnesttracker.netlify.app/courses/688f0ec76dbfc41373aa6fc2) 
<img width="909" height="683" alt="image" src="https://github.com/user-attachments/assets/2158c2e6-0ef3-421e-ac09-8069a8eb878a" />

Confirmation modal for Session [SmartNest-Learning-Tracker](https://smartnesttracker.netlify.app/courses/688f0ec76dbfc41373aa6fc2)
<img width="652" height="405" alt="image" src="https://github.com/user-attachments/assets/21d2d45f-f3df-4d4f-8bd1-0856096d2fe7" />







 


 __SmartNest Learning Tracker Features__

 
  _Authentication & User Management_
  
   * User Registration & Login - secure authentication with JWT Tokens.
     
   * Protected Routes - route protection for authenticated users.
     
   * Automatic Token management - axios interceptors handle token refresh and expiration.
     
   * Persistent Sessions - user sessions maintained across browser refreshes.

     

  _Course Management_
  
   * Course Dashboard - view all courss in a grid layout.
     
   * Add new courses - create courses wiht title, description, category, URL, and status.
     
   * Course Categories - programming, design, business, data science, investing, and other.
     
   * Course Status Tracking - "On the horizon", "Working it", "BAM did it"
     
   * Course Details - detailed view with full CRUD operations.
     
   * Course Deletion - safe deletion with confirmation modals.


 _Lession Session Tracking_
 
  * Session Management - add, edit, and delete learning sessions for each course.
    
  * Session Notes - record detailed notes for each learning session.
    
  * Topics Learned - tag and track specific topics covered in each session.
    
  * Session History - view chronological history of all learning sessions.
    
  * Date Tracking - automatic timestamp for each session.


_User Experience_

 * Responsive Design - mobile-first design that works on all devices.
   
 * Beautiful UI - modern glassmorphisim design wiiht background images.
   
 * Interactive Elements - smooth hover effects and transitions.
   
 * Loading States - elegant loading indicators for better UX.
   
 * Error Handling - comprehensive error messages and user feedback.
   
 * Success Notifications - clear feedback for successful operations.


   ----------------------------------------------------------------------------------------------------

   __Tech Stack__

   _Core Tech_
    * React 19.1.0 - modern React with hooks and functional components.
    * React Router DOM 7.7.1 - client-side routing and navigation.
    * Vite 7.0.4 - fast build tool and development server.
    * Tailwind CSS 4.1 - CSS framework - Utility -first styles

   _HTTP & State Management_
   
    * Axios - HTTP client with interceptors for API communication.
      
    * React Context API - global state management for auth and user data.
      
    * Custom Hooks - reusable logic for user management.
      

<img width="189" height="671" alt="image" src="https://github.com/user-attachments/assets/e619d2f4-7155-45e9-ae78-5e138d9b0705" />


__Installation__

_Prerequisites_
 * Node.js
 * npm
 * Backend API running (see backend documentation)

_Installation_
 * Clone the repository
   
   `git clone https://github.com/FrancesReagan/smart-nest-learning-tracker-frontend/tree/main`

   `cd smart-nest-learning-tracker-frontend`

* Create `.env` file for local dev:

  `VITE_API_URL=http://localhost:3000`

  Create `.env.production` file for production:

  `VITE_API_URL=https://smart-nest-learning-tracker-backend.onrender.com`

*Start the development server:

 `npm run dev`

*Open your browser navigate to: `http://localhost:5173`


----------------------------------------------------------------------------------------

__API Integration__

_The application communicates with a RESTful backend API using the following endpoints:

 _Authenication Endpoints_
  * POST /api/users/register - user registration
  * POST /api/users/login - user login
  * GET /api/users/me - get current user profile

_Course Management Endpoints_

* GET /api/courses - get all user courses
  
* POST /api/courses - create a new course
  
* GET /api/courses/:id -get a specific course
  
* PUT /api/course/:id - update a course
  
* DELETE /api/courses/:id -delete a course


 _Session Management Endpoints_

 * GET /api/courses/:id/sessions - get a course sessions
 * POST /api/courses/:id/sessions - create a new session
 * PUT /api/courses/:id/sessions/:sessionID - update a session
 * DELETE /api/courses/:id/sessions/:sessionId - delete session

   ---------------------------------------------------------------------

   __Design System__

   _Color Scheme_
    * Primary: Blue/Gray tones for interactive elements
    * Success: green for positive actions and confirmations
    * Warning: Yellow/Orange for edit actions
    * Danger: red for delete actions and errors
    * Background: dark overlay with beautiful nature imagery; and hands and globe.
  
  _Typography_
    * System fonts - system-ui, avenir, helvetica, arial , sans-serif
    * text shadows - enhanced readability over background images
    * font weights - bold headers regular body text 

  _Visual Effects_
   *Glassmorphism - semi-transparent backgrounds wiht backdrop blur
   *Drop shadows - enhanced depth and uisual hierarchy
   *Hover effects - interactive feedback on all clickable elements

   _______________________________________________________________________________________
   
__Authentication Flow__

_Registration Process_
* user fills out the registration form (username, email, password)
* client-side validation (password length, email format,username length)
* API call to the backend registration endpoint
* automatic login and a redirect to dashboard
* JWT Token stored in the localStorage


_Login Process_
* User enters their email and password
* API call to the backend login endpoint
* JWT token received and stored
* User data stored in the context
* Redirect to the dashboard

_Session Management_
 * Token Storage -JWT stored in the localStorage
 * automatic headers - axios interceptors add the Authorization header
 * token expiry - automatic logout on the 401 responses
 * route protection - protectedRoute component guars the authenticated pages

-------------------------------------------

__Component Architecture__
_Context Providers_
 * AuthProvider - manages authentication state and methods
 * UserProvider - handles user data and profile information

_Custom Hooks_
 * useAuth() - access authentication methods and state
 * useUser() - access current user data and management functions.

_Protected Routes_
 *ProtectedRoute - wrapper component tha redirects unauthenticated users.
 *Route Guards - automatic redirects based on authentication status.

 ---------------------------------------------------------

 __Responsive Design__

 _Breakpoints_
  *Mobie - default styling (< 768px)
  *Tablet - `md`: prefix (768px +)
  *Desktop - `lg`: prefix (1024px +)


  _Responsive Features_
   *Grid layouts - adaptive course grids (1 column mobile, 2 tablet, 3 desktop).
   *Navigation - collapsible mobile-friendly navigation
   *Forms - stacked mobile layout,side-by-side desktop layout.
   *typography - scalable text sizes across device.

   ----------------------------------------------------------------------------------------

   __Deployment & Backend Connection__

   _Architecture Overview_
    *Frontend - deployed on Netlify.com at https://smartnesttracker.netlify.app/
    *Backend - deployed on Render.com
    *Database - MongoDB Atlas (connected to Render backend)

   _Frontend Deployment (Netlify)_

    * Prepare the repository
      - ensure your code is pushed to GitHub
      - verify `.env.production` contains your Render backend URL -
         `VITE_API_URL=https://smart-nest-learning-tracker-backend.onrender.com`

    * Deploy  to Netlify
      - sign up/login to Netlify.com
      - import from Git -
           - click "new site from Git"
           -connect your Git provider (GitHub)
           -select your frontend repository
      - configure build settings -
           - build command - `npm run build`
           -publish directory - `dist`
           - node version: 18
      -add environment variables-
           - go to site settings - environment variables
           - add - `VITE_API_URL = https://smart-nest-learning-tracker-backend.onrender.com`
      - deploy - 
           - click "deploy site"

      -Live URL - your app will be available at https://smartnesttracker.netlify.app/

  * API Client Configuration -
     - your backendClient.js automatically uses the environment variable -
         `export const backendClient = axios.create({
              baseURL: `${import.meta.env.VITE_API_URL}/api , // --this points to Render backend--//
            });`


 __Backend Deployment (Render)__
 *Step 1 - Deploy Backend
   -sign up/login to Render.com
   -Create Web service 
      -connect your backend repository
      -choose "web service"
      -configure build and start commands
   _Set Environment Variables
      -MongoDB connection string
      -JWT secrets
      -CORS origins (include your Netlify URL)

 *Step2 - Get Backend URL
     - after deployment, Render provides a URL like - `https://smart-nest-learning-tracker-backend.onrender.com`
     -the URL goes in your frontend's `VITE_API_URL`


 _Connecting frontend to backend_
 * CORS configuration (backend) 
  CORS configuration to allow requests from your Netlify domain:

// In your backend server.js
import cors from "cors";

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',                           // Local development (Vite)
  'http://localhost:3000',                           // Local development (alternative)
  'https://smartnesttracker.netlify.app',           // Your Netlify domain
  'https://deploy-preview-*--smartnesttracker.netlify.app', // Netlify deploy previews
  'https://your-custom-domain.com'                   // Custom domain (if any)
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in our explicitly allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Check if the origin is a Netlify deploy preview URL
    const netlifyPattern = /^https:\/\/deploy-preview-\d+--smartnesttracker\.netlify\.app$/;
    if (netlifyPattern.test(origin)) {
      return callback(null, true);
    }
    
    // If the origin is not allowed, deny access
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Recommended to replace  app.use(cors()) with:
app.use(cors(corsOptions));
The CORS configuration will be in the server.js file to use the above settings instead of the permissive app.use(cors()) for production security.


_Environment Variables Setup_
 *Frontend (.env.production) - `VITE_API_URL=https://smart-nest-learning-tracker-backend.onrender.com`
 *Backend (Render environment variables) - 
     `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartnest
      JWT_SECRET=your-super-secret-jwt-key
      NODE_ENV=production
      FRONTEND_URL=https://your-app-name.netlify.app`


_API Client Configuation_
  *Your backendClient.js automatically uses the environment variable:

        `export const backendClient = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}/api`,  // Points to Render backend
         });`


 -----------------------------------------------------

 __Deployment Workflow__
  _Development to Production Pipeline_
     - Develop Locally  
          `#Frontend (localhost:5173)
            `npm run dev`

           `#Backend (localhost:3000)
            `npm run dev`

    - Test integration - 
          - ensure local frontend can connect to local backend
          -test all CRUD operations
          -verify authentication flow

     -Deploy Backend First -
          - push backend code to Git
          - deploy to Render
          - test backend endpoints directly
          - note to Render URL

      -Update Frontend Environment 
           - update ` .env.production` with Render URL
           - commit and push changes

      -Deploy Frontend -
           - netlify auto-deploys on Git push
           -Or manually trigger deploy
           -test full application

     ----------------------------------------------------------

     __Troubleshooting Production Issues__

       _Backend Not Responding_
          * check Render service status
          * review Render logs for errors
          * verify environment variables
          *test database connection

      _Frontend Build Failures_
         * Check Netlify build logs
         * Verify Node.js version compatible
         *Check for missing dependencies
         *Clear build cache and re-deploy

      _API Connection Issues_
         * Verify VITE_API_URL in Netlify environment
         * Check browser network tab for failed requests.
         * confirm backend CORS configuration.
         * test API endpoints directly with Postman.

-----------------------------------------------------------------

__Troubleshooting__
  - common issues -
     * build errors:
        ` npm run clear-cache
          npm install
          npm run build`

     * API connection issues -
         *Verify VITE_API_URL in evironment variables
         *check backend server status
         *confirm CORS configuration

    * Authenication Problems
       *clear localStorage `localStorage.clear()`
       *check token expiry in backend logs
       *verfiy JWT secret configuration

   *Styling Issues
       * ensure Tailwind CSS is properly imported
       * check for conflicting CSS rules
       * verify PostCSS configuration.

   * Performance Optimization
       * Code splitting - implemented with React Router
       * lazy loading - consider implementing for large components
       * image optimization - compress background images

-----------------------------------------------------------

__Future Vision & Roadmap__
  _SmartNest Full Vision - AI-Powered EdTech Platform_
    * The current learning tracker is just the start - SmartNest will become an innovative EdTech application that revolutionizes online learning through AI-powered features and personalized experiences.

    _AI-Powered Features (Phase 2)_
      _AI-Generated Explainer videos_
         * Automated Video Creation - AI generates custom explainer videos for any topic or concept.
         * Real-Time updates - automatically updates explainer videos when applications or technologies change.
         * version monitoring - continuously monitors software/platform updates and creates from content.
         * makes traditional explainer videos obsolete - dynamic, always-current video content.

     _Customizable AI Teachers_
        * Personalized Avatars - choose your AI teacher
     
   
   


WIREFRAME
<img width="3840" height="1677" alt="Wireframe SmartNest Learning Tracker 7-29-25 _ Mermaid Chart-2025-07-29-041555" src="https://github.com/user-attachments/assets/a6cf4db1-e321-4e97-9261-725470cca758" />
[used mermaidchart.com](https://www.mermaidchart.com/app/projects/5d210069-0590-4424-940e-f4ec9da1af6d/diagrams/2c6b60af-aaa1-4a79-a20d-37534513b643/version/v0.1/edit)
