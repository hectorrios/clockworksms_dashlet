/**
 * Created by hrios on 12/12/15.
 */

(function() {
    return {
        //className: 'well well-small',

        id: 'clockworksms-setup-id',

        blockUIEnabled: false,

        apiKey: undefined,

        initialize: function (options) {
            this._super('initialize', [options]);

            this.on('fetchapikey', this.render, this);
            this.listenTo(this.model, 'start_save_clockworksms_api_key',
                this.startBlocking);
            this.listenTo(this.model, 'end_save_clockworksms_api_key',
                this.endBlocking);

            //Fetch the API KEY if it already exists and set the apiKey property
            this.fetchApiKey();
            debugger;
        },

        render: function () {
            debugger;
            this._super('render');

            return this;
        },

        remove: function () {
            debugger;
            this._super('remove');
        },

        /*
         Helpers
         */

        fetchApiKey: function () {
            var self = this;

            //Fetch the API key
            var restURL = app.api.buildURL('ClockworkSMS/getapikey');
            app.api.call('read', restURL, null, {
                success: function (data) {
                    if (data.success === 1 && _.has(data, 'payload') && !self.disposed) {
                        //self.apiKey = data.payload.apiKey;
                        self.model.set(data.payload);
                    } else { //No API Key was found which is Ok.
                        console.log('No API Key was found.');
                    }

                    //trigger fetchapikey event
                    self.trigger('fetchapikey');
                },

                error: function(result) {
                    debugger;
                    console.log('Inside the ClockworkSMS error callback. The result ' +
                        'object is: ', result);
                    if (!self.disposed) {
                        app.alert.show('get-api-comm-failure', {
                            level: 'error',
                            messages: 'A communication error has occurred',
                            autoClose: false
                        });

                        //trigger fetchapikey event
                        self.trigger('fetchapikey');
                    }
                }
            });
        },

        startBlocking: function (blockUIEnabledFlag) {
            if (blockUIEnabledFlag) {
                $('#clockworksms-setup-id').block({ message: '<h1>Saving...</h1>' });
            }
        },

        endBlocking: function (blockUIEnabledFlag) {
            if (blockUIEnabledFlag) {
                $('#clockworksms-setup-id').unblock();
            }
        }
    };
})();
