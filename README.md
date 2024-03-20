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
- Infinite scroll
- All the functionality of a full stack social media app you would expect!

# Pre-Launch Feature Pipeline
- Finalize inputs
- Style comments better
- Restyle login and signup
- Check for bugs
    - When you use a used username it crashes the server


- Hosting on AWS & Containerization

# Post-Launch Roadmap
- Testing
- Paginate comments
- User content moderation
- Location based feed / multiple feeds
- Email validation, and require validation to post or comment

- Update profile pictures to be actual local uploads
- See other users profile
- CI / CD with Github Actions
- Mobile responsive design
- Edit comments
- Add in a message broker

- Add in text size that fluctuates based on downvotes?
- Add in cancellation features and other fun features?
- Karma / Social credit score? 
- Recommendation algo
- Enhanced rate limiting
- Connect instagram or linkedin in order to post