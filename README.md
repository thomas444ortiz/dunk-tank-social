# About

Dunk Tank Social is a social networking platform where users can post anonomously to a location, but be careful, there is a chance your username will be exposed!

# Technical Features
- Password encrpytion using Bcrypt
- Cookies and expiring session tokens in MongoDB for authentication
- React and React Router for reusable components, dynamic page rendering, protected routes
- Express server with express router in NodeJS environment
- Chakra UI components with custom CSS
- Redux Toolkit for centralized state management
- Transpiliation with Webpack

# Feature Pipeline
Near Term:
- Update routing to make returning smoother for returning users (right now you see a flash of the login page before it redirects you)
- Ability to like posts
- Comments
- Ability to expose posts + algorithm
- Location based feed
- Styling
- Throttle requests, protect backend
- Only show delete button if its your post

Stretch:
- Pagination of posts
- Testing
- User content moderation
- Connect instagram or linkedin in order to post
- CI / CD with Github Actions
- Hosting on AWS & Containerization
- Email validation
