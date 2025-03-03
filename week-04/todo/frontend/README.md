## Frontend for Todos List app

### Functionality
- User can signup using /users/signup POST request with username, email and password in the body
- Once user is signed up, he/she can login using /users/login POST request with username and password in the body. Login makes AccessToken and Refresh token. Access Token is valid for 15 minute which can be renewed after using /users/refresh GET request, and Refresh Token is valid for 1 day or till user is logged out. Refresh token is stored as a cookie.
- User can log out using /users/logout. Once logged out, Refresh token expires
- User can look into its todos using GET /users/todos
- User can look into a particular todo using GET /todo/:id
- Update todo: /todo/:id/update PUT request
- Deleted todo: /todo/:id/delete DELETE request