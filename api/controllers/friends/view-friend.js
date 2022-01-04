module.exports = {


  friendlyName: 'View friend',


  description: 'Display "Friend" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/friends/friend'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
