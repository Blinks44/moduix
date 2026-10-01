<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'tr'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rowClass =
  'transition-colors duration-200 ease-in-out group-data-[slot=table-body]/table-body:border-b group-data-[slot=table-body]/table-body:border-border group-data-[slot=table-header]/table-header:border-b group-data-[slot=table-header]/table-header:border-border group-data-[slot=table-body]/table-body:last:border-b-0 motion-reduce:transition-none group-data-[interactive]/table:group-data-[slot=table-body]/table-body:[&:not([data-empty])]:focus-within:bg-muted group-data-[interactive]/table:group-data-[slot=table-body]/table-body:[&:not([data-empty])]:hover:bg-muted group-data-[striped]/table:group-data-[slot=table-body]/table-body:[&:nth-child(even):not([data-empty]):not(:hover):not(:focus-within)]:bg-muted/35';
</script>

<template>
  <ark.tr
    v-bind="attrs"
    :class="cn(rowClass, className)"
    data-scope="table"
    data-part="row"
    data-slot="table-row"
  >
    <slot />
  </ark.tr>
</template>