<script setup lang="ts">
import { CollapsibleIndicator as ArkCollapsibleIndicator } from '@ark-ui/vue/collapsible';
import type { CollapsibleIndicatorProps } from '@ark-ui/vue/collapsible';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CollapsibleIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCollapsibleIndicator
    v-bind="attrs"
    :class="
      cn(
        'inline-flex size-3 shrink-0 items-center justify-center transition-transform duration-normal data-[state=open]:rotate-180 [&_svg]:size-full',
        className,
      )
    "
    data-slot="collapsible-indicator"
  >
    <slot><ChevronDownIcon /></slot>
  </ArkCollapsibleIndicator>
</template>