# the BBB club


## Description

Website about movies.


## User Stories

404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

Signup: As an anon I can sign up in the platform

Login: As a user I can login to the platform 

Logout: As a user I can logout from the platform so no one else can use it

Home: As a anon/user user I can see Home, all movies, and movie details

Review form: As a user I can write reviews about movies


## Backlog

- must see movies page
- random movie to watch page
- fun fact about movies of the day
- add score to movie


# Client / Frontend

## React Router Routes (React App)

| Path                       | Component            | Permissions                  | Behavior                                                     |
| -------------------------  | -------------------- | ---------------------------  | ------------------------------------------------------------ |
| `/Home`                    | Home                 | public `<Route>`             | Home page                                                    |
| `/signup`                  | Signup               | anon only  `<AnonRoute>`     | Signup form, link to login, navigate to homepage after signup|
| `/login`                   | Login                | anon only `<AnonRoute>`      | Login form, link to signup, navigate to homepage after login |
| `/all-movies`              | AllMovies            | public `<Route>`             | Shows all movie in a list                                    |
| `/all-movies/movie-details`| MovieDetails         | public `<Route>`             | Show movie details                                           |
| `/review-form`             | ReviewForm           | private only`<PrivateRoute>` | Show review form                                             |
| `/all-reviews`             | AllReviews            | private only`<PrivateRoute>`| Show all reviews.                                            |
| `/profile`                 | Profile              | private only`<PrivateRoute>` | Shows user profile                                           |
| `/profile/saved-movies`    | SavedMovie           | private only`<PrivateRoute>` | Shows user's saved movies                                    |


## Components

- Home

- Signup

- Login

- AllMovies

- MovieDetails

- ReviewForm

- AllReviews

- Profile

- SavedMovie

- Navbar

 
## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser(id)
- Movies Service
  - movies.list()
  - movie.detail(id)
- Review Service
  - review.add(id)
  - review.delete(id)

<br>


# Server / Backend


## Models

User model

```javascript
{
  id: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  reviewsIds: [String]
}
```



Review model

```javascript
 {
   id: {type: String, required: true, unique: true},
   title: {type: String, required: true},
   user: {type: String, required: true},
   body: {type: String, required: true},
   movieId: {type: String, required: true},
   overall score: {type: Number, required: true},
 }
```


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -----------------------------------------------------|
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page   
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session 
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session 
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                   
| GET         | `/movies`                     |                              |                | 400          | Show all movies                                     
| GET         | `/movies/:id`                 | {id}                         |                |              | Show specific movie                                 
| POST        | `/review-form`                | {}                           | 201            | 400          | Create and save a new review                      
| PUT         | `/review/edit/:id`            | {title,body, overall score}  | 200            | 400          | edit review                                     
| DELETE      | `/review/delete/:id`          | {id}                         | 201            | 400          | delete review                                       


## Links

### Trello/Kanban

https://trello.com/b/pBrKiqrt/3rd-project

### Git

https://github.com/Hachiko9/TheBBBClub_FE/

https://github.com/Hachiko9/TheBBBClub_BE/

https://thebbbclub.netlify.app/

### User Flow

https://app.mural.co/t/3rdproject4254/m/3rdproject4254/1602869366581/543a4871a42fbd75c46a459a6b0c33dda0ce548c

### Slides

https://docs.google.com/presentation/d/1zDhA8WHfCbDyV38R99x_am5LfV2xHfDs8PSp_wfJx-k/edit?usp=sharing








