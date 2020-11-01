const Discord = require('discord.js');

const { DEMSTONKS_BOT_APP_TOKEN, SERVER_ID } = require('../../../constants');

const webhookClientReactionListener = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

webhookClientReactionListener.on(
  'messageReactionAdd',
  async (reaction, user) => {
    // When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) {
      // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
      try {
        await reaction.fetch();
      } catch (error) {
        console.error(
          'Something went wrong when fetching the message: ',
          error
        );
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }
    // Now the message has been cached and is fully available
    console.log(`${reaction.count} user(s) have reacted to this message.`);
    console.log(`${reaction.emoji.name} emoji added by "${user.username}".`);

    webhookClientReactionListener.users.cache.get(user.id).send(`
      Hey ${user.username}! You've subscribed to notifications for this: ${reaction.emoji.name}.
    `);

    //Handle subscription process
    const guild = await webhookClientReactionListener.guilds.cache.get(
      SERVER_ID
    );
    let roleName = reaction.emoji.name;
    let role = guild.roles.cache.find((x) => x.name === roleName);

    if (!role) {
      // Role doesn't exist, safe to create a new role
      guild.roles
        .create({
          data: {
            name: roleName,
            color: '#B8BBBE',
          },
        })
        .then(console.log)
        .catch(console.error);
    }

    //assign user to role
    let member = guild.members.cache.find((member) => member.id === user.id);
    member.roles.add(role);
  }
);

webhookClientReactionListener.on(
  'messageReactionRemove',
  async (reaction, user) => {
    // When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) {
      // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
      try {
        await reaction.fetch();
      } catch (error) {
        console.error(
          'Something went wrong when fetching the message: ',
          error
        );
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }

    webhookClientReactionListener.users.cache.get(user.id).send(`
      Hey ${user.username}! Just letting you know that you've just unsubscribed to notifications for this: ${reaction.emoji.name}.
    `);

    //Handle subscription process
    const guild = await webhookClientReactionListener.guilds.cache.get(
      SERVER_ID
    );
    let roleName = reaction.emoji.name;
    let role = guild.roles.cache.find((x) => x.name === roleName);

    if (role) {
      //assign user to role
      let member = guild.members.cache.find((member) => member.id === user.id);
      member.roles.remove(role);
    }
  }
);

webhookClientReactionListener.once('ready', () => {
  console.log('stonkbot ready to annoy people!');
});

// initialize
webhookClientReactionListener.login(DEMSTONKS_BOT_APP_TOKEN);
