/**
 * Created by hrios on 06/12/15.
 */
(function() {

    var clearFields = function(dashlet) {

        dashlet.$el.find('#sms-from').val('');
        dashlet.$el.find('#sms-to').val('');
        dashlet.$el.find('#sms-message').val('');
        dashlet.$el.find('#sms-to-another-number').val('');

        //clear out the smsMessageObj object
        dashlet.smsMessageObj.fromName = '';
        dashlet.smsMessageObj.toNumber = '';
        dashlet.smsMessageObj.message = '';

    };

    var renderCount = 0;

    return {
        //This view uses the essential Dashlet plug-in
        plugins: ['Dashlet'],

        className: 'row-fluid',

        id: 'clockworkDashlet',

        events: {
            'click [data-action="send"]': 'sendSms',
            'click .phone-number' : 'useNumber',
            'click #another-number': 'useAnotherNumber'
        },

        /*
         Dashlet properties
         */
        debugMode: undefined,

        apiKeyPresent: true,

        blockUIEnabled: false,

        useAnotherNumberFlag: false,

        smsMessageObj: {
            toNumber: '',
            fromName: '',
            message: ''
        },

        /*
         Will be a hash with the name of the attribute
         as the key and and the attribute value
         */
        phoneList: undefined,

        /*
         Initialization
         */

        /**
         * @inheritDoc
         *
         * @param {string} viewName
         */
        initDashlet: function (viewName) {

            if (this.debugMode) {
                console.log('Entering the initDashlet function');

                if (viewName) {
                    console.log('The viewName parameter is ', viewName);
                }
            }

            if(this.meta.config) {
                //var api_key = this.settings.get("api_key") || "not_set";
                //this.settings.set("api_key", api_key);
            }

            var isPreview = this.meta.preview ? this.meta.preview : false;

            if (!this.createMode && this.settings && !isPreview) {

                //console.log('We are no longer using the dashlet configuration page');
                this.debugMode = this.settings.get('debug_mode') || false;

                //if (this.debugMode === 'not_set') {
                //    debugger;
                //    app.alert.show('missing_debug_mode', {
                //        level: 'error',
                //        messages: 'The Debug Mode option was not set on the settings page',
                //        autoClose: false
                //    });
                //}
            }
        },

        /**
         * @inheritDoc
         *
         * @param {options hash} options
         */
        initialize: function (options) {

            if (this.debugMode) {
                console.log('Executing the initialize function');
                console.log('Chaining up to the super initialize function');
            }

            this._super('initialize', [options]);

            if (this.debugMode && !($ && $.blockUI)) {
                console.log('jQuery plugin BlockUI is NOT enabled');
            }

            this.blockUIEnabled = ($ && $.blockUI);

            this.listenTo(this.model, 'change', this.render);

            if (this.debugMode) {
                console.log('Leaving the initialize function');
            }
        },

        /**
         * @inheritDoc
         *
         * @returns {View Controller} the pointer to "this" for chaining.
         */
        render: function () {
            //create the list of available phone numbers from the model.
            this.phoneNumbers();

            //chain up
            this._super('render');

            if (this.debugMode) {
                console.log('Render function. The render call count is: ',
                    ++renderCount);
            }

            return this;
        },

        /**
         * @inheritDoc
         *
         * @param {Object} options
         */
        loadData: function (options) {
            //TODO Do we still need this function?
            this._super('loadData', [options]);

            var isPreview = this.meta.preview ? this.meta.preview : false;

            if (!this.createMode && !isPreview) {
                console.log('I am getting called the second time');
            }
            //check the settings object.
            //check the options param, what is in there?
        },

        /*
         Event Handlers
         */

        sendSms: function () {

            if (this.debugMode) {
                console.log('Executing the sendSms function');
            }

            //grab the form information
            var formInfo = getSmsFormInfo(this);

            //validate the SMS Message object
            if (!this._validateSmsMessageObj()) {
                return;
            }

            var restURL = app.api.buildURL('ClockworkSMS/send');

            console.log('The rest url is: ', restURL);

            //var toNumber = this.$el.find('#sms-to').val();
            //
            //var fromName = this.$el.find('#sms-from').val();

            var self = this;

            app.api.call('create', restURL, {
                to_number: formInfo.toNumber,
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
                        //alert the user
                        app.alert.show('message-successful', {
                            level: 'success',
                            messages: 'Message sent.',
                            autoClose: true
                        });
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

        /**
         * Will take the value and put it in the textbox
         */
        useNumber: function (event) {
            event.preventDefault();
            //Is the <i> tag. We need the parent
            var $phoneNumber = $(event.toElement);
            this.$('#sms-to').val($phoneNumber.attr('data-phone-number'));
        },


        useAnotherNumber: function (event) {
            if (this.debugMode) {
                console.log('entering the useAnotherNumber function');
            }

            //Populate the smsMessageObj
            getSmsFormInfo(this);

            var checkbox = event.target;
            if (this.debugMode) {
                if (checkbox) {
                    console.log('The target of the event has an element');
                } else {
                    console.log('Oh Oh, the target of the event does not have ' +
                        'a element');
                }
            }

            if (checkbox && checkbox.checked) {
                if (this.debugMode) {
                    console.log('setting the useAnotherNumberFlag to true');
                }
                //this.$('#sms-to').parents('.row-fluid').first().css('backgroundColor',
                //        'red');

                //Try and hide the combolist of numbers
                //this.$('#sms-to').parents('.row-fluid').first().hide();

                //set the use another number flag to true and trigger re-render
                this.useAnotherNumberFlag = !this.useAnotherNumberFlag;
            } else { //Checkbox not checked
                if (this.debugMode) {
                    console.log('setting the useAnotherNumberFlag to false');
                }
                //set the use another number flag to false and trigger re-render
                this.useAnotherNumberFlag = !this.useAnotherNumberFlag;
                this.$('#sms-to').parents('.row-fluid').first().css('backgroundColor',
                    '');
            }

            //Trigger a re-render
            if (this.debugMode) {
                console.log('Triggering the render function');
            }
            this.render();

            if (this.debugMode) {
                console.log('Leaving the useAnotherNumber function');
            }
        },

        phoneNumbers: function () {

            if (this.debugMode) {
                var context = this.context;
                console.log('Fetching the LBL_OFFICE_PHONE text');
                console.log('using getAppString the value is: ',
                    app.lang.getAppString('LBL_OFFICE_PHONE'));
                console.log('Using getModString the value is: ',
                    app.lang.getModString('LBL_OFFICE_PHONE', context.get('module')));
            }
            _.each(this.model.fields, function (element) {
                this.phoneList = this.phoneList || {};
                if (typeof element === 'object') {
                    //If the type is 'phone' and it has a value
                    if (element.type === 'phone' && this.model.get(element.name)) {
                        this.phoneList[element.vname] =
                            this.model.get(element.name);
                    }
                }
            }, this);
        },

        /*
         Private methods
         */

        _validateSmsMessageObj: function () {
            var smsObj = this.smsMessageObj;

            var numberRegEx =
                /^[\s()+-]*([0-9][\s()+-]*){6,20}(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;


            //Make sure we at have a toNumber and a message
            if (!smsObj.toNumber || smsObj.toNumber === 'empty_val' ||
                smsObj.toNumber.trim().length < 1) {
                app.alert.show('to-number-invalid', {
                    level: 'error',
                    messages: 'The To Number must have a value.',
                    autoClose: false
                });

                return false;
            }

            //Match the number via RegEx
            if (!smsObj.toNumber.match(numberRegEx)) {
                app.alert.show('to-number-invalid', {
                    level: 'error',
                    messages: 'The To Number is not formatted properly.',
                    autoClose: false
                });

                return false;
            } else {
                /*
                It matched. Strip off any leading "+", parenthesis,
                and leading zeros
                 */
                var strippedNumber = this.__stripCharacters(smsObj.toNumber);
                if (this.debugMode) {
                    console.log('The value of the returned stripped num is: ',
                        strippedNumber);
                    console.log('The value of the SmsObj toNumber is: ',
                        smsObj.toNumber);
                }

                //set the new value on the Sms object
                smsObj.toNumber = strippedNumber;
            }

            if (!smsObj.message || smsObj.message.trim().length < 1) {
                app.alert.show('missing-sms-message', {
                    level: 'error',
                    messages: 'The message can not be blank.',
                    autoClose: false
                });

                return false;
            }

            return true;
        },

        __stripCharacters: function (number) {

            //Strip the parenthesis
            number = number.replace(')', '');
            number = number.replace(')', '');

            //Strip any leading + symbols
            number = number.replace(/^\+/, '');

            //Strip any leading 00 digits
            number = number.replace(/^(00)/, '');

            //Strip all blanks
            number = number.replace(/\s/g, '');

            return number;
        }

    };

    /*
     Private functions
     */
    function getSmsFormInfo (dashlet) {

        var formInfo = dashlet.smsMessageObj;

        formInfo.message = dashlet.$('#sms-message').val();

        if (dashlet.debugMode) {
            console.log('The message is: ', formInfo.message);
        }

        if (dashlet.debugMode && dashlet.useAnotherNumberFlag) {

        }

        if (dashlet.useAnotherNumberFlag) {
            if (dashlet.debugMode) {
                console.log('The useAnotherNumberFlag is enabled');
                console.log('Fetching the toNumber from the #sms-to-another-number text box');
            }

            //Grab the to another number entry
            formInfo.toNumber = dashlet.$('#sms-to-another-number').val().trim();

        } else {
            if (dashlet.debugMode) {
                console.log('Selecting the value from the select box');
            }
            formInfo.toNumber = dashlet.$el.find('#sms-to').val();
        }


        //grab the from information
        formInfo.fromName = dashlet.$el.find('#sms-from').val();

        return formInfo;
    }

})();
