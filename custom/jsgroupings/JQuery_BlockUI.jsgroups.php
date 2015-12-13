<?php
/**
 * Created by PhpStorm.
 * User: hrios
 * Date: 10/12/15
 * Time: 11:29
 */

//creates the file cache/include/javascript/jquery_plugins.js
$js_groupings[] = $sugar_grp_sidecar = array_merge($sugar_grp_sidecar,
    array(
        'custom/BlockUI/jquery.blockUI.js' => 'include/javascript/sugar_sidecar.min.js',
    )
);
