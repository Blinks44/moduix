<script setup lang="ts">
import { TabList as ArkTabList } from '@ark-ui/vue/tabs';
import type { TabListProps } from '@ark-ui/vue/tabs';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TabListProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabList
    v-bind="attrs"
    :class="
      cn(
        'relative z-0 inline-flex w-fit max-w-full items-stretch gap-1 rounded-lg border border-border bg-muted p-1 group-data-[orientation=horizontal]/tabs:overflow-x-auto group-data-[orientation=vertical]/tabs:w-48 group-data-[orientation=vertical]/tabs:min-w-48 group-data-[orientation=vertical]/tabs:flex-col group-data-[variant=line]/tabs:w-full group-data-[variant=line]/tabs:rounded-none group-data-[variant=line]/tabs:border-x-0 group-data-[variant=line]/tabs:border-t-0 group-data-[variant=line]/tabs:bg-transparent group-data-[variant=line]/tabs:px-0 group-data-[orientation=vertical]/tabs:max-[30rem]:w-2/5 group-data-[orientation=vertical]/tabs:max-[30rem]:min-w-0',
        className,
      )
    "
    data-slot="tabs-list"
  >
    <slot />
  </ArkTabList>
</template>