<?= css('assets/css/index.css') ?>
<h1><?= $page->title() ?></h1>
<!-- <?=
      $test = $page->banner()->addImagePath();
      ?> -->


<!-- <h1>
  <?php
  if ($page->author()->exists()) {
    $user = $page->author()->toUser()->name();
    var_dump($user);
    return 'hello';
  }
  ?>
</h1> -->

<h2>Hello</h2>
<?php foreach ($page->main()->toLayouts() as $layout) : ?>
  <section class="6-column-grid" id="<?= $layout->id() ?>">
    <?php foreach ($layout->columns() as $column) : ?>
      <div class="column" style="--span:<?= $column->span(6) ?>">
        <div class="blocks">
          <?php foreach ($column->blocks() as $block) : ?>
            <?php
            if ($block->type() == 'image')
              if ($block->location() == 'web') {
                $src = $block->src()->esc();
                echo $src;
              } elseif ($image = $block->image()->toFile()) {
                $alt = $alt ?? $image->alt();
                $src = $image->url();
                var_dump($block->image()->toFile());
              }
            ?>
            <div class="block block-type-<?= $block->type() ?>">
              <?= $block ?>
            </div>
          <?php endforeach ?>
        </div>
      </div>
    <?php endforeach ?>
  </section>
<?php endforeach ?>


<!-- <?=
      $test = $page->main();
      var_dump($test);
      ?> -->

<?php foreach ($page->main()->toLayouts() as $layout) : ?>
  <section class="6-column-grid" id="<?= $layout->id() ?>">
    <?php foreach ($layout->columns() as $column) : ?>
      <div class="column" style="--span:<?= $column->span(6) ?>">
        <div class="blocks">
          <?php foreach ($column->blocks() as $block) : ?>
            <div class="block block-type-<?= $block->type() ?>">
              <?= $block ?>
            </div>
          <?php endforeach ?>
        </div>
      </div>
    <?php endforeach ?>
  </section>
<?php endforeach ?>