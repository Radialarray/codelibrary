<?php

use Kirby\Cms\App as Kirby;

Kirby::plugin('radialarray/addImagePaths', [
  'fieldMethods' => [
    'addImagePathsToLayout' => function ($field) {
      $model = $field->parent();
      $layouts = $field->toLayouts()->toArray();

      if (class_uses($model, 'Kirby\Cms\HasFiles')) {
        array_walk_recursive($layouts, function (&$value, $key) use ($model) {
          if (is_int($key) && is_string($value)) {
            if ($file = $model->file($value)) {
              // $value = $file->srcset([300, 800, 1024]);
              $value = $file->url();
            }
          }
        });
      }

      return $layouts;
    },
    'addImagePath' => function ($field) {
      $file = $field->toFile();
      return $file;
    }
  ],
]);
