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


 ` _Project Structure_
    src/
├── assets/                 # Images and static assets
│   ├── designer-4.jpg      # Background image for dashboard/course details
│   └── designer-5.jpg      # Background image for auth pages
├── client/                 # API client configuration
│   └── backendClient.js    # Axios instance with interceptors
├── components/             # Reusable UI components
│   ├── CourseCard.jsx      # Individual course card component
│   ├── NavBar.jsx          # Navigation bar with user info
│   └── ProtectedRoute.jsx  # Route protection wrapper
├── contexts/               # React Context providers
│   ├── AuthContext.jsx     # Authentication state and methods
│   └── UserContext.jsx     # User data management
├── hooks/                  # Custom React hooks
│   └── useUser.js          # User management hook
├── pages/                  # Page components
│   ├── CourseDetail.jsx    # Detailed course view with sessions
│   ├── Dashboard.jsx       # Main dashboard with course grid
│   ├── LandingPage.jsx     # Public landing page
│   ├── LoginPage.jsx       # User login form
│   └── RegisterPage.jsx    # User registration form
├── App.jsx                 # Main app component with routing
├── App.css                 # Custom CSS styles
├── index.css               # Tailwind CSS imports
└── main.jsx                # Application entry point`
  
      

   
   


WIREFRAME
<img width="3840" height="1677" alt="Wireframe SmartNest Learning Tracker 7-29-25 _ Mermaid Chart-2025-07-29-041555" src="https://github.com/user-attachments/assets/a6cf4db1-e321-4e97-9261-725470cca758" />
[used mermaidchart.com](https://www.mermaidchart.com/app/projects/5d210069-0590-4424-940e-f4ec9da1af6d/diagrams/2c6b60af-aaa1-4a79-a20d-37534513b643/version/v0.1/edit)
