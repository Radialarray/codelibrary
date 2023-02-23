<?php

use Kirby\Cms\App as Kirby;

Kirby::plugin('radialarray/addImagePaths', [
  'fieldMethods' => [
    'addImagePaths' => function ($field) {
      // function iterateLayouts($layout)
      // {
      //   return array_map("iterateColumns", $layout->columns());
      // }

      // function iterateColumns($columns)
      // {
      //   return $columns;
      //   return array_map("iterateBlocks", $columns);
      // }

      // function iterateBlocks($blocks)
      // {
      //   return gettype($blocks);
      //   return array_map("iterateBlock", $blocks);
      // }

      // function iterateBlock($block)
      // {
      //   return $block;
      // }


      // $layouts = $field->toLayouts()->toArray();

      // $newLayouts = array_map("iterateLayouts", $layouts);

      // return $newLayouts;


      // For blocks!
      // $model = $field->parent();
      // $blocks = $field->toBlocks()->toArray();

      // For layouts!
      // $model = $field->parent();
      $layouts = $field->toLayouts();
      $blocks  = $layouts->toBlocks()->toArray();


      $model = $layouts->toBlocks()->parent();

      if (class_uses($model, 'Kirby\Cms\HasFiles')) {
        // return $model;
        array_walk_recursive($blocks, function (&$value, $key) use ($model) {
          if (is_int($key) && is_string($value)) {
            if ($file = $model->file($value)) {
              $value = $file->url();
              // $value = $key;
            }
          }
          // return $model;
        });
      }

      $fieldLayouts = json_decode($field->toString(), true);

      foreach ($fieldLayouts as $layoutKey => $layout) {
        $columns = $layout['columns'];
        foreach ($columns as $columnKey => $column) {
          $block = $column['blocks'];
          if (isset($block[0]['content']['image'])) {
            foreach ($blocks as $blockSearch) {
              if ($blockSearch['id'] === $block[0]['id']) {
                if (isset($blockSearch['content']['image'][0])) {
                  $image = $blockSearch['content']['image'][0];
                  $fieldLayouts[$layoutKey]['columns'][$columnKey]['blocks'][0]['content']['image'][0] = $image;
                }
              }
            }
          } else if (isset($block[0]['content']['images'])) {
            foreach ($blocks as $blockSearch) {
              if ($blockSearch['id'] === $block[0]['id']) {
                if (isset($blockSearch['content']['images'])) {
                  foreach ($blockSearch['content']['images'] as $key => $image) {
                    $fieldLayouts[$layoutKey]['columns'][$columnKey]['blocks'][0]['content']['images'][$key] = $image;
                  }
                }
              }
            }
          }
        }
      }

      return $fieldLayouts;
    }
  ],
]);
