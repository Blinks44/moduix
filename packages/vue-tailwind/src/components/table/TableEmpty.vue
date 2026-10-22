<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, ref, useAttrs } from 'vue';
import type { ComponentPublicInstance, HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import TableRow from './TableRow.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'td'> {
  class?: HTMLAttributes['class'];
  colSpan: number;
}

const { class: className, colSpan } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const cellRef = ref<ComponentPublicInstance | null>(null);
const cellElement = computed(() => cellRef.value?.$el ?? null);

defineExpose({ $el: cellElement });

const cellClass =
  'relative z-0 border-border px-4 py-3 group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 data-sticky:sticky data-sticky:z-2 data-sticky:bg-card data-sticky:bg-[image:linear-gradient(var(--_table-row-bg),var(--_table-row-bg))] data-[sticky=end]:end-0 data-[sticky=start]:start-0 group-data-[show-column-border]/table:not-last:border-e';
</script>

<template>
  <TableRow data-empty>
    <ark.td
      ref="cellRef"
      v-bind="attrs"
      :class="
        cn(
          cellClass,
          'py-6 text-center text-muted-foreground group-data-[size=lg]/table:py-8 group-data-[size=sm]/table:py-4',
          className,
        )
      "
      :colspan="colSpan"
      data-scope="table"
      data-part="empty"
      data-slot="table-empty"
    >
      <slot v-if="slots.default" />
      <template v-else>{{ a11yLabels.noResults }}</template>
    </ark.td>
  </TableRow>
</template>