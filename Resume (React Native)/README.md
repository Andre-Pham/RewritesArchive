# Resume
My digital resume. Try out the latest release on web [here](https://Andre-Pham.github.io/Resume/).

Built in React Native, hosted by GitHub Pages. I wouldn't typically use (nor recommend) React Native for a website, but I wanted to get more practice using it.

## Setup

1. Make sure you have latest version of Node.js installed
2. Clone the repository in your local directory

```
$ git clone https://github.com/Andre-Pham/Resume.git
```

2. Open the project directory and run `npm install`

## Running on Web

In the project directory, run the following:

```
$ npm run web
```

## Deployment

To redeploy, run in the project directory:

```
$ npm run deploy
```

The application will be built and published automatically from the `gh-pages` branch.

## Prettify

To prettify (format) all code, run the following in the project directory:

```
$ npx prettier . --write
```

To not lint specific code blocks, refer to the following: https://prettier.io/docs/en/ignore.html
