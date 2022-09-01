<?php


$base = __DIR__;
// var_dump($base);

require $base . '/vendor/autoload.php';
// require 'kirby/bootstrap.php';

$kirby = new Kirby([
  'roots' => [
    'index'    => __DIR__,
    'base'     => $base,
    'site'     => $base . '/site',
    'storage'  => $storage = $base . '/storage',
    'content'  => $storage . '/content',
    'accounts' => $storage . '/accounts',
    'cache'    => $storage . '/cache',
    'logs'     => $storage . '/logs',
    'sessions' => $storage . '/sessions',
  ],
]);

// dump($kirby);

echo $kirby->render();
