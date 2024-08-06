<template>
  <div class="form">
    <div class="form__header">
      <span>
        <slot name="form-header" />
      </span>
    </div>
    <div class="form__content">
      <slot name="form-content" />
    </div>
    <div class="form__footer">
      <slot name="form-footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form {
  max-width: 490px;
  height: 100%;
  margin: 0 auto;

  &__header {
    margin-top: 100px;

    span {
      font-size: 14px;
      font-weight: 600;
    }
  }

  &__content {
    width: 100%;
    padding: 10px 0;
  }

  &__footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
}
</style>