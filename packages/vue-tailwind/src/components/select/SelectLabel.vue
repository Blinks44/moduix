<script setup lang="ts">
import { SelectLabel as ArkSelectLabel } from '@ark-ui/vue/select';
import type { SelectLabelProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectLabel
    v-bind="attrs"
    :class="
      cn(
        'inline-flex items-center text-sm font-medium text-foreground select-none data-disabled:opacity-50',
        className,
      )
    "
    data-slot="select-label"
  >
    <slot />
  </ArkSelectLabel>
</template>