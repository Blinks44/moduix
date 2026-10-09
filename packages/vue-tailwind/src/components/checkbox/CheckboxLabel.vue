<script setup lang="ts">
import { CheckboxLabel as ArkCheckboxLabel } from '@ark-ui/vue/checkbox';
import type { CheckboxLabelProps } from '@ark-ui/vue/checkbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CheckboxLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCheckboxLabel
    v-bind="attrs"
    :class="cn('text-sm leading-5 font-medium text-inherit', className)"
    data-slot="checkbox-label"
  >
    <slot />
  </ArkCheckboxLabel>
</template>