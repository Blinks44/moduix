<script setup lang="ts">
import { Check as CheckIcon } from '@lucide/vue';
import { ToggleGroup, ToggleGroupItem, useToggleGroupContext } from '@moduix/vue/toggle-group';
import { defineComponent } from 'vue';

const AlignmentItem = defineComponent({
  components: { ToggleGroupItem, CheckIcon },
  props: { value: { type: String, required: true } },
  setup() {
    return { toggleGroup: useToggleGroupContext() };
  },
  template: `
    <ToggleGroupItem :value="value">
      <slot />
      <CheckIcon v-if="toggleGroup.value.includes(value)" aria-hidden="true" focusable="false" />
    </ToggleGroupItem>
  `,
});
</script>

<template>
  <ToggleGroup :default-value="['left']" aria-label="Text alignment">
    <AlignmentItem value="left">Left</AlignmentItem>
    <AlignmentItem value="center">Center</AlignmentItem>
    <AlignmentItem value="right">Right</AlignmentItem>
  </ToggleGroup>
</template>