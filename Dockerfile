# use node v20
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# copy the package.json and packagelock.json 
COPY package*.json ./

# install dependencies
RUN npm install

# Copy the rest of the application's source code into the Docker container
COPY . .

# build the production bundle
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
