<script setup lang="ts">
import { DateInputRoot as ArkDateInputRoot } from '@ark-ui/vue/date-input';
import type { DateInputRootEmits, DateInputRootProps } from '@ark-ui/vue/date-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DateInputRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ DateInputRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'inline-flex max-w-full flex-col items-start gap-1 data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';
</script>

<template>
  <ArkDateInputRoot v-bind="attrs" :class="cn(rootClass, className)" data-slot="date-input-root">
    <slot />
  </ArkDateInputRoot>
</template>