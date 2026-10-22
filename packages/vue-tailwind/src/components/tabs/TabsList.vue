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
        'relative isolate box-border inline-flex w-fit max-w-full gap-1 rounded-lg border border-border bg-muted p-1 group-data-[variant=line]/tabs:rounded-none group-data-[variant=line]/tabs:border-0 group-data-[variant=line]/tabs:bg-transparent data-[orientation=horizontal]:overflow-x-auto group-data-fitted/tabs:data-[orientation=horizontal]:w-full group-data-[variant=line]/tabs:data-[orientation=horizontal]:w-full group-data-[variant=line]/tabs:data-[orientation=horizontal]:border-b group-data-[variant=line]/tabs:data-[orientation=horizontal]:px-0 data-[orientation=vertical]:w-[min(12rem,40%)] data-[orientation=vertical]:flex-col group-data-[variant=line]/tabs:data-[orientation=vertical]:border-e group-data-[variant=line]/tabs:data-[orientation=vertical]:py-0',
        className,
      )
    "
    data-slot="tabs-list"
  >
    <slot />
  </ArkTabList>
</template>