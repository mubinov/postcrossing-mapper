<?php
$dev_conf = 'config/dev_config.php';
if(file_exists($dev_conf)){
    @require_once($dev_conf);
}

// Proxy is enabled
defined('PROXY_ENABLED') or define('PROXY_ENABLED', true);

// http://poscrossing.com real user login
defined('PC_USERNAME') or define('PC_USERNAME', '');

// http://poscrossing.com real user password
defined('PC_PASSWORD') or define('PC_PASSWORD', '');