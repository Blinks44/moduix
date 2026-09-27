<script setup lang="ts">
import { FieldRoot as ArkFieldRoot } from '@ark-ui/vue/field';
import type { FieldRootProps as ArkFieldRootProps } from '@ark-ui/vue/field';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldRootProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'box-border flex w-full max-w-none flex-col items-start gap-1 text-foreground data-disabled:opacity-50';
</script>

<template>
  <ArkFieldRoot v-bind="attrs" :class="cn(rootClass, className)" data-slot="field-root">
    <slot />
  </ArkFieldRoot>
</template>