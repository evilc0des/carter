# Carter
Order Management System

### Setting up Codebase 
To setup the codebase and start the local server

- `git clone https://github.com/evilc0des/carter.git`
- `npm install`
- `node app.js`

The app will start in http://localhost:4000
All major configurations like database reside in ~config.js

### About the API
Few functional API endpoints with no or incomplete frontend is present. 
For example User Sign up API.
 #### User Signup/Register
 To access the app, you need to login as a user. You would need credentials. Credentials can be formed by registering as a user using the /auth/signup endpoint
 
 - POST /auth/signup
 Request: {
        &nbsp;&nbsp;&nbsp;&nbsp;email: String,
        &nbsp;&nbsp;&nbsp;&nbsp;password: String
}

This would create a new user and let you log in using this email and password
