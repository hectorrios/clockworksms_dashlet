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
                '7\\.[0-9]\\.[0-9]\\.[0-9]$'
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
    'beans' =>
        array (
            0 =>
                array (
                    'module' => 'CS_ClockworkSMS',
                    'class' => 'CS_ClockworkSMS',
                    'path' => 'modules/CS_ClockworkSMS/CS_ClockworkSMS.php',
                    'tab' => false,
                ),
        ),
    'layoutdefs' =>
        array (
        ),
    'relationships' =>
        array (
        ),
    'image_dir' => '<basepath>/modules/icons',
    'copy' =>
        array (
            array (
                'from' => '<basepath>/modules/SugarModules/modules/CS_ClockworkSMS',
                'to' => 'modules/CS_ClockworkSMS',
            ),
            array (
                'from' => '<basepath>/custom/jsgroupings/JQuery_BlockUI.jsgroups.php',
                'to' => 'custom/Extension/application/Ext/JSGroupings/JQuery_BlockUI.jsgroups.php',
            ),

            array (
                'from' => '<basepath>/custom/jsgroupings/blockUI/jquery.blockUI.js',
                'to' => 'custom/BlockUI/jquery.blockUI.js',
            ),

            array (
                'from' => '<basepath>/custom/clockworksms/',
                'to' => 'custom/clients/base/views/clockworksms',
            ),
            array (
                'from' => '<basepath>/custom/api/clockworksms/class-Clockwork.php',
                'to' => 'custom/clients/base/api/class-Clockwork.php',
            ),
            array (
                'from' => '<basepath>/custom/api/clockworksms/class-ClockworkException.php',
                'to' => 'custom/clients/base/api/class-ClockworkException.php',
            ),
            array (
                'from' => '<basepath>/custom/api/clockworksms/ClockworkSMSSenderApi.php',
                'to' => 'custom/clients/base/api/ClockworkSMSSenderApi.php',
            ),

            array (
                'from' => '<basepath>/custom/Extension/modules/Administration',
                'to' => 'custom/Extension/modules/Administration',
            ),
        ),
    'language' =>
        array (
            array (
                'from' => '<basepath>/modules/SugarModules/language/application/en_us.lang.php',
                'to_module' => 'application',
                'language' => 'en_us',
            ),
            array (
                'from' => '<basepath>/custom/language/clockworksms/en_us.clockworksms_dashlet_heckie.php',
                'to_module' => 'application',
                'language' => 'en_us',
            ),
        )

);
