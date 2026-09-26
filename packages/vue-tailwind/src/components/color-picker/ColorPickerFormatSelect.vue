<script setup lang="ts">
import { ColorPickerFormatSelect as ArkColorPickerFormatSelect } from '@ark-ui/vue/color-picker';
import type { ColorPickerFormatSelectProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerFormatSelectProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <span class="group/format-select relative inline-grid w-fit max-w-full min-w-0 shrink-0">
    <ArkColorPickerFormatSelect
      v-bind="attrs"
      :class="
        cn(
          'peer/format-select box-border h-control-md w-auto min-w-0 rounded-md border border-border bg-background px-3 pe-8 text-sm text-foreground uppercase outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out focus:border-ring focus:outline-ring disabled:cursor-default data-disabled:cursor-default data-disabled:opacity-50 data-invalid:border-destructive data-invalid:outline-destructive forced-colors:appearance-auto forced-colors:pe-3',
          className,
        )
      "
      data-slot="color-picker-format-select"
    />
    <span
      aria-hidden="true"
      class="pointer-events-none absolute top-1/2 right-3 inline-flex size-4 -translate-y-1/2 items-center justify-center rounded-sm bg-transparent leading-none text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out peer-disabled/format-select:opacity-50 peer-data-disabled/format-select:opacity-50 peer-[:not([disabled]):hover]/format-select:bg-muted peer-[:not([disabled]):hover]/format-select:text-foreground forced-colors:hidden [&>svg]:block [&>svg]:size-full"
    >
      <ChevronDownIcon />
    </span>
  </span>
</template>