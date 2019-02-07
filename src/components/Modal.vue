<template>
  <!-- Modal Structure -->
  <div class="modal">
    <div class="modal-content">
      <slot></slot>
    </div>
    <div class="modal-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    open: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  mounted: function() {
    this.mInstance = M.Modal.init(this.$el, this.options);
    $(this.$el).modal();
  },
  beforeDestroy() {
    this.mInstance.destroy();
  },
  watch: {
    open: function(nextValue) {
      nextValue ? this.mInstance.open() : this.mInstance.close();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
