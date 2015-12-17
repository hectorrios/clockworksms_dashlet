/**
 * Created by hrios on 16/12/15.
 */

(function () {
    return {

        extendsFrom: "HeaderpaneView",

        events: {
            "click [name=save_button]":   "saveClicked",
            "click [name=cancel_button]": "cancelClicked"
        },

        blockUIEnabled: false,

        initialize: function (options) {
            this._super('initialize', [options]);
            this.blockUIEnabled = ($ && $.blockUI);
        },

        /*
        Event Handlers
         */

        saveClicked: function () {
            var apiKey = this.model.get('clockwork_sms_api_key');

            var restURL = app.api.buildURL('ClockworkSMS/apikey');

            var self = this;

            app.api.call('create', restURL, {
                api_key:  apiKey
            },{
                success: function (data) {

                    self.model.trigger('end_save_clockworksms_api_key',
                        self.blockUIEnabled);

                    if (data.success === 0 && _.has(data, 'error_code')) { //we have an error
                        app.alert.show('error_storing_api_key', {
                            level: 'error',
                            messages: data.error_message,
                            autoClose: false
                        });
                    } else {
                        app.alert.show('api-key-success-id', {
                            level: 'success',
                            messages: 'Saved!',
                            autoClose: true
                        });
                        app.router.goBack();
                    }

                },

                error: function (result) {

                    self.model.trigger('end_save_clockworksms_api_key',
                        self.blockUIEnabled);
                    console.log('An error occurred trying to save the api key. The ' +
                        'result is: ', result);
                }
            }); //End of app.api.call

            /*
            Trigger the start_save_clockworksms_api_key event on the model.
            The setup view is listening for it
             */
            this.model.trigger('start_save_clockworksms_api_key',
                this.blockUIEnabled);

        },

        cancelClicked: function () {
            app.router.goBack();
        }
    };
})();