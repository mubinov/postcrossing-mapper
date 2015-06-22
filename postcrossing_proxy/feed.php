<?php
    /*
     * default login/pass
     */
    define('USERNAME', '');
    define('PASSWORD', '');

    if(isset($_GET['username'])){
        include 'Spider.php';
        $spider = new Spider();
        $post_array = array();

        $html = $spider->load('https://www.postcrossing.com/', true);

        $token = '';
        if(preg_match('/signin\[_csrf_token\].*?value=\"(.*?)\"/', $html, $matches)){
            if(count($matches)>1){
                $token = $matches[1];
            }
        }

        $post_array['signin[_csrf_token]'] = $token;
        $post_array['signin[username]'] = USERNAME;
        $post_array['signin[password]'] = PASSWORD;

        if($spider->load('https://www.postcrossing.com/login', true, $post_array) &&
            $result = $spider->load("https://www.postcrossing.com/user/{$_GET['username']}/feed", true)){
            $result = trim(trim($result, '('), ')');
            print $result;
        }
    }
?>
