<template>
  <div class="k-block-type-callout-editor">
    <k-icon type="wand"></k-icon>
    <k-writer ref="text" :inline="textField.inline ?? false" :marks="textField.marks" :placeholder="textField.placeholder"
      :value="content.text" class="k-block-type-callout-text" @input="update({ text: $event })" />
  </div>
</template>
<script>
/**
 * @displayName BlockTypeQuote
 * @internal
 */
export default {
  computed: {
    textField() {
      return this.field("text", {});
    }
  },
  methods: {
    focus() {
      this.$refs.text.focus();
    }
  }
};
</script>
<style>
.k-block-type-callout-editor {
  /* padding-inline-start: 1rem; */
  /* border-inline-start: 2px solid var(--color-black); */
  display: flex;
  gap: 1rem;
}

.k-block-type-callout-text {
  /* font-size: var(--text-xl); */
  margin-bottom: 0.25rem;
  line-height: 1.25em;
}
</style>
