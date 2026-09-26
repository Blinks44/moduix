<script setup lang="ts">
import { FieldItem as ArkFieldItem } from '@ark-ui/vue/field';
import type { FieldItemProps as ArkFieldItemProps } from '@ark-ui/vue/field';
import { computed, useAttrs } from 'vue';
import { ref } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ ArkFieldItemProps, /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class'];
  value: ArkFieldItemProps['value'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const itemElement = ref<HTMLDivElement>();
defineExpose({ $el: itemElement });
const forwardedProps = computed(() =>
  Object.fromEntries(
    Object.entries(props).filter(([key, value]) => key !== 'value' && value !== undefined),
  ),
);
</script>

<template>
  <ArkFieldItem :value="props.value">
    <div
      ref="itemElement"
      v-bind="{ ...attrs, ...forwardedProps }"
      :class="cn('grid gap-1', props.class)"
      data-slot="field-item"
    >
      <slot />
    </div>
  </ArkFieldItem>
</template>