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
- MongoDB schemas for users, sessions, posts, comments, upvotes and downvotes
- All the functionality of a full stack social media app you would expect!

# Pre-Launch Feature Pipeline
- Lots of styling
- Hosting on AWS & Containerization

# Post-Launch Roadmap
- Paginate comments
- User content moderation
- Email validation, and require validation to post or comment
- Testing
- Location based feed / multiple feeds

- CI / CD with Github Actions
- Connect instagram or linkedin in order to post
- Add in a message broker
- Mobile responsive design
- Add in text size that fluctuates based on downvotes?
- Add in cancellation features and other fun features?
- Karma / Social credit score? 
- Edit comments
- See other users profile
- Update profile pictures to be actual local uploads
- Recommendation algo
- Enhanced rate limiting