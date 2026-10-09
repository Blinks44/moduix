<script setup lang="ts">
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { SearchIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <div
    v-bind="attrs"
    :class="cn('group/listbox-filter peer/listbox-filter relative box-border w-full', className)"
    data-slot="listbox-filter"
  >
    <SearchIcon
      class="pointer-events-none absolute start-3 top-1/2 z-1 size-4 -translate-y-1/2 text-muted-foreground"
      data-slot="listbox-filter-icon"
    />
    <slot />
  </div>
</template>