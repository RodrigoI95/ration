/**
 * Thing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    label: {
      type: "string",
      example: "Mr. Waffle",
      description: "The thing's label", 
    },

    imageUploadFd:{
      type: "string",
      description: "The skipper file descriptor of the image uploaded",
      //required: true,
    },

    imageUploadMime:{
      type: "string",
      description: "The mime type of the image uploaded",
      //required: true,
    },
    expectedReturnAt:{
      type: 'number',
      description: 'timestam representing moment of expected return',
      example: 1547897200,
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    Owner :{
      model: 'User',
      required: true,
    },
    borrowedBy:{
      model: 'User',
      description: 'The user who borrowed this thing',
    }

  },

};

