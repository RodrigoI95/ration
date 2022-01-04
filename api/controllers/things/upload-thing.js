module.exports = {


  friendlyName: 'Upload thing',


  description: '',

  files: ['photo'],

  inputs: {
    photo: {
      description: 'Upstream for an incoming file upload.',
      type: 'ref'
    },

    label: {
      type: 'string',
      description: 'A (very) brief description of the item.'
    },
  },


  exits: {
    badRequest:{
      description:"No image was uploaded ",
      responseType: 'badRequest'
    },
    success:{
      outputDescription: '',
      outputType: {
        id: 'number',
        imageSrc: 'string',
      }
    }
  },


  fn: async function (inputs, exits) {

    var url = require('url');

    console.log(inputs.photo);
    var info = await sails.uploadOne(inputs.photo);
    console.log(info);

    if(!info){
      throw 'badRequest';
    }

    var newThing = await Thing.create({
      imageUploadFd: info.fd,
      imageUploadMime: info.type,
      Owner: this.req.me.id,
      label: inputs.label
    }).fetch();

    

    return exits.success({ 
      id: newThing.id,
      imageSrc: url.resolve(sails.config.custom.baseUrl, '/api/v1/things/'+ newThing.id)
    });

  }


};
