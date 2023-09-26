<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/fbsamples/insights_dashboard">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Meta Insights API Dashboard</h3>

  <p align="center">
    A sample dashboard to jumpstart your Meta Insights API projects!
    <br />
    <br />
    <br />
    <a href="https://github.com/fbsamples/insights_dashboard/issues">Report Bug</a>
    ·
    <a href="https://github.com/fbsamples/insights_dashboard/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project showcases sample API usage for multiple Meta Insights API products, in a friendly easy-to-use dashboard.

* For your reference the documentation of Meta Insights APIs used in this project are:

    - [Ads Insights API](https://developers.facebook.com/docs/marketing-api/insights/)
    - [Page Insights API](https://developers.facebook.com/docs/platforminsights/page)
    - [Video Insights API](https://developers.facebook.com/docs/video-api/guides/insights/)
    - [Instagram Insights API](https://developers.facebook.com/docs/instagram-api/guides/insights)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

* In order to run the Insights Dashboard app, you will need to update the configuration file by adding the:

    - [Ad Account ID and User Access Token](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/)
    - [Facebook Page ID and Access Token](https://developers.facebook.com/docs/pages/access-tokens)
    - [Instagram User ID and Access Token](https://developers.facebook.com/docs/instagram-api/getting-started)

### Prerequisites

* If running locally:
    * [nodeJS](https://nodejs.org/en/download/), which you can install via Homebrew (MacOS only)  - `brew install node`
    * [yarn](https://classic.yarnpkg.com/lang/en/docs/install), which you can install via Homebrew (MacOS only) - `brew install yarn`
* If running in dev container:
    * [Docker](https://www.docker.com/) or another environment that supports dev containers e.g. [GitHub Codespaces](https://github.com/features/codespaces).

* You will need to have a Facebook Page / Ad account and an App created in Meta Developers. If you don’t have an app, follow the guide [here](https://developers.facebook.com/docs/development/) to create your app first.


### Installation

1. Run `npm install` or `yarn install`

    Installs project dependencies.
    Open the terminal and run `npm install` or `yarn install`.

2. Set up `.env.local` file

    Copy the file `.sample.env.local` to `.env.local`

    ```
    cp .sample.env.local .env.local
    ```

    Edit the `.env.local` file to add all the values for your project including your Meta information related to Pages, Instagram and Ad Account to fetch the Insights data.


## Usage
1. Run `npm run dev` or `yarn dev`

   Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

    The page will reload when you make changes. You may also see any errors in the console.

2. Run `npm run build` or `yarn build`
    Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

3. Run `npm run cypress` or `yarn cypress`

    Launches the test runner with Cypress in the interactive watch mode.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the Meta Platform Policy. See `LICENSE` file for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
