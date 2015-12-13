<?php

require_once 'custom/clients/base/api/class-Clockwork.php';

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
        );
    }

    public function send_sms($api, $args) {

        try {

            $error_array = $this->validate_args($args);

            if (!is_null($error_array)) {
                return $error_array;
            }

            $api_key = $args['api_key'];

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

    private function validate_args($args) {

        if(!isset($args['api_key'])) {
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
        $api_key = $args['api_key'];

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
}