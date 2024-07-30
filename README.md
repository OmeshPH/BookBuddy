# Book Buddy


## Requirements
Make sure you have met all of the following requirements:

Project Management Requirements
~~Have a GitHub repository containing all relevant code for the project.~~
Have an updated GitHub repository with new commits.
Functionality Requirements
Routes via React Router (This is a minimum; you could have more than just these routes. These routes may be named as you wish.)
/books - this could be the home page; this component should show all books in the library’s catalog
/books/:id  - this component should display details of an individual book
/login and /register or /auth if you want to do both in one view
/account  - this component should show, at minimum:
Username or email of logged in user
List of all books a user has checked out (or a message indicating they have 0 books checked out if applicable)
Unauthenticated Users should be able to:
Observe a list of all the books in the library
Sign up for an account with a username and password.
Sign in using the correct username/password combination.
Unauthenticated Users should not be able to:
Check out or return any book
See the account page of any user
Authenticated Users should be able to:
Check out an available book
Return books they have currently checked out
View their account page and currently checked-out books
Authenticated Users should not be able to:
View the accounts of users other than themselves
Checkout / Return books for other users
All users should be able to:
View a list of all the library's books
View details of an individual book
Implementation Requirements
Javascript Basics
variable declaration (correct use of let and const)
loop usage (map, forEach, for or while loops)
control structures (if, else, else if, ternaries)
function declaration
function invocation
usage of basic data types
usage of complex data types, like arrays and objects
AJAX Basics
usage of HTTP Methods (GET/POST/PATCH/DELETE)
handling of asynchronous coding for requests
usage of try/catch blocks within async functions
updating the DOM with the results of data requests
Front-End Basics including:
functional React components
proper usage of props to share data & functions between components
proper usage of event listeners on React components
proper usage of state and effects
implemented routes (React Router) and hooks (useNavigate, useParams) to view different components in the SPA without refresh
CSS Basics including:
proper use of Flex / Grid for creating layouts
proper use of cascading and specificity to prevent bleed into unrelated elements
intuitive User Experience (UX) through a clean interface
Code
is cleanly written
has no unused functions or variables
has expressive variable, function, and CSS class names
is organized into a coherent flow
does not contain console.log() statements used for debugging in final version
Stretch Goals:
As time allows, complete the following stretch goals:

Utilize Google FontsLinks to an external site. to add a few to your project or to find fonts hosted elsewhere.
Add icons. Icon fonts allow you to add icons to your application, and common icons increase your user's ability to onboard to your application much more quickly. Check out Material IconsLinks to an external site. (used by adding <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /> to your <head>), or Font AwesomeLinks to an external site..
Deploy the application to a hosted site.  For a refresher on how to do this, visit the Front End Deployment Guide.