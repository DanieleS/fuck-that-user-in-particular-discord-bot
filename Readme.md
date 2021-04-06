# F\*\*k that user in particular Discord Bot

This simple Discord bot has only one command:

```bash
!kick-${TARGET_NAME} # kick a specific user from the voice channel he's currently in.
```

## Configuration

The bot needs the following environment variables to be defined:

```bash
DISCORD_TOKEN= # the discord bot token
COMMAND_PREFIX= # the prefix of the command to be used. (eg. !)
TARGET_ID=  # the target id of the user to be kicked
TARGET_NAME= # the name of the user to be kicked. It will be used in the command name. (eg. Davide => !kick-davide)
```

## Deploy

The bot id already configured to run on Heroku. To deploy it follow this steps:

- Fork this repo
- Create the app both on [Discord](https://discord.com/developers/applications) and [Heroku](https://dashboard.heroku.com/apps)
- Create the Environment Variables in your app
- Connect the GitHub repository to your Heroku app
- Wait for the deply to complete
- Enable the `worker` dyno and disable `web`
- Invite the bot in your server
- Enjoy 🚀
