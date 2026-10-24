<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'td'> {
  class?: HTMLAttributes['class'];
  numeric?: boolean;
}

const { class: className, numeric = false } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const cellClass =
  'relative z-0 border-border px-4 py-3 group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 data-sticky:sticky data-sticky:z-2 data-sticky:bg-card data-sticky:bg-[image:linear-gradient(var(--_table-row-bg),var(--_table-row-bg))] data-[sticky=end]:end-0 data-[sticky=start]:start-0 group-data-[show-column-border]/table:not-last:border-e';
</script>

<template>
  <ark.td
    v-bind="attrs"
    :class="cn(cellClass, numeric && 'text-end whitespace-nowrap tabular-nums', className)"
    data-scope="table"
    data-part="cell"
    :data-numeric="numeric || undefined"
    data-slot="table-cell"
  >
    <slot />
  </ark.td>
</template>