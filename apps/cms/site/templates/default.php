<?= css('assets/css/index.css') ?>
<h1><?= $page->title() ?></h1>
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