<?php

/**
 * The config file is optional. It accepts a return array with config options
 * Note: Never include more than one return statement, all options go within this single return array
 * In this example, we set debugging to true, so that errors are displayed onscreen. 
 * This setting must be set to false in production.
 * All config options: https://getkirby.com/docs/reference/system/options
 */

require_once __DIR__ . '/../plugins/kirby3-dotenv/global.php';

loadenv([
  'dir' => realpath(__DIR__ . '/../../'),
  'file' => '.env',
]);


return [
  // 'url' => ['https://' . env('BACKEND_HOST')],
  'url' => env('BACKEND_URL'),
  'frontendUrl' => env('FRONTEND_URL'),
  'debug' => filter_var(env('KIRBY_DEBUG', true), FILTER_VALIDATE_BOOLEAN),
  //------------ Panel ------------
  'panel' => [
    'language' => 'en',
    'install' => filter_var(env('KIRBY_PANEL_INSTALL', false), FILTER_VALIDATE_BOOLEAN)
  ],
  'api' => [
    'basicAuth' => true,
    'allowInsecure' => false
  ],
  'auth' => [
    'trials' => 200,
    'timeout' => 3600
  ]

];
