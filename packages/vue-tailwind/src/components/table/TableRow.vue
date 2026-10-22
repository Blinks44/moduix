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
// Sticky cells repaint the row state over their own background through --_table-row-bg.
const rowClass =
  'border-border bg-(--_table-row-bg) [--_table-row-bg:initial] in-data-[slot=table-body]:not-last:border-b group-data-[striped]/table:in-data-[slot=table-body]:even:not-data-empty:[--_table-row-bg:color-mix(in_oklab,var(--color-muted)_35%,transparent)] group-data-[interactive]/table:in-data-[slot=table-body]:not-data-empty:focus-within:[--_table-row-bg:var(--color-muted)] group-data-[interactive]/table:in-data-[slot=table-body]:not-data-empty:hover:[--_table-row-bg:var(--color-muted)] in-data-[slot=table-header]:border-b';
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