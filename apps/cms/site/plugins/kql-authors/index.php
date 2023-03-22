<?php

use Kirby\Cms\App as Kirby;

Kirby::plugin('codelab/authors', [
  'fieldMethods' => [
    'getAuthorName' => function ($field) {
      if ($field->exists() && $field->isNotEmpty()) {
        $authorName = $field->toUser()->name();
        return $authorName;
      } else {
        return null;
      }
    }
  ]
]);
