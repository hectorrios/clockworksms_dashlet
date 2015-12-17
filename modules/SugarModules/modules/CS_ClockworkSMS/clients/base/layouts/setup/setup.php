<?php

if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');

/**
 * Created by PhpStorm.
 * User: hrios
 * Date: 12/12/15
 * Time: 23:13
 */
$module_name = 'CS_ClockworkSMS';
$viewdefs[$module_name]['base']['layout']['setup'] = array(
    'components' => array(
        array(
            'layout' => array(
                'components' => array(
                    array(
                        'layout' => array(
                            'components' => array(
                                array(
                                    'view' => 'setup-headerpane',
                                ),
                                array(
                                    'view' => 'setup'
                                ),
                            ),
                            'type' => 'simple',
                            'name' => 'main-pane',
                            'span' => 8,
                        ),
                    ),
                    array(
                        'layout' => array(
                            'components' => array(
                                array(
                                    'layout' => 'list-sidebar',
                                ),
                            ),
                            'type' => 'simple',
                            'name' => 'side-pane',
                            'span' => 4,
                        ),
                    ),
                    array(
                        'layout' =>
                            array(
                                'components' =>
                                    array(),
                                'type' => 'simple',
                                'name' => 'dashboard-pane',
                                'span' => 4,
                            ),
                    ),
                    array(
                        'layout' => array(
                            'components' =>
                                array(),
                            'type' => 'simple',
                            'name' => 'preview-pane',
                            'span' => 8,
                        ),
                    ),
                ),
                'type' => 'default',
                'name' => 'sidebar',
                'span' => 12,
            ),
        ),
    ),
    'type' => 'settings',
    'name' => 'base',
    'span' => 12,
);
