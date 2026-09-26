<script setup lang="ts">
import { FieldsetLegend as ArkFieldsetLegend } from '@ark-ui/vue/fieldset';
import type { FieldsetLegendProps } from '@ark-ui/vue/fieldset';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldsetLegendProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldsetLegend
    v-bind="attrs"
    :class="
      cn(
        'inline-block max-w-full pb-3 text-lg font-semibold wrap-anywhere text-foreground',
        className,
      )
    "
    data-slot="fieldset-legend"
  >
    <slot />
  </ArkFieldsetLegend>
</template>