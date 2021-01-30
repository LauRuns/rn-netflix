# React Native app for searching Netflix content

This project was created with the Expo cli. [More on installing the Expo cli from the React Native docs](https://reactnative.dev/docs/environment-setup).
Expo official docs can be found [here](https://expo.io).

## Description

This React Native app is part of a school/study project. It uses an API, which is part of the project, for user authentication and persisting userdata. The API can be found on this Github as well.
The app focusses on presenting the user which Netflix content will be deleted and which new content has been added. For this, the app uses a third party API from [Rapidapi](https://rapidapi.com/unogs/api/unogsng) to search and fetch all the content. The user is able to query the API through this app.
Furthermore, the user is able to save Netflix content items to a list of favorites.

## This is a study project

This is just a project for my study. Therefore teachers/instructors will receive a seperate file containing all API-keys and will not need to go through the section: Set-up guide.

## Prerequisites

- It is required that you have Nodejs installed on your machine before installing this project
- The backend (project API) must be running and configured correctly (See the included README.md in the API Github repo)
- Android studio must be installed
- Xcode must be installed (Mac)

### How to check if Node is installed?

Open a terminal and run:

```
node -v
```

This should return a version number, something like: `v12.18.3`

If you do not yet have Node installed you can do so by going to: [https://nodejs.org/en/](https://nodejs.org/en/)
or if you are on a Mac and use Homebrew run:

```
brew install node
```

After installation run the `node -v` command again and verify that Node is installed correct.

## Set-up guide

This app uses the [unogsNG](https://rapidapi.com/unogs/api/unogsng) API. For this you will need to sign up with Rapidapi and create a API-key. This key must be set in the environment variables.

### Environment variables

Create a `.env` file in the root folder and enter all environment variables as listed in the `.env-example.txt` which you find in the root folder.

- You will need to set a connection string at which the app will reach out to the API that is part of this overall project. Make sure that the `CONNECTION_STRING` in both the API and Webapp use the same address and port. A suggested port is given in the `.env.example.txt`
- Next you will need to set the `ASSET_URL` which is used to fetch and set the user images/avatar. The `ASSET_URL` does <b>NOT</b> end with `/api`!!<br />
  <img src="https://github.com/LauRuns/readme-gifs/blob/main/rn/rn-setting-env.gif?raw=truegif" alt='Set .env' />

## Installation

Clone the project to your designated folder and run

```
npm install
```

All the project dependencies will be installed and a `node_modules` folder is created.

## Demo

After setting the environment variables and having run the `npm install` command, start the app by running the command:

```
npm run start
```

A informative message now appears in your terminal.<br />
<img src="./assets/expo-terminal.png" alt='Expo terminal' width='350'/>
<br />

### Get the address from the terminal and open it in the browser

<br />

<img src="https://github.com/LauRuns/readme-gifs/blob/main/rn/expo-terminal.gif?raw=true" alt='Expo terminal' width='400'/>
<br />
In the browser a page now opens which allows you to track any logs or errors from the running application. The logs and/or errors are also displayed in your terminal window. It also allows you to open the app on a emulator.
<i>Make sure that you have an emulator running.</i>
<br />
<img src="https://github.com/LauRuns/readme-gifs/blob/main/rn/expo-page-ios-emulator.gif?raw=true" alt='Expo webpage open iOS' width='400'/>
<br />

### Another option is to open the app from the terminal

When in the terminal press `i` to open the app on the iOS emulator and `a` for Android. An emulator needs to be openend first for Android.
<br />

### Login

The login page for the app should now be open:<br />

<img src="https://github.com/LauRuns/readme-gifs/blob/main/rn/rn-login.gif?raw=true" alt='Login' height='450'/>
<br />

### ...or Sign Up

<img src="https://github.com/LauRuns/readme-gifs/blob/main/rn/rn-signup.gif?raw=true" alt='Signup' height='450'/>
<br />
! <i>You can either sign up with a <b>fake</b> or <b>real</b> email address. If an actual email address is used, a notification will be send informing the user of the succesful sign up. This must be configured correctly using the project API with the SaaS transactional email sending set up. (See the included README in the API Github repo)</i><br />
<br />

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload upon saving your edits.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project status

This being a study project means many improvements can be made. Pull requests are welcome!
For now the app is ready to be used and is up and running on a private domain, accessible for teachers, instructors and other students.

## License

This project is not yet licensed.
