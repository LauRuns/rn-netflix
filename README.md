# React Native app for searching Netflix content

This project was created with the Expo cli. [More on installing the Expo cli from the React Native docs](https://reactnative.dev/docs/environment-setup).
Expo official docs can be found [here](https://expo.io).

# Contents

- [Description](##description)
- [This is a study project](##this-is-a-study-project)
- [Prerequisites](##prerequisites)
- [How to check if Node is installed?](###how-to-check-if-Node-is-installed?)
- [Set-up guide](##set-up-guide)
- [Environment variables](###environment-variables)
- [Installation](#installation)
- [iOS](#ios)
- [Android](#android)
- [Demo](##demo)
  - [Login](###login)
  - [...or Sign Up](###...-or-sign-up)
- [Available scripts](##available-scripts)
- [Project state](##project-status)
- [License](##license)

## Description

This React Native app is part of a school/study project. It uses an API, which is part of the overall project, for user authentication and fetching userdata. The API can be found [here](https://github.com/LauRuns/netflix-api) on this Github.
The app focusses on presenting the user which Netflix content will be deleted and which new content has been added. For this, the app uses a third party API from [Rapidapi](https://rapidapi.com/unogs/api/unogsng) to search and fetch all the content. The user is able to query the API through this app.
Furthermore, the user is able to save Netflix content items to a list of favorites which is presented in the app.

## This is a study project

This is just a project for my study. Therefore teachers/instructors will receive a seperate file containing all API-keys and will not need to go through the section: [Set-up guide](##set-up-guide).

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

Create a `.env` file in the root folder and enter all environment variables as listed in the `env-example.txt` which you find in the root folder.

- You will need to set a connection string at which the app will reach out to the API that is part of this overall project. Make sure that the `CONNECTION_STRING` in both the API and Webapp use the same address and port. A suggested port is given in the `env.example.txt`
- Next you will need to set the `ASSET_URL` which is used to fetch and set the user images/avatar. The `ASSET_URL` does <b>NOT</b> end with `/api`!!<br />
  <img src="https://github.com/LauRuns/readme-gifs/blob/main/rn/rn-setting-env.gif?raw=true" alt='Set .env' />
- When using a local API to connect with, make sure that when using the Android emulator the `localhost` part of both CONNECTION_STRING and ASSET_URL are replaced by IP: `10.0.2.2`. Otherwise Android emulators running on the same machine are unable to connect to local API's/servers.

# Installation

Clone the project to your designated folder and run

```
npm install
```

All the project dependencies will be installed and a `node_modules` folder is created.

## Demo

After setting the environment variables and having run the `npm install` command, start the app by running the command:

```
npm run start:dev
```

A informative message now appears in your terminal window indicating the application is running. This will automatically open a browser page, if not, the address can be selected as shown below. <br />

### Get the address from the terminal and open it in the browser

<br />

<img src="https://github.com/LauRuns/readme-gifs/blob/main/rn/expo-terminal.gif?raw=true" alt='Expo terminal' width='400'/>
<br />
In the browser a page now be visible which allows you to track any logs or errors from the running application. The logs and/or errors are also displayed in your terminal window.

### iOS

- When in the terminal press `i` to open the app on the iOS emulator. Make sure that the `.env` connection string points to `localhost`.
  <br />

### Android

Android emulators need a different address to connect with a local running API/server.

- Stop the running Native application with `control + c` command in the terminal
- In de `.env` file, switch `localhost` to IP: `10.0.2.2`
- Restart the application with `npm run start:dev`

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

### `npm run start:dev`

Runs the app in the development mode.<br />
Open the iOS or Android emulator as explained in the section [iOS](###ios) or [Android](###android).
Saved changes wil be reflected in the running application.<br />

### `npm run lint-check`

Runs a linting check using the eslint.<br />
A result output is shown in the terminal<br />

## Project status

This being a study project means many improvements can be made. Pull requests are welcome!
For now the app is ready to be used and is up and running on a private domain, accessible for teachers, instructors and other students.

## License

This project is not yet licensed.
