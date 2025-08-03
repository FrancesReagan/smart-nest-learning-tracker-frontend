__🪺SmartNest-LEARNING-TRACKER__
*Frontend*

 _SmartNest Learning Tracker is a  modern REACT-based learning management system that helps those who use it to track all of their courses, sessions, and notes on their learning journey.  SmartNest is buit with REACT, TailwindCSS, and integrated with a Node.js backend._

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

   
  
      

   
   


WIREFRAME
<img width="3840" height="1677" alt="Wireframe SmartNest Learning Tracker 7-29-25 _ Mermaid Chart-2025-07-29-041555" src="https://github.com/user-attachments/assets/a6cf4db1-e321-4e97-9261-725470cca758" />
[used mermaidchart.com](https://www.mermaidchart.com/app/projects/5d210069-0590-4424-940e-f4ec9da1af6d/diagrams/2c6b60af-aaa1-4a79-a20d-37534513b643/version/v0.1/edit)
