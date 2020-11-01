const Discord = require('discord.js');

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
      Hey ${user.username}! 
      
      You've subscribed to notifications for this: ${reaction.emoji.name}.
    `);

    /*
    Handle subscription process
    if role does not exist for emoji, create new role
    assign user to role
    */

    //console.log(reaction.users);
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
    // Now the message has been cached and is fully available
    console.log(`${reaction.count} user(s) have reacted to this message.`);
    console.log(`${reaction.emoji.name} emoji added by "${user.username}".`);

    webhookClientReactionListener.users.cache.get(user.id).send(`
      Hey ${user.username}! 
      
      Just letting you know that you've just unsubscribed to notifications for this: ${reaction.emoji.name}.
    `);

    /*
    Handle removal of subscription
    unassign user from role
    */

    //console.log(reaction.users);

    console.log(user);
  }
);

webhookClientReactionListener.on('message', (message) => {
  console.log(message.content);
});

webhookClientReactionListener.once('ready', () => {
  console.log('stonkbot ready to annoy people!');
});

// initialize
webhookClientReactionListener.login(process.env.DEMSTONKS_BOT_APP_TOKEN);
