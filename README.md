# Insights Dashboard

## Before you start

You will need the following:

* For your reference the documentation of Meta Insights APIs used in this project are:
    - [Page Insights API](https://developers.facebook.com/docs/platforminsights/page)
    - [Video Insights API](https://developers.facebook.com/docs/video-api/guides/insights/)
    - [Instagram Insights API](https://developers.facebook.com/docs/instagram-api/guides/insights)

* If running locally:
    * [nodeJS](https://nodejs.org/en/download/), which you can install via Homebrew(MacOS only) - `brew install node`
* If running in devcontainer:
    * [Docker](https://www.docker.com/) or another environment that supports devcontainers e.g. [GitHub Codespaces](https://github.com/features/codespaces).

* You will need to have a Facebook Page and an App created in Meta Developers. If you don’t have an app, follow the guide [here](https://developers.facebook.com/docs/development/) to create your app first.

* In order to run the Insights Dashboard app, you will need to update the configuration file by adding the:
    - [Facebook Page ID and Access Token](https://developers.facebook.com/docs/pages/access-tokens)
    - [Instagram User ID and Access Token](https://developers.facebook.com/docs/instagram-api/getting-started)

* The Instagram Insights are optional for this project. If you don't want to use this IG Insights, remove its properties from configuration file.

## Running the project

### `npm install`

Installs project dependencies.
Open the terminal and run `npm install`.

### `config.json`
File with your Meta information related to Pages and Instagram to fetch the Insights data.
Open the  `config.json` file in the root folder of the project and replace the placeholders (PAGE_ID, PAGE_ACCESS_TOKEN, IG_USER_ID, IG_ACCESS_TOKEN) with your Facebook Page and IG User information (IDs and Tokens).

### `npm run dev`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.


### `npm run cypress`

Launches the test runner with Cypress in the interactive watch mode.

## License
Reels Publishing APIs is Meta Platform Policy licensed, as found in the LICENSE file.
