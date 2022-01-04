module.exports = {


  friendlyName: 'Mark as retuned',


  description: '',


  inputs: {
    id:{
      type: 'number',
      description: 'The id of the thing to mark as returned',
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    console.log(inputs);
    // All done.
    var updatedThing = await Thing.update({id: inputs.id},{
      borrowedBy: null,
      expectedReturnAt: 0,
    }).fetch();

    console.log(updatedThing);
    return exits.success(updatedThing);

  }


};
