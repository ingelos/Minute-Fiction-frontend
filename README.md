# Minute Fiction Frontend

## Table of contents
1. Description
2. Screenshots Minute Fiction
3. Requirements 
4. Start Application
5. Examples of usage
6. Acknowledgements
7. Other Commands


## 1. Description

Minute Fiction is an application firstly developed for the Backend module of the Novi Hogeschool Full Stack Developer Bootcamp.
This frontend was developed to complete the application.

Minute Fiction is a platform for readers, authors and editors. 

- Users can read published stories and look up author profiles. 
- Users with an account can subscribe to the mailing and comment on stories.
- Users that have an author profile can submit their own stories to open themes.
- Editors can create themes, review and publish stories and send mailings.
- Editors currently have the role of an admin and can manage users and authorities.


## 2. Screenshot Minute Fiction homepage

![MF homepage.png](src/assets/images/MF%20homepage.png)


## 3. Requirements

This project was set up with [Vite] (https://vitejs.dev/guide/). React version 18.3.1 (https://react.dev).

- Node.js --> download here: https://nodejs.org/en/download/
- NPM (comes standard with Node.js)

Check if everything is installed correctly by typing the following in the terminal: 
```
node -v             // Check Node.js version
npm -v              // Check NPM version
```

```
npm install -g nodemon      // Insures application is automatically restarted with file changes
```


## 4. Start application

Step 1: Clone the repository to your local machine:

``` 
git@github.com:ingelos/Minute-Fiction-frontend.git
```
Step 2: install the required dependencies by running the following command in terminal:
```
npm install
```
Step 3: start the application:

``` 
npm run dev         // During development
```
After running this command, the application will start and be accessible in the browser at http://localhost:5173/


## 5. Examples of usage

Detailed story page where a user can comment on a story

![MF storyDetail.png](src/assets/images/MF%20storyDetail.png)

Editor dashboard story review page where an editor can accept or decline a story

![MF editorDashboard ReviewStories.png](src/assets/images/MF%20editorDashboard%20ReviewStories.png)


## 6. Acknowledgements

This project was inspired by EveryDay Fiction (https://everydayfiction.com)


## 7. Other commands

```
npm run build       // packages application for deployment - creates a build directory with a production build
```
```
npm run preview     // checks if everything in production works as expected
```
``` 
npm run lint        // gives an overview of programming errors, bugs, stylistic errors etc.
```