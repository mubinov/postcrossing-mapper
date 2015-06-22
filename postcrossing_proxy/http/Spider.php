<?php

/**
 * Class Spider
 * Loading page
 */
class Spider {

    private $cookie = '';

    /**
     * Setting cookie callback function for curl
     * @param $ch
     * @param $str
     * @return int
     */
    private function setCookies($ch, $str)
    {
        if(!strncmp($str, "Set-Cookie:", 11)){
            $cookie = trim(substr($str, 11));
            if(strlen($cookie) > 0){
                $this->cookie = $cookie;
            }
        }

        return strlen($str);
    }

    /**
     * Load http page
     *
     * @param string $url
     * @param bool $ssl
     * @param array $post
     * @return mixed
     */
    public function load($url, $ssl = false, $post = array())
    {
        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);

            curl_setopt($ch, CURLOPT_USERAGENT, 'Opera/9.80 (Windows NT 5.1; U; MRA 5.5 (build 02842); ru) Presto/2.7.62 Version/11.01');
            curl_setopt($ch, CURLOPT_TIMEOUT, 60);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

            curl_setopt($ch, CURLOPT_COOKIE, $this->cookie);

            if ($ssl) {
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
            }

            curl_setopt($ch, CURLOPT_HEADERFUNCTION, array($this, 'setCookies'));

            if (count($post)) {
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
            }

            $html = curl_exec($ch);

            curl_close($ch);
        }catch (\Exception $e){
            $html = false;
        }

        return $html;
    }
} 