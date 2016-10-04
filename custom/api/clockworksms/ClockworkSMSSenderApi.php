<?php

use Sugarcrm\Sugarcrm\custom\api\clockworksms\PlivoSMSSender;

require_once 'custom/clients/base/api/class-Clockwork.php';
require_once 'modules/Configurator/Configurator.php';

/**
 * Created by PhpStorm.
 * User: hrios
 * Date: 04/12/15
 * Time: 17:48
 */
class ClockworkSMSSenderApi extends SugarApi {

    public function registerApiRest() {
        return array(
            'send_sms' => array(
                'reqType' => 'POST',
                'path' => array('ClockworkSMS','send'),
                'pathVars' => array('', ''),
                'method' => 'send_sms',
                'shortHelp' => 'Sends an SMS using the Clockwork API',
                'longHelp' => '',
            ),

            'store_api_key' => array(
                'reqType' => 'POST',
                'path' => array('ClockworkSMS', 'apikey'),
                'pathVars' => array('', ''),
                'method' => 'store_api_key',
                'shortHelp' => 'Save a ClockworkSMS api key instance wide',
                'longHelp' => '',
            ),

            'get_api_key' => array(
                'reqType' => 'GET',
                'path' => array('ClockworkSMS', 'getapikey'),
                'pathVars' => array('', ''),
                'method' => 'get_api_key',
                'shortHelp' => 'Retrieve the stored ClockworkSMS API key',
                'longHelp' => '',
            ),
        );
    }

    public function send_sms($api, $args) {

        try {

            $error_array = $this->validate_args($args);

            if (!is_null($error_array)) {
                return $error_array;
            }

            $api_key = $this->getApiKeyFromConfig();

            $sms_body =  $args['message'];
            $from_name = isset($args['from_name']) ? $args['from_name'] : 'SugarCRM';

            $GLOBALS['log']->fatal("The value of api_key is: $api_key");

            $clockwork = new Clockwork($api_key);
            $message = array(
                'to' => $args['to_number'],
                'message' => $sms_body,
                'from' => $from_name,
            );

            $result = $clockwork->send($message);

            return $result;

        } catch (ClockworkException $e) {
//            $GLOBALS['log']->fatal("$e->getMessage()");
            return $e->getMessage();
        }
    }

    public function send_plivo_sms($api, $args) {

        $sms_body =  $args['message'];
        $from_name = isset($args['from_name']) ? $args['from_name'] : 'SugarCRM';

        $smsSender = new PlivoSMSSender();

        $result = $smsSender->sendSMSMessage($sms_body, $from_name, $args['to_number']);

        return $result;
    }

    public function store_api_key($api, $args) {
        if (!isset($args['api_key'])) {
            return array(
                'success' => 0,
                'error_code' => '200',
                'error_message' => 'No API Key was sent.',
            );
        }

        $api_key = $args['api_key'];

        $configuratorObj = new Configurator();

        //Load config
        $configuratorObj->loadConfig();

        //Update the API setting
        $configuratorObj->config['ClockworkSMSApiKey'] = $api_key;

        //Save the new setting
        $configuratorObj->saveConfig();

        return array(
            'success' => 1,
        );
    }

    public function get_api_key($api, $args) {

        $apiKey = $this->getApiKeyFromConfig();

        if (isset($apiKey)) {
            return array(
                'success' => 1,
                'payload' => array(
                    'clockwork_sms_api_key' => $apiKey,
                ),
            );
        } else {
            return array(
                'success' => 0,
                'error_code' => '205',
                'error_message' => 'There is no currently stored API key. It needs ' .
                    'to be configured',

            );
        }
    }

    /*
     * Private methods
     */

    private function validate_args($args) {

        $api_key = $this->getApiKeyFromConfig();
        if(!isset($api_key)) {
            return array(
                'success' => 0,
                'error_code'=> '100',
                'error_message' => 'The API KEY was not provided',
            );
        }

        if (!isset($args['message'])) {
            return array(
                'success' => 0,
                'error_code' => '100',
                'error_message' => 'The SMS can not be sent with an empty message',
            );
        }

        if (!isset($args['to_number'])) {
            return array(
                'success' => 0,
                'error_code' => '100',
                'error_message' => 'The to number must be present',
            );
        }

        //We checked that the args have been set. Now lets make sure that
        //they are not blank.
        //$api_key = $args['api_key'];

        $sms_body =  $args['message'];

        $to_number = $args['to_number'];

        $GLOBALS['log']->fatal("The value of api_key is: $api_key");

        if (!$api_key) {
            return array(
                'success' => 0,
                'error_code'=> '101',
                'error_message' => 'The API KEY can not be blank',
            );
        }

        if (!$sms_body) {
            return array(
                'success' => 0,
                'error_code'=> '101',
                'error_message' => 'The SMS can not be sent if the body of the ' .
                    'message is blank.',
            );
        }

        if (!$to_number) {
            return array(
                'success' => 0,
                'error_code'=> '101',
                'error_message' => 'The to number can not be blank.',
            );
        }
    }

    private function getApiKeyFromConfig() {
        global $sugar_config;

        //Fetch the API setting
        if (isset($sugar_config['ClockworkSMSApiKey'])) {
            return $sugar_config['ClockworkSMSApiKey'];
        } else {
            return null;
        }
    }
}
