<?php

use Kirby\Cms\App as Kirby;

Kirby::plugin('codelab/custom', [
  'fieldMethods' => [
    'getAuthorName' => function ($field) {
      if ($field->exists() && $field->isNotEmpty()) {
        $authorName = $field->toUser()->name();
        return $authorName;
      } else {
        return null;
      }
    },
    'addImagePathsToLayout' => function ($field) {
      $model = $field->parent();
      $layouts = $field->toLayouts()->toArray();

      if (class_uses($model, 'Kirby\Cms\HasFiles')) {
        array_walk_recursive($layouts, function (&$value, $key) use ($model) {
          if (is_int($key) && is_string($value)) {
            if ($file = $model->file($value)) {
              // $value = $file->srcset([300, 800, 1024]);
              // $value = $file->url();

              class ImageData
              {
                public $dimensions;
                public $orientation;
                public $url;
              }

              $value = new ImageData;
              // $value = $file->dimensions();
              // $value = $file->orientation();

              $value->dimensions = $file->dimensions();
              $value->orientation = $file->orientation();
              $value->url = $file->url();
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
  ]
]);
