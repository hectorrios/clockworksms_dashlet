<?php
/**
 * Created by PhpStorm.
 * User: hrios
 * Date: 08/12/15
 * Time: 15:21
 */

$manifest = array (
    'acceptable_sugar_versions' =>
        array(
            'regex_matches' => array(
                '7\\.[0-9]\\.[0-9]$'
            ),
        ),

    'acceptable_sugar_flavors' =>
        array(
            0 => 'PRO',
            1 => 'CORP',
            2 => 'ENT',
            3 => 'ULT',
        ),
    'readme'=>'README.txt',
    'key'=>'ClockworkSMS_001',
    'author' => 'Hector Rios',
    'description' => 'SMS Sender Dashlet for Clockwork SMS',
    'icon' => '',
    'is_uninstallable' => true,
    'name' => 'ClockworkSMS sender',
    'published_date' => '2015-12-11 08:00',
    'type' => 'module',
    'version' => '0.1',
    'remove_tables' => false,
);

$installdefs = array (
    'id' => 'ClockworkSMS_001',
    'copy' =>
        array (
            array (
                'from' => '<basepath>/clockworksms/',
                'to' => 'custom/clients/base/views/clockworksms',
            ),
            array (
                'from' => '<basepath>/api/clockworksms/class-Clockwork.php',
                'to' => 'custom/clients/base/api/class-Clockwork.php',
            ),
            array (
                'from' => '<basepath>/api/clockworksms/class-ClockworkException.php',
                'to' => 'custom/clients/base/api/class-ClockworkException.php',
            ),
            array (
                'from' => '<basepath>/api/clockworksms/ClockworkSMSSenderApi.php',
                'to' => 'custom/clients/base/api/ClockworkSMSSenderApi.php',
            ),
        ),
    'language' =>
        array (
            array (
                'from' => '<basepath>/language/clockworksms/en_us.clockworksms.php',
                'to_module' => 'application',
                'language' => 'en_us',
            ),
        )

);
