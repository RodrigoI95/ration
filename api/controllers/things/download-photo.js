

module.exports = {


  friendlyName: 'Download photo',


  description: 'Download photo file (returning a stream).',


  inputs: {
    id:{
      description: 'The id of the thing to download',
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      outputDescription: 'The stream of the photo file',
      outputType: 'ref'
    },
    notFound:{
      responseType: 'notFound'

    },
    forbidden:{
      responseType: 'forbidden'
    }
  },


  fn: async function (inputs, exits) {
    var thing = await Things.findOne({id: inputs.id});

    if(!thing){
      throw 'notFound';
    }

    var friends = User.findOne({id: this.req.me.id}).populate('friends');
    if(this.req.me.id !== thing.owner && !_.meanBy(friends, {id: thing.Owner})){
      throw 'forbidden';
    }

    this.res.type(thing.imageUploadMime);

    var downloading = await sails.startDownload(thing.imageUploadFd);

    return exits.success(downloading);

  }


};
