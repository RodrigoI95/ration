

module.exports = {


  friendlyName: 'Add friends',


  description: '',


  inputs: {
    friends:{
      description: 'An array of friends to send invites to.',
      type: [
        {
          emailAddress: 'string',
          fullName: 'string'
        }
      ],
      example:[
        {
          emailAddress: 'foo@example.com',
          fullName: 'Foo Bar'
        }
      ],
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    console.log(inputs, inputs.friends);
    for (let friend of inputs.friends) {

      // Check for an existing account for this user.
      var existingUser = await User.findOne({ emailAddress: friend.emailAddress });

      if(existingUser) {
        // Update this user's `inboundFriendRequests`.
        await User.addToCollection(existingUser.id, 'inboundFriendRequests')
        .members([this.req.me.id]);

        // Send a notification email.
        await sails.helpers.sendTemplateEmail.with({
          to: friend.emailAddress,
          subject: `${this.req.me.fullName} wants to share stuff on Ration!`,
          template: 'email-new-friend-request',
          templateData: {
            potentialFriendFullName: this.req.me.fullName,
            fullName: friend.fullName,
            baseUrl: sails.config.custom.baseUrl
          }
        });
      }
      else {
        // Otherwise, we need to create a new user.
        var token = await sails.helpers.strings.random('url-friendly');
        var newUser = await User.create({
          fullName: friend.fullName,
          emailAddress: friend.emailAddress,
          emailProofToken: token,
        }).fetch();

        // Update this user's `inboundFriendRequests`.
        await User.addToCollection(newUser.id, 'inboundFriendRequests')
        .members([this.req.me.id]);

        // Send a notification email.
        await sails.helpers.sendTemplateEmail.with({
          to: friend.emailAddress,
          subject: `${this.req.me.fullName} wants to share stuff on Ration!`,
          template: 'email-new-user-invite',
          templateData: {
            potentialFriendFullName: this.req.me.fullName,
            fullName: friend.fullName,
            baseUrl: sails.config.custom.baseUrl,
            token: token
          }
        });
      }

    }

  }


};
