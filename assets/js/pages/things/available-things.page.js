parasails.registerPage('available-things', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //delete things
    selectedThing: undefined,
    confirmDeleteThingModalOpen: false,
    syncing: false,
    //server error state
    cloudError:'',
    //Form errors
    formErrors:{

    },
    //upload thing
    uploadThingModalOpen: false,
    uploadFormData:{
      label:'',
      photo:undefined,
    },
    //borrow thing
    borrowThingModalOpen: false,
    selectedBorrowThing: undefined,
    //mark as returned
    markAsReturnedModalOpen: false,
    thingToMarkAsReturned: undefined,
    //give back
    giveBackModalOpen: false,
    thingToGiveBack: undefined,
    giveBackText : '',
    //contact owner
    contactOwnerModalOpen: false,
    thingToContactOwner: undefined,
    contactOwnerText : '',

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //Delete thing methods
    clickDeleteThing: async function(thingId){
      console.log("clicked thing: " + thingId);
      this.confirmDeleteThingModalOpen = true;
      this.selectedThing = _.find(this.things, {id: thingId});
    },
    closeDeleteThingModal: function(){
      this.selectedThing = undefined;
      this.confirmDeleteThingModalOpen = false;
    },
    handleParsingDeleteThingForm: function(){
      console.log("handle parse id "+this.selectedThing.id);
      return{
        id: this.selectedThing.id
      };
    },
    submittedDeleteThingForm: function(){
      console.log("it worked!");
      _.remove(this.things, {id: this.selectedThing.id});
      this.$forceUpdate();
      console.log(this.selectedThing.id);
      this.confirmDeleteThingModalOpen = false;
      this.selectedThing = undefined;
    },
   
    // upload thing methods

    clickAddthing: function(){
      console.log('Opening thing upload modal...');
      this.uploadThingModalOpen = true;
    },

    closeUploadThingModal: function(){
      this._clearUploadThingModal();
    },

    _clearUploadThingModal: function(){
      this.uploadThingModalOpen = false;
      this.uploadFormData = {
        label:'',
        photo:undefined,
      };
      this.formErrors = {};
      this.cloudError = '';
    },

    handleParsingUploadThingForm: function(){
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.uploadFormData;

      if(!argins.photo) {
        this.formErrors.photo = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }
      console.log(argins);
      return{
        photo:argins.photo,
        label:argins.label,
      };
    },

    submittedUploadThingForm: function(result){

      this.things.push({
        label: this.uploadFormData.label,
        id:result.id,
        Owner: {
          id: this.me.id,
          fullName: this.me.fullName,
        }

      });
      this._clearUploadThingModal();
    },

    changeFileInput: function(files){
      var selectedFile = files[0];
      if(!selectedFile) {
        this.uploadFormData.photo = undefined;
        return;
      }

      this.uploadFormData.photo = selectedFile;

    },
    changeLabelInput: function(value){
      this.uploadFormData.label = value;
    },

    //borrow
    clickBorrowthing: function(thingId){
      console.log('Opening thing borrow modal... id: ' + thingId);
      this.borrowThingModalOpen = true;
      this.selectedBorrowThing = _.find(this.things, {id: thingId});
      this.selectedBorrowThing.borrower = this.me.id;
    },
    closeBorrowThingModal: function(){
      this._clearBorrowThingModal();
    },
    _clearBorrowThingModal: function(){
      this.uploadThingModalOpen = false;
      this.selectedBorrowThing = undefined;
    },
    handleParsingBorrowThingForm: function(){
      if(!this.selectedBorrowThing.returnDate || !this.selectedBorrowThing.id){
        return;
      }
      console.log(this.selectedBorrowThing);
      return this.selectedBorrowThing;
    },
    submittedBorrowThingForm: function(){
      this.uploadThingModalOpen = false;
      this.$forceUpdate();
    },
    changeDateInput: function(value){
      var date = new Date(value);
      const secondsSinceEpoch = Math.round(date.getTime() / 1000);
      console.log(secondsSinceEpoch);
      this.selectedBorrowThing.returnDate = secondsSinceEpoch;
    },

    //Mark as returned methods
    clickMarkAsReturnedThing: function(thingId){
      this.markAsReturnedModalOpen = true;
      this.thingToMarkAsReturned = _.find(this.things, {id: thingId});


    },
    closemarkAsReturnedModal: function(){
      this.markAsReturnedModalOpen = false;
    },
    handleParsingmarkAsReturnedForm: function(){
      if(!this.thingToMarkAsReturned.id){
        return;
      }
      console.log(this.thingToMarkAsReturned);
      return this.thingToMarkAsReturned;
    },
    submittedMarkAsReturnedForm: function(){
      this.thingToMarkAsReturned = undefined;
      this.markAsReturnedModalOpen = false;
      this.$forceUpdate();
    },


    //Give back methods
    clickGiveBackThing: function(thingId){
      this.giveBackModalOpen = true;
      this.thingToGiveBack = _.find(this.things, {id: thingId});
    },
    closeGiveBackModal: function(){
      this.giveBackModalOpen = false;
    },
    handleParsingGiveBackForm: function(){
      console.log(this.thingToGiveBack.label,this.giveBackText );
    },
    submittedGiveBackForm: function(){
      this.thingToGiveBack = undefined;
      this.giveBackModalOpen = false;
      this.$forceUpdate();
    },
    changeGiveBackTextInput: function(value){
      this.giveBackText = value;
    },
    //Contact owner methods
    clickContactOwnerThing: function(thingId){
      this.contactOwnerModalOpen = true;
      this.thingToContactOwner = _.find(this.things, {id: thingId});
    },
    closeContactOwnerModal: function(){
      this.contactOwnerModalOpen = false;
      this.thingToContactOwner = undefined;
    },
    handleParsingContactOwnerForm: function(){
      console.log(this.thingToContactOwner.label,this.contactOwnerText );
    },
    submittedContactOwnerForm: function(){
      this.contactOwnerModalOpen = false;
      this.thingToContactOwner = undefined;
      this.$forceUpdate();
    },
    changeContactOwnerTextInput: function(value){
      this.contactOwnerText = value;
    }
  }
});
