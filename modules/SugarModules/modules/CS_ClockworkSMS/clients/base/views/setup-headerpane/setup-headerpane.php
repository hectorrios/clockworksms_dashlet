<?php
if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');

/**
 * Created by PhpStorm.
 * User: hrios
 * Date: 16/12/15
 * Time: 11:45
 */

$module_name = 'CS_ClockworkSMS';
$viewdefs[$module_name]['base']['view']['setup-headerpane'] = array(
    'template' => 'headerpane',
    'title' => 'LBL_CLOCKWORKSMS_SETTINGS',
    'buttons' => array(
        array(
            'name'      => 'cancel_button',
            'type'      => 'button',
            'label'     => 'LBL_CANCEL_BUTTON_LABEL',
            'css_class' => 'btn-invisible btn-link',
        ),
        array(
            'name'      => 'save_button',
            'type'      => 'button',
            'label'     => 'LBL_SAVE_BUTTON_LABEL',
            'css_class' => 'btn-primary',
        ),
        array(
            'name' => 'sidebar_toggle',
            'type' => 'sidebartoggle',
        ),
    ),
);