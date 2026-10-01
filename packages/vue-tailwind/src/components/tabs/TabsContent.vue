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
const contentClass =
  "box-border min-w-0 flex-1 rounded-lg border border-border bg-background p-4 text-sm leading-5 text-foreground outline-0 focus-visible:rounded-[inherit] focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring [&[hidden]:not([hidden='until-found'])]:hidden";
</script>

<template>
  <ArkTabContent
    v-bind="attrs"
    :class="cn(contentClass, className)"
    :value="value"
    data-slot="tabs-content"
  >
    <slot />
  </ArkTabContent>
</template>