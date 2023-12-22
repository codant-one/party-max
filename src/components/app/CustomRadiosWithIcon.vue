<script setup>
const props = defineProps({
  selectedRadio: {
    type: String,
    required: true,
  },
  radioContent: {
    type: Array,
    required: true,
  },
  gridColumn: {
    type: null,
    required: false,
  },
})

const emit = defineEmits(['update:selectedRadio'])

const updateSelectedOption = value => {
  emit('update:selectedRadio', value)
  emit('change', { id: value })
}
</script>

<template>
  <VRadioGroup
    v-if="props.radioContent"
    :model-value="props.selectedRadio"
    @update:model-value="updateSelectedOption"
  >
    <VRow>
      <VCol
        v-for="item in props.radioContent"
        :key="item.title"
        v-bind="gridColumn"
      >
        <VLabel
          class="custom-input custom-radio-icon border-rounded cursor-pointer"
          :class="props.selectedRadio === item.value ? 'active' : ''"
        >
          <slot :item="item">
            <div class="d-flex flex-column align-center text-center gap-2">
              <VIcon
                v-bind="item.icon"
                class="text-high-emphasis"
              />
              <h6 class="cr-title text-base">
                {{ item.title }}
              </h6>

              <p class="text-sm mb-0 clamp-text">
                {{ item.desc }}
              </p>
            </div>
          </slot>

          <div>
            <VRadio :value="item.value" />
          </div>
        </VLabel>
      </VCol>
    </VRow>
  </VRadioGroup>
</template>

<style lang="scss" scoped>
.custom-radio-icon {
  display: flex;
  flex-direction: column;

  .v-radio {
    margin-block-end: -0.25rem;
    font-size: 12px;
  }

  .cr-title {
    font-weight: 500;
  }
}
</style>

<style lang="scss">

  .v-selection-control__input {
    width: 10px;
  }

  .v-selection-control--density-default {
    --v-selection-control-size: 20px;
  }

  .custom-radio-icon {
    .v-radio {
      margin-block-end: -0.25rem;

      .v-selection-control__wrapper {
        margin-inline-start: 0;
      }
    }
  }

  // 👉 Custom Input
  .v-label.custom-input {
    padding: 0.5rem;
    border: 1px solid #0a1b33;
    opacity: 1;
    white-space: normal;

    &:hover {
      border-color: rgba(var(--v-border-color), 0.25);
    }

    &.active {
      border-color: #ff0090;

      .v-icon {
        color: #ff0090 !important;
      }
    }
  }

  .border-rounded {
    border-radius: 8px;
  }
</style>
