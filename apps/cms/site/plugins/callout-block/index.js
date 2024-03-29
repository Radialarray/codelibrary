(function() {
  "use strict";
  const Callout_vue_vue_type_style_index_0_lang = "";
  function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render) {
      options.render = render;
      options.staticRenderFns = staticRenderFns;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        );
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const _sfc_main = {
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
  var _sfc_render = function render() {
    var _a;
    var _vm = this, _c = _vm._self._c;
    return _c("div", { staticClass: "k-block-type-callout-editor" }, [_c("k-icon", { attrs: { "type": "wand" } }), _c("k-writer", { ref: "text", staticClass: "k-block-type-callout-text", attrs: { "inline": (_a = _vm.textField.inline) != null ? _a : false, "marks": _vm.textField.marks, "placeholder": _vm.textField.placeholder, "value": _vm.content.text }, on: { "input": function($event) {
      return _vm.update({ text: $event });
    } } })], 1);
  };
  var _sfc_staticRenderFns = [];
  _sfc_render._withStripped = true;
  var __component__ = /* @__PURE__ */ normalizeComponent(
    _sfc_main,
    _sfc_render,
    _sfc_staticRenderFns,
    false,
    null,
    null,
    null,
    null
  );
  __component__.options.__file = "/Users/svenlochner/Desktop/Programming/codelibrary_v2/apps/cms/site/plugins/callout-block/src/components/Callout.vue";
  const Callout = __component__.exports;
  window.panel.plugin("codelab/callout", {
    blocks: {
      callout: Callout
    }
  });
})();
