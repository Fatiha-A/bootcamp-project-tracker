// load environment variables from .env file
require("dotenv").config();

// get the port number from .env or use 3000 if not provided
const PORT = process.env.PORT || 3000;

// get the app name from .env or use default name
const APP_NAME = process.env.APP_NAME || "BootcampProjectTracker";

// export values so they can be used in other files
module.exports = { PORT, APP_NAME };
