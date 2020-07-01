Project is deprecated and no longer supported

# Postcrossing Mapper

Postcrossing.com is a service for postcrossers - people who love send and receive postcard. **Poscrossing Mapper** is a small script for Postcrossing.com users. This script shows world map where you can find in which countries did you sent postcards and from which received.

## Demo

Demo page here: http://mubinov.com/pm

![demo](https://github.com/mubinov/postcrossing-mapper/blob/master/res/pm.png)

## Instruction

Please edit `postcrossing_proxy/config/config.php` or create `postcrossing_proxy/config/dev_config.php` file and set next params:

    define('PC_USERNAME', 'postcrossing_login'); /* login from postcrossing.com account */
    define('PC_PASSWORD', 'postcrossing_password'); /* password of account */

Please don't use your real login and password for Postcrossing Mapper settings. Create new account for these purposes.

License
----

MIT
