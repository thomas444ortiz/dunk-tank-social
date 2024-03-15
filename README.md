# About

Dunk Tank Social is a social networking platform where users can post anonomously to a location, but be careful, there is a chance your username will be exposed!

# Technical Features
- Password encrpytion using Bcrypt
- Rate limiting using express-rate-limit (learned this the hard way)
- Cookies and expiring session tokens in MongoDB for authentication, with autoredirect for authenticated users
- React and React Router for reusable components, dynamic page rendering, protected routes
- Express server with express router in NodeJS environment
- Chakra UI components with custom CSS
- Redux Toolkit for centralized state management
- Transpiliation with Webpack
- MongoDB schemas for users, sessions, posts, comments, likes
- All the functionality of a full stack social media app you would expect!

# Feature Pipeline
## Near Term:
- Infinite scroll

## Optimizations:
- Lots of styling
- Add in a message broker

### New Features:
- Location based feed
- Mobile responsive design
- User content moderation
- Connect instagram or linkedin in order to post
- Email validation
- Add in text size that fluctuates based on downvotes?
- Add in cancellation features and other fun features?
- Karma / Social credit score? 

### Other
- Testing
- CI / CD with Github Actions
- Hosting on AWS & Containerization