<?php
    // Load config
    @require_once('config/config.php');

    if(!PROXY_ENABLED) {
        // Proxy disabled flag
        print "-1";
        die();
    }

    if(!isset($_GET['username']) || !preg_match('/^[a-zA-Z0-9\-_]{2,30}$/', $_GET['username'])) {
        // Wrong format of username
        print "0";
        die();
    }

    @require_once('http/Loader.php');
    $loader = new Loader();
    $post_array = array();

    // Loading start page for receive csrf token
    $html = $loader->load('https://www.postcrossing.com/', true);

    $token = '';
    if(preg_match('/signin\[_csrf_token\].*?value=\"(.*?)\"/', $html, $matches)){
        if(count($matches)>1){
            $token = $matches[1];
        }
    }

    $post_array['signin[_csrf_token]'] = $token;
    $post_array['signin[username]'] = PC_USERNAME;
    $post_array['signin[password]'] = PC_PASSWORD;

    // Authorize user and loading info about user in {$_GET['username']}
    if($loader->load('https://www.postcrossing.com/login', true, $post_array) &&
        $result = $loader->load("https://www.postcrossing.com/user/{$_GET['username']}/feed", true)){
        $result = trim(trim($result, '('), ')');
        print $result;
    }
?>
