# Discord Login Thingy with Express

So, this is a little Express app that lets people log in using their Discord account. Pretty standard stuff: it uses Passport for the heavy lifting with Discord, saves user info in MongoDB, and keeps track of who's logged in with sessions.

## What You'll Need

*   **Node.js:** Get it from [nodejs.org](https://nodejs.org/) if you haven't already.
*   **MongoDB:** Make sure you have Mongo installed and running.
*   **A Discord App:** You gotta create one over at the [Discord Developer Portal](https://discord.com/developers/applications) to get your `Client ID` and `Client Secret`.

## Getting it Running

1.  **Grab the Code:**
    If you cloned this, cool. If not, download it.
2.  **Install the Bits and Bobs:**
    Open your terminal in the project folder and run:
    ```bash
    npm install
    ```
3.  **The `.env` File (Super Important!)**
    *   Create a file named `.env` in the main project folder.
    *   Copy this stuff into it and fill in your details:

        ```env
        # What port the app runs on
        PORT=3000

        # How to connect to your MongoDB
        MONGO_URL=mongodb://localhost:27017/CRUD_users

        # Your Discord App's details
        DISCORD_CLIENT_ID=YOUR_DISCORD_CLIENT_ID_GOES_HERE
        DISCORD_CLIENT_SECRET=YOUR_DISCORD_CLIENT_SECRET_GOES_HERE
        DISCORD_CALLBACK_URL=http://localhost:3000/api/auth/discord/redirect

        # Just a random string for sessions
        SESSION_SECRET=picksomethingrandomandlong
        ```
    *   **Heads up!** That `DISCORD_CALLBACK_URL` needs to be *exactly* what you put in your Discord app's "Redirect URIs" settings. For local testing, `http://localhost:3000/api/auth/discord/redirect` is usually the one.

4.  **Fire it Up!**
    ```bash
    npm start
    ```
    Or just `node app.js`. It should tell you it's running, probably on port 3000.

## How it Works (The Gist)

*   `/api/auth/discord`: Kicks off the login with Discord.
*   `/api/auth/discord/redirect`: Where Discord sends the user back after they say "yes" (or "no").
*   `/auth/status`: A quick way to check if someone's logged in.
*   `/auth/logout`: Logs 'em out.

It uses Express for the web server, Mongoose for talking to MongoDB, Passport for the Discord login dance, and `express-session` (with `connect-mongo`) to remember who's logged in.

## Folder Map

```
.
├── .env                # Your secrets and settings
├── app.js              # The main brain
├── Strategies/
│   └── discord_strategy.js # How Passport talks to Discord
├── mongoose/
│   └── schema/
│       └── discord-schema.js # What a Discord user looks like in the database
├── routes/
│   └── routes.js       # (Probably where your API routes live)
└── ... other stuff
```

## Wanna Help?

Sure, why not? If you have ideas or find bugs, feel free to open an issue or send a pull request.

---

Hope that sounds a bit more like a human wrote it!# Discord Login Thingy with Express

So, this is a little Express app that lets people log in using their Discord account. Pretty standard stuff: it uses Passport for the heavy lifting with Discord, saves user info in MongoDB, and keeps track of who's logged in with sessions.
