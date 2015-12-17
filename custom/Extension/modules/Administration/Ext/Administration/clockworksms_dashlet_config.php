<?php
/**
 * Created by PhpStorm.
 * User: hrios
 * Date: 11/12/15
 * Time: 22:06
 */

$GLOBALS['log']->fatal("Inside clockworksms_dashlet_config.php");

// initialize a temp array that will hold the options we want to create
$links = array();
// add button1 to $links
$links['Administration']['link1'] = array(
    // pick an image from /themes/Sugar5/images
    // and drop the file extension
    'Releases',
    // title of the link
    'LBL_CLOCKWORKSMS_API_KEY_LINK_TITLE',
    // description for the link
    'LBL_CLOCKWORKSMS_API_KEY_LINK_DESC',
    // where to send the user when the link is clicked
    'javascript:parent.SUGAR.App.router.navigate("CS_ClockworkSMS/layout/setup", {trigger: true});',
);
// add link2 to $links
// this link uses labels instead of hard-coded strings
// since this is in the scope of the Administration module,
// you need to add these labels to the
// Administration lang files in
// /custom/Extension/modules/Administration/Ext/Language/abc_Module.php
$links['Administration']['link2'] = array(
    // pick an image from /themes/Sugar5/images
    // and drop the file extension
    'CallReports',
    // defined in /custom/Extension/modules/Administration/Ext/Language/abc_Module.php
    'LBL_LINK_NAME',
    // defined in /custom/Extension/modules/Administration/Ext/Language/abc_Module.php
    'LBL_LINK_DESCRIPTION',
    // where to send the user when the link is clicked
//    './index.php?module=abc_Module&action=link2_action',
    'javascript:parent.SUGAR.App.router.navigate("CS_ClockworkSMS/create", {trigger: true});',
);
// add our new admin section to the main admin_group_header array
$admin_group_header []= array(
    // The title for the group of links
    'Clockwork SMS Admin Options',
    // leave empty, it's used for something in /include/utils/layout_utils.php
    // in the get_module_title() function
    '',
    // set to false, it's used for something in /include/utils/layout_utils.php
    // in the get_module_title() function
    false,
    // the array of links that you created above
    // to be placed in this section
    $links,
    // a description for what this section is about
    'LBL_SECTION_DESCRIPTION'
);