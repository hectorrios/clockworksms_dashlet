/**
 * Created by hrios on 06/12/15.
 */
(function() {

    var clearFields = function(dashlet) {

        dashlet.$el.find('#sms-from').val('');
        dashlet.$el.find('#sms-to').val('');
        dashlet.$el.find('#sms-message').val('');
    };

    return {
        //This view uses the essential Dashlet plug-in
        plugins: ['Dashlet'],

        className: 'row-fluid',

        id: 'clockworkDashlet',

        events: {
            'click [data-action="send"]': 'sendSms'
        },

        /*
         Dashlet properties
         */
        apiKey: undefined,

        apiKeyPresent: true,

        blockUIEnabled: false,

        /*
         Initialization
         */

        initDashlet: function (viewName) {

            if(this.meta.config) {
                //var api_key = this.settings.get("api_key") || "not_set";
                //this.settings.set("api_key", api_key);
            }

            var isPreview = this.meta.preview ? this.meta.preview : false;

            if (!this.createMode && this.settings && !isPreview) {

                this.apiKey = this.settings.get('api_key') || 'not_set';

                this.apiKey = (this.apiKey && this.apiKey.trim().length === 0) ? 'not_set' : this.apiKey;

                if (this.apiKey === 'not_set') {

                    app.alert.show('missing_api_key', {
                        level: 'error',
                        messages: 'The API Key was not set on the settings page',
                        autoClose: false
                    });
                    this.apiKeyPresent = false;
                }
            }
        },

        initialize: function (options) {
            this._super('initialize', [options]);

            if ($ && $.blockUI) {
                this.blockUIEnabled = true;
            } else {
                this.blockUIEnabled = false;
            }


        },

        /*
         Event Handlers
         */

        sendSms: function () {

            //grab the form information
            var formInfo = getSmsFormInfo(this);
            //var fromValue = this.$el.find('#sms-from').val();
            //
            //console.log('The from value is: ', fromValue);
            //
            //var message = this.$('#sms-message').val();
            //console.log('The message is: ', message);

            var restURL = app.api.buildURL('ClockworkSMS/send');

            console.log('The rest url is: ', restURL);

            //var toNumber = this.$el.find('#sms-to').val();
            //
            //var fromName = this.$el.find('#sms-from').val();

            var self = this;

            app.api.call('create', restURL, {
                to_number: formInfo.toNumber,
                api_key: this.apiKey,
                message: formInfo.message,
                from_name: formInfo.fromName
            }, {
                success: function (data) {


                    if (self.blockUIEnabled) {
                        $('#clockworkDashlet').unblock();
                    }

                    data = data || {};

                    if (data === 'Invalid API Key') {
                        app.alert.show('invalid_api_key', {
                            level: 'error',
                            messages: 'The API Key provided is invalid.',
                            autoClose: false
                        });
                    }

                    if (data.success === 0 && _.has(data,'error_code')) { //We have an error
                        app.alert.show('error_sending_sms', {
                            level: 'error',
                            messages: data.error_message,
                            autoClose: false
                        });
                    } else { //It worked

                        clearFields(self);
                    }

                    console.log('The data passed back is: ', data);
                },

                error: function(result) {

                    if (self.blockUIEnabled) {
                        $('#clockworkDashlet').unblock();
                    }
                    console.log('The result is: ', result);
                }
            });

            if (this.blockUIEnabled) {
                $('#clockworkDashlet').block({ message: '<h1>Sending...</h1>' });
            }

        },

        loadData: function (options) {
            this._super('loadData', [options]);

            var isPreview = this.meta.preview ? this.meta.preview : false;

            if (!this.createMode && !isPreview) {
                console.log('I am getting called the second time');
            }

            //check the settings object.
            //check the options param, what is in there?
        }

    };

    function getSmsFormInfo (dashlet) {

        var formInfo = {};

        formInfo.message = dashlet.$('#sms-message').val();
        console.log('The message is: ', formInfo.message);

        formInfo.toNumber = dashlet.$el.find('#sms-to').val();

        //grab the from information
        formInfo.fromName = dashlet.$el.find('#sms-from').val();

        return formInfo;
    }

})();
