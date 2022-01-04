module.exports = {


  friendlyName: 'Borrow thing',


  description: '',


  inputs: {
    borrower:{
      type: 'number',
      description: 'The id of the user who is borrowing the thing',
      require: true,
    },
    returnDate:{
      type: 'number',
      description: 'The date when the thing will be returned',
    },
    id:{
      type: 'number',
      description: 'The id of the thing to borrow',
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    console.log(inputs);
    // All done.

    var updatedThing = await Thing.update({id: inputs.id},{
      borrowedBy: inputs.borrower,
      expectedReturnAt: inputs.returnDate,
    }).fetch();

    return exits.success(updatedThing);


  }


};
