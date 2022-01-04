module.exports = {


  friendlyName: 'Deliver overdue item notifications',


  description: '',


  fn: async function () {
    var moment = require('moment');

    var overdueThings = await Thing.find({
      borrowedBy: { '!=': null },
      expectedReturnAt: { '<=': Date.now() - 1000*60*60*12}
    })
    .populate('Owner')
    .populate('borrowedBy');

    for(let overdueThing in overdueThings){
      // Format our text for the notification email.
      var itemLabel = overdueThing.label || 'your borrowed item';
      var formattedExpectedReturnAt = moment(overdueThing.expectedReturnAt).format('dddd, MMMM Do');

      // Send the owner a notification email.
      await sails.helpers.sendTemplateEmail.with({
        to: overdueThing.borrowedBy.emailAddress,
        subject: `It's time to return ${overdueThing.owner.fullName}'s ${overdueThing.label || 'item'}!`,
        template: 'email-overdue-notice',
        templateData: {
          ownerName: overdueThing.owner.fullName,
          ownerEmail: overdueThing.owner.emailAddress,
          itemLabel: itemLabel,
          fullName: overdueThing.borrowedBy.fullName,
          expectedReturnAt: formattedExpectedReturnAt,
          baseUrl: sails.config.custom.baseUrl
        }
      });
    }

    sails.log('Running custom shell script... (`sails run deliver-overdue-item-notifications`)');

  }


};

