<?php
require 'vendor/autoload.php';
use Plivo\RestAPI;

/**
 * Created by PhpStorm.
 * User: hectorrios
 * Date: 10/4/16
 * Time: 4:04 PM
 */
class PlivoSMSSender {
    protected $auth_id = "MAN2Y1NGEZYZA5MJYXMW";
    protected $auth_token = "NGZlM2NjYmExYWRkYmU2NzI0ZjYzODlmODNiZDNl";
    protected $plivoSender = null;

    public function __construct() {
        $this->plivoSender = new RestAPI($this->auth_id, $this->auth_token);
    }

    public function sendSMSMessage($message, $sender, ...$recipients) {
        //create the params for plivoSender
        $params = [
            'src' => $sender,
            'dst' => $recipients[0],
            'text' => $message,
        ];

        $response = $this->plivoSender->send_message($params);
        $GLOBALS['log']->fatal("Plivo Response: " . print_r($response, true));
        return $response;
    }


}