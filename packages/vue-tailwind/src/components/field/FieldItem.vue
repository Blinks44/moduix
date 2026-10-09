<script setup lang="ts">
import { FieldItem as ArkFieldItem } from '@ark-ui/vue/field';
import type { FieldItemProps as ArkFieldItemProps } from '@ark-ui/vue/field';
import { ref, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ ArkFieldItemProps, /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class'];
  value: ArkFieldItemProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const itemElement = ref<HTMLDivElement>();
defineExpose({ $el: itemElement });
</script>

<template>
  <ArkFieldItem :value="value">
    <div
      ref="itemElement"
      v-bind="attrs"
      :class="cn('grid gap-1', className)"
      data-slot="field-item"
    >
      <slot />
    </div>
  </ArkFieldItem>
</template>