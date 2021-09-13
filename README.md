# task-manager
DESCRIPTION: This is an app that helps you login as an user and keep track of tasks you need to do and their status(incomplete/complete).
USAGE/FEATURES: This app takes signup, login requests, lets the user add tasks specific to them, retrieve them by id, status, description and all tasks arranged in ascending order of
creation. It also allows to edit, delete tasks and logout and delete user account.
SOFTWARE:
The entire frontend is made on postman. For backend I have used mongoDB to store all my data. the graphical user interface used was robo3T but i found it easier to use mongodb atlas later.
Mongoose was used to build REST API, where schemas were designed for tasks as well as user models. next routing was done to create various paths for login, signup, CRUD operations etc.
Npm bcrypt package was especially useful for encoding the passwords and later the app admin access was secured by JSON web token.SendGrid is used to send emails to user for subscription.

This app had multiple difficulties. Connecting to mongodb atlas was cumbersome,often i would lose connection on closing vscode or messing he connection string, or putting the wrong URL, each time
there was a new debug method required.Building userschemas was interesting but i had to read the documentation to understand all functionalities and navigating through it was at
times confusing. Effort went into ensuring that once a user has signed up with the an email, it cant be used by another user. Often i forgot to console log the error or there were typos.
The biggest obstacle was integrating frontend without postman and deploying it which i was not able to overcome. But i will work on it using express and try finding suitable tutorials.
