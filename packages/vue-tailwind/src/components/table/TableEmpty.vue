<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, ref, useAttrs } from 'vue';
import type { ComponentPublicInstance, HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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

const rowClass =
  'transition-colors duration-200 ease-in-out group-data-[slot=table-body]/table-body:border-b group-data-[slot=table-body]/table-body:border-border group-data-[slot=table-body]/table-body:last:border-b-0 motion-reduce:transition-none';
const cellClass =
  'relative z-0 px-4 py-3 align-middle group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 data-[sticky=end]:sticky data-[sticky=end]:end-0 data-[sticky=end]:z-2 data-[sticky=end]:bg-card data-[sticky=start]:sticky data-[sticky=start]:start-0 data-[sticky=start]:z-2 data-[sticky=start]:bg-card group-data-[show-column-border]/table:[&:not(:last-child)]:border-e group-data-[show-column-border]/table:[&:not(:last-child)]:border-border';
</script>

<template>
  <ark.tr :class="rowClass" data-scope="table" data-part="row" data-empty data-slot="table-row">
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
      <template v-else>No results.</template>
    </ark.td>
  </ark.tr>
</template>