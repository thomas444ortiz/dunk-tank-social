# About

Dunk Tank Social is a social networking platform where users can post anonomously to a location, but be careful, there is a chance your username will be exposed!

# Technical Features
- Containerized via docker
- Rate limiting
- Stateless servers for maximum scalability
- Express server with express router in NodeJS environment
- React and React Router for reusable components, dynamic page rendering, protected routes
- Redux Toolkit for centralized state management
- Cookies and expiring session tokens in MongoDB for authentication, with autoredirect for authenticated users
- Transpiliation with Webpack
- MongoDB schemas for users, sessions, posts, comments, upvotes and downvotes
- Infinite scroll
- Password encrpytion and full authentication
- Chakra UI components with custom CSS (where necessary)
- All the functionality of a full stack social media app you would expect!

# Feature Pipeline

### App Features
- Hide load more comments button when there are none left
- Paginate comments on user page
- Refactor comments and posts on user page to not require separate components

- See other users profile
- Have a page to see all users

- User content moderation
- Location based feed / multiple feeds`
- Update profile pictures to be actual local uploads
- Mobile responsive design
- Upvote and downvote comments
- Add in text size that fluctuates based on downvotes
- Add in cancellation features and other fun features
- Implement user Karma score
- Recommendation algo
- Email validation, and require validation to post or comment
- Connect instagram or linkedin in order to post

### System Features
- Add in a message broker
- Refactor existing rate limiting algorithms, move to be before the load balancer, rate limit on an account basis
- Transition to microservice architecture (current monolithic)
- Add in autoscaler for servers
- Add in load balancer

### Other
- Thorough code review
- Host on AWS
- Testing
- CI / CD
