module.exports = {


  friendlyName: 'Destroy one thing',


  description: 'Delete one thing from D',


  inputs: {
    id:{
      type: 'number',
      required: true,
      description: 'The id of the thing to destroy'
    }
  },


  exits: {
    forbidden:{
      description:"Not such thing with this id",
      responseType: 'notFound'
    },
    notFound:{
      description:"The user making the request doesnt have the permissions to delete",
      responseType: 'forbidden'
    }
  },


  fn: async function (inputs) {

    var thing = await Thing.findOne({
      id: inputs.id
    });

    if(!thing){ throw 'notFound';}

    if(thing.Owner !== this.req.me.id){
      throw 'forbidden';
    }


    await Thing.destroy({id: inputs.id});
    // All done.
    return;

  }


};
