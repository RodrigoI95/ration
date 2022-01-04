parasails.registerPage('friend', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    AddFriendsModalOpen: false,
    syncing: false,
    //server error state
    cloudError:'',
    addFriendsFormData:{
      friends: [
        {
          emailAddress: '',
          fullName: '',
        }
      ],
    },
    index: 0,

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    clickInviteButton: function(){
      this.AddFriendsModalOpen = true;
    },
    closeAddFriendsModal: function(){
      console.log(this.addFriendsFormData);
      this.AddFriendsModalOpen = false;
      this.addFriendsFormData= {
        friends: [
          {
            emailAddress: '',
            fullName: '',
          }
        ],
      }
    },
    handleParsingAddFriendsForm: async function(){
      console.log(this.addFriendsFormData);
      return this.addFriendsFormData;
    },
    submittedAddFriendsForm: async function(){
      console.log(this.addFriendsFormData);
      this.AddFriendsModalOpen = false;
      this.addFriendsFormData= {
        friends: [
          {
            emailAddress: '',
            fullName: '',
          }
        ],
      }

    },
    clickAddMoreButton: function(text){
      this.index +=1;
    },
    changeFullName: function(text){
      this.addFriendsFormData.friends[this.index].fullName = text;
      console.log(this.addFriendsFormData.friends[this.index].fullName);
    },
    changeEmail: function(text){
      this.addFriendsFormData.friends[this.index].emailAddress = text;
      console.log(this.addFriendsFormData.friends[this.index].emailAddress);
    },
  }
});
