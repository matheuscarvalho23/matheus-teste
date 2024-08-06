<template>
  <div class="custom-button">
    <button type="button" 
      :class="[`custom-button__${type}`, {'is-disabled': isDisabled}]"
      :disabled="isDisabled"
    >
      {{ title }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  type: String,
  isDisabled: Boolean
})
</script>

<style scoped lang="scss">
.custom-button {
  width: 100%;

  button {
    width: 100%;
  }

  &__advance {
    height: 40px;

    border: 0;
    border-radius: 5px;
    background: $primary-color;
    cursor: pointer;

    color: #fff;
    font-weight: 600;
  }

  &__back {
    height: 40px;

    border: 1px solid $primary-color;
    border-radius: 5px;
    background: #fff;
    cursor: pointer;

    color: $primary-color;
    font-weight: 600;
  }

  .is-disabled {
    background: rgb($primary-color, 0.5);
  }
}
</style>