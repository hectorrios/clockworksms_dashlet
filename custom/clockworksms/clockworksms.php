<?php
/**
 * Created by PhpStorm.
 * User: hrios
 * Date: 06/12/15
 * Time: 16:25
 */

$viewdefs['base']['view']['clockworksms'] = array(
    'dashlets' => array(
        array(
            //Display label for this dashlet
            'label' => 'LBL_CLOCKWORK_SMS',
            //Description label for this dashlet
            'description' => 'Clockwork API SMS sender',
            'config' => array (
                'api_key' => '',
            ),
            'preview' => array(
                'api_key' => '',
            ),
            //Filter array decides where this dashlet is allowed to
            // appear
            'filter' => array(
                //Modules where this dashlet can appear
                'module' => array(
                    'Accounts',
                    'Contacts',
                ),
                //Views where this dashlet can appear
                //Valid values are records and record
                'view' => array(
                    'record',
                ),
            ),
        ),
    ),

    'config' => array (
        'fields' => array (
            array(
                'name' => 'debug_mode',
                'css_class' => 'api_class',
                'label' => 'LBL_CLOCKWORKSMS_DEBUG_MODE',
                'type' => 'bool',
//                'placeholder' => 'LBL_CLOCKWORK_API_PLACEHOLDER',
            ),
        ),
    ),
);
