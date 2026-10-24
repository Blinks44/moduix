<script setup lang="ts">
import { SelectIndicator as ArkSelectIndicator } from '@ark-ui/vue/select';
import type { SelectIndicatorProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronUpDownIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectIndicator
    v-bind="attrs"
    :class="
      cn(
        'pointer-events-none absolute end-2 top-1/2 inline-flex size-control-xs -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color] duration-normal ease-in-out [&>svg]:size-4 [@media(hover:hover)]:peer-[:enabled:hover]/select-trigger:bg-muted [@media(hover:hover)]:peer-[:enabled:hover]/select-trigger:text-foreground',
        className,
      )
    "
    data-slot="select-indicator"
  >
    <slot><ChevronUpDownIcon /></slot>
  </ArkSelectIndicator>
</template>