# Brad Traversy - Youtube tutorials 04 - Vue JS Crash Course 2021

## [Tutorial video on Youtube](https://youtu.be/qZXt1Aom3Cs)

## Run:

- `npm install` to download node_modules
- add `.env` file with `DB_CONNECT` environment variable
- `netlify dev` to run the netlify server

## Deployed

- [On Netlify](https://gabriels-youtube-tutorial-brad-traversy-vue-crash-course.netlify.app/)

## Mayor changes:

- I added back-end to the project
  - I'm using serverless functions on Netlify to keep my secret API key hidden.
  - I'm using mongoose in the serverless function to save the data in a mongoDB database.
  - I turned the backend function into a RESTful API.

## Environment variable:

- `DB_CONNECT=mongodb://localhost:27017/TasksDB`
