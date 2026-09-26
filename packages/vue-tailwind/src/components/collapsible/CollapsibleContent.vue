<script setup lang="ts">
import { CollapsibleContent as ArkCollapsibleContent } from '@ark-ui/vue/collapsible';
import type { CollapsibleContentProps } from '@ark-ui/vue/collapsible';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CollapsibleContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCollapsibleContent
    v-bind="attrs"
    :class="
      cn(
        'box-border overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-moduix-collapsible-closed data-[has-collapsed-size]:data-[state=closed]:animate-moduix-collapsible-closed-partial data-[state=open]:animate-moduix-collapsible-open data-[has-collapsed-size]:data-[state=open]:animate-moduix-collapsible-open-partial motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        className,
      )
    "
    data-slot="collapsible-content"
  >
    <slot />
  </ArkCollapsibleContent>
</template>