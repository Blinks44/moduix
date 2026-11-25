<script setup lang="ts">
import { TabContent as ArkTabContent } from '@ark-ui/vue/tabs';
import type { TabContentProps } from '@ark-ui/vue/tabs';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TabContentProps {
  class?: HTMLAttributes['class'];
  value: TabContentProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabContent
    v-bind="attrs"
    :class="
      cn(
        [
          'min-w-0 flex-1 rounded-lg border border-border bg-background p-4 text-sm leading-5 outline-0',
          'group-data-[variant=line]/tabs:rounded-none group-data-[variant=line]/tabs:border-0 group-data-[variant=line]/tabs:bg-transparent group-data-[variant=line]/tabs:p-0',
          'focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring',
        ],
        className,
      )
    "
    :value="value"
    data-slot="tabs-content"
  >
    <slot />
  </ArkTabContent>
</template>